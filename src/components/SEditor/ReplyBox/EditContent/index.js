import React from 'react';
import styles from './index.module.less';
import EmojiIconStyle from '../WeChatExpressionPanel/EmojiItem/index.module.less';
import {MESSAGE_TYPE, transparentBase64} from '../const';

const message = {
    error: console.log
}

class EditContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.inputArea = null;
        this.selection = (window.getSelection && window.getSelection())
            || window.document.getSelection();
        this.setBtnStatus = this.setBtnStatus.bind(this);
    }

    getTextAndFileFromClipboard = ({items}) => new Promise((resolve) => {
        for (const item of Object.values(items)) {
            if (item.type.indexOf('image') !== -1) {
                resolve({file: item.getAsFile()});
            } else if (item.type === 'text/plain') {
                item.getAsString((text) => {
                    resolve({text});
                });
            }
        }
    });

    setBtnStatus() {
        const {onTextChange} = this.props;
        onTextChange && onTextChange(this.getInputBoxText());
    }

    // 清楚输入框的内容
    clearValue = () => {
        this.inputArea.innerHTML = '';
        this.setBtnStatus();
    };

    // 设置输入框内容
    setValue = (html) => {
        this.inputArea.innerHTML = html;
        this.setBtnStatus();
    };

    /**
     * 向选中区域插入DOM
     */
    handleInsertContent = (dom) => {
        if (!this.range) {
            return false;
        }
        this.range.deleteContents();
        this.range.insertNode(dom);
        this.range.collapse(false);
        this.setBtnStatus();
        return true;
    };

    insertText = (text, clearFlag = false) => {
        if (clearFlag) {
            this.selection.selectAllChildren(this.inputArea);
            this.setNewRange();
        }
        let span = document.createElement('span');
        span.innerText = text;
        this.handleInsertContent(span);
        span = null;
    };

    handleKeyDown = (e) => {

    };

    handlePaste = (event) => {
        this.setNewRange();
        event.preventDefault();
        const {onImgPaste} = this.props;
        this.getTextAndFileFromClipboard(event.clipboardData).then(({file, text}) => {
            if (file) {
                if (file.size > 2 * 1024 * 1024) {
                    message.error('图片超出2MB,粘贴失败');
                    return;
                }
                const key = new Date().getTime();
                onImgPaste({file, key});
                this.insertImgFromClipboard({file, key});
            }
            if (text) {
                this.insertText(text);
            }
        }).catch((e) => {
            console.log(e);
        });
    };

    insertImgFromClipboard = ({file, key}) => {
        const {addDataURL} = this.props;
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (e) => {
            let img = document.createElement('img');
            img.setAttribute('upload-Img-key', key);
            img.setAttribute('data-img-preview', 'true');
            img.src = e.target.result;
            addDataURL({key, dataURL: e.target.result});
            this.handleInsertContent(img);
            img = null;
        };
    };

    handleInput = () => {
        console.log('input 触发');
        this.setBtnStatus();
    };

    handleOnBlur = () => {
        this.setNewRange();
    };

    handleOnFocus = () => {
        this.setNewRange();
    };

    setNewRange = () => {
        console.error("this.selection",this.selection)
        setTimeout(()=>{
            this.range = this.selection.getRangeAt(0);
        })
    }

    /**
     * 获取文本输入框的内容
     * @returns {string}
     */
    getInputBoxHTML = () => (this.inputArea && this.inputArea.innerHTML) || '';

    /**
     * 获取文本输入框的内容
     * @returns {string}
     */
    getInputBoxText = (HTML) => {
        const div = document.createElement('div');
        let string = this.getInputBoxHTML();
        if (HTML !== undefined) {
            string = HTML;
        }
        div.innerHTML = string.replace(/(<div>.+?<\/div>)/gi, '\n$1').replace(/(<img.+?text="\S+".+?>)/gi,
            match => match.replace(/<img.+text="(\S+?)".+>/, '<span>$1</span>'))
            .replace(/^\n+|\n+$/g, '');
        return div.innerText;
    };

    getMessageArray = () => {
        const splitImgTextReg = /(<img.{0,4}upload-img-key=".+?>)/g;
        return this.getInputBoxHTML().split(splitImgTextReg).reduce((pre, cur) => {
            const ImgKey = this.getImgKeyList(cur);
            if (ImgKey) {
                return [...pre,
                    {
                        type: MESSAGE_TYPE.IMAGE.VAL,
                        message: ImgKey,
                        id: Math.ceil(Math.random() * 1e12),
                        ct: Date.now(),
                    },
                ];
            }
            const text = this.getInputBoxText(cur);
            if (text && /\S/.exec(text)) {
                return [...pre,
                    {
                        type: MESSAGE_TYPE.TEXT.VAL,
                        message: text,
                        id: Math.ceil(Math.random() * 1e12),
                        ct: Date.now(),
                    },
                ];
            }
            return pre;
        }, []);
    };

    getImgKeyList = (HTML) => {
        const reg = new RegExp(/<img.+?upload-img-key="(\S+)".+?>/gi);

        let string = this.getInputBoxHTML();
        if (HTML !== undefined) {
            string = HTML;
            const result = reg.exec(string);
            return result && result[1];
        }
        const resultArray = [];
        for (; ;) {
            const result = reg.exec(string);
            if (!result) {
                break;
            } else {
                resultArray.push(result[1]);
            }
        }
        return resultArray;
    };

    /**
     * 返回选中区域的HTML
     * @returns {DocumentFragment}
     */
    getChoiceHTML = () => {
        if (!this.selection || !this.inputArea.contains(this.selection.focusNode)) {
            return null;
        }
        const range = this.selection.getRangeAt(0);
        if (range.startOffset === range.endOffset) {
            return null;
        }
        return range.cloneContents();
    };

    insertWeChatExpression = ({text, style, imgIndex} = {}) => {
        const img = document.createElement('img');
        img.src = `https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${imgIndex}.gif`;
        img.className = `${EmojiIconStyle.icon} ${EmojiIconStyle.emojiIcon}`;
        img.onload = () => {
            if (img.src !== transparentBase64) {
                img.style.backgroundImage = `url(${transparentBase64})`;
            }
        };
        img.onerror = () => {
            img.src = transparentBase64;
        };
        img.setAttribute('text', `/${text}`);
        img.setAttribute('alt', `/${text}`);
        img.setAttribute('style', `background-position: ${style.backgroundPositionX} ${style.backgroundPositionY};vertical-align:bottom`);
        this.handleInsertContent(img);
    };

    render() {
        const {textContentStyle={}}=this.props
        return (
            <div className={styles.inputBox}>
                  <pre
                      className={styles.inputArea}
                      style={textContentStyle}
                      placeholder="请输入要回复的内容，文本内容最多300字"
                      contentEditable
                      onBlur={this.handleOnBlur}
                      onFocus={this.handleOnFocus}
                      onKeyDown={this.handleKeyDown}
                      onPaste={this.handlePaste}
                      onInput={this.handleInput}
                      data-role="emojiInputArear"
                      ref={(ref) => {
                          this.inputArea = ref;
                      }}
                  />
            </div>
        );
    }
}

export default EditContent;
