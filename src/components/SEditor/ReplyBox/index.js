import React from 'react';
import EditContent from './EditContent';
import WeChatExpressionPanel from './WeChatExpressionPanel';
import styles from './index.module.less';

const message = {
    error: console.log,
    success: console.log
}

class ReplyBox extends React.PureComponent {

    inputBox = null;

    dataURLList = null;

    state = {
        file: '',
        textInput: '',
    };

    componentDidMount() {
        window.setTimeout(() => {
            this.inputBox && this.inputBox.setValue("default value");
            this.inputBox.inputArea.focus();
        });
    }

    // 选择图片Input事件
    handleUploadFile = (e) => {
        const fileList = e.target.files;
        Object.values(fileList).forEach((file) => {
            if (file.size > 200 * 1024 * 1024) {
                message.error(`图片${file.name}超出2MB，插入失败`);
                return;
            }
            const key = Date.now() + Math.ceil(Math.random() * 1000);
            // 创建预览图，添加到输入框
            this.inputBox.insertImgFromClipboard({file, key});
            //TODO 将图片上传，结果存储在
        });
    };

    // 向输入框之前的光标处插入微信表情
    _InsertWeChatExpression = (arg) => {
        this.inputBox.insertWeChatExpression(arg);
    };

    // 将base64图片存储在父组件,用于图片的额loading
    _handleAddDataURL = ({dataURL, key}) => {
        this.dataURLList = {
            ...this.dataURLList,
            [key]: dataURL,
        };
    };

    handleInputTextChange = (textInput) => {
        this.setState(
            {textInput: textInput.replace(/\n/, '').trim()}
        );
    };

    onImgPaste=()=>{

    }

    render() {
        const {textContentStyle = {}} = this.props
        const randNum = Math.ceil(Math.random() * 100000);
        return (
            <div className={styles.ReplyBox}>
                <div className={styles.controlPanel}>
                    <span>
                        <input
                            type="file"
                            id={`id${randNum}`}
                            accept="image/jpeg,image/jpg,image/png"
                            style={{width: 0, visibility: 'hidden', position: 'absolute'}}
                            value={this.state.file}
                            onChange={this.handleUploadFile}
                            multiple="multiple"
                        />
                        <label htmlFor={`id${randNum}`} className={`${styles.icon} hover`}>
                            上传图片
                        </label>
                    </span>
                </div>
                <WeChatExpressionPanel
                    insertEmoji={this._InsertWeChatExpression}
                />
                <EditContent
                    ref={(ref) => {
                        this.inputBox = ref;
                    }}
                    onImgPaste={this.onImgPaste}
                    addDataURL={this._handleAddDataURL}
                    onTextChange={this.handleInputTextChange}
                    textContentStyle={textContentStyle}
                />
            </div>
        );
    }
}

export default ReplyBox;
