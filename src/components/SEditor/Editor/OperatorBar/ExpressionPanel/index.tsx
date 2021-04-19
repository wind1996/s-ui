import React from 'react';
import styles from './index.module.less';
import {NumberToText} from '../../const/emojiMap';
import WeChatExpression from './EmojiItem';
import {insertEmojiTypes} from "../../typings"

interface ExpressionPanelProps {
    insertEmoji: insertEmojiTypes
}

export interface ExpressionPanelInterface extends React.FC<ExpressionPanelProps> {

}

const ExpressionPanel: ExpressionPanelInterface = ({insertEmoji}) => (
    <div className={`${styles.emojiContainer} self-scroll-bar`}>
        <div className={styles.emojiContent}>
            <div className={styles.emojiFace}>
                {Object.keys(NumberToText).map((item) => <WeChatExpression
                    imgIndex={parseInt(item, 10)}
                    key={item}
                    insertEmoji={insertEmoji}
                />)}
            </div>
        </div>
    </div>
);

export default ExpressionPanel;
