import React from "react";
import styles from "../../index.module.less";

interface UploadPicProps {
    onUploadFile: (e: React.FormEvent<HTMLInputElement>) => void,
    file: string
}

export interface UploadInterface extends React.FC<UploadPicProps> {

}

const UploadPic: UploadInterface = ({file, onUploadFile}) => {
    const randNum = Math.ceil(Math.random() * 100000);
    return (<span style={{userSelect: "none"}}>
                <input
                    type="file"
                    id={`id-${randNum}`}
                    accept="image/jpeg,image/jpg,image/png"
                    style={{width: 0, visibility: 'hidden', position: 'absolute'}}
                    value={file}
                    onChange={onUploadFile}
                    multiple
                />
                <label htmlFor={`id-${randNum}`} className={`${styles.icon} hover`}>
                上传图片
                </label>
        </span>)
}

export default UploadPic
