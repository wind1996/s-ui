import React from 'react';
import EditContent from './EditArea';
import ExpressionPanel from './OperatorBar/ExpressionPanel';
import UploadPic from "./OperatorBar/UploadPic";
import styles from './index.module.less';

const message = {
    error: console.log,
    success: console.log
}

export interface SEditorProps {
    contentStyle?: React.CSSProperties,
    className?: string
}

class SEditor extends React.PureComponent<SEditorProps> {
    static displayName: string = "SEditor"

    static defaultProps = {}

    inputBox: any;

    dataURLList: string[] = [];

    state = {
        file: '',
        textInput: '',
    };

    componentDidMount() {
        window.setTimeout(() => {
            this.inputBox && this.inputBox.setValue("default value");
            this.inputBox && this.inputBox.inputArea.focus();
        });
    }

    // 选择图片Input事件
    handleUploadFile = (e: any) => {
        const fileList = e.target.files;
        Object.values(fileList).forEach((file: any) => {
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
    _InsertWeChatExpression = (arg: any) => {
        this.inputBox.insertWeChatExpression(arg);
    };

    // 将base64图片存储在父组件,用于图片的额loading
    // @ts-ignore
    _handleAddDataURL = ({dataURL, key}) => {
        this.dataURLList = {
            ...this.dataURLList,
            [key as number]: dataURL as string,
        };
    };

    handleInputTextChange = (textInput: string) => {
        this.setState(
            {textInput: textInput.replace(/\n/, '').trim()}
        );
    };

    onImgPaste = () => {

    }

    render() {
        const {contentStyle = {}, className} = this.props
        return (
            <div className={styles.ReplyBox + " " + className}>
                <UploadPic onUploadFile={this.handleUploadFile} file={this.state.file}/>
                <ExpressionPanel
                    insertEmoji={this._InsertWeChatExpression}
                />
                <EditContent
                    ref={(ref) => {
                        this.inputBox = ref
                    }}
                    onImgPaste={this.onImgPaste}
                    addDataURL={this._handleAddDataURL}
                    onTextChange={this.handleInputTextChange}
                    textContentStyle={contentStyle}
                />
            </div>
        );
    }
}

export default SEditor;
