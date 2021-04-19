import React from 'react';
import styles from './index.module.less';
import {NumberToText} from '../../../const/emojiMap';
import {insertEmojiTypes} from "../../../typings";

export interface ExpressionProps {
    imgIndex: number;
    insertEmoji: insertEmojiTypes
}

interface ExpressionInterface extends React.FC<ExpressionProps> {
}

const Expression: ExpressionInterface = (props): React.ReactElement => {
    const {imgIndex} = props;
    const column: number = imgIndex % 15;
    const row: number = Math.floor(imgIndex / 15);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        e.stopPropagation();
        props.insertEmoji({
            style: {
                backgroundPositionX: `${column * -29}px`,
                backgroundPositionY: `${row * -29 + 1}px`,
            },
            imgIndex,
            text: NumberToText[imgIndex],
        });
    };
    return (
        <a
            title={NumberToText[imgIndex]}
            onClick={handleClick}
            className={styles.icon}
            style={{
                backgroundPositionX: `${column * -29}px`,
                backgroundPositionY: `${row * -29}px`,
            }}
        >{imgIndex}
        </a>
    );
};

export default Expression;
