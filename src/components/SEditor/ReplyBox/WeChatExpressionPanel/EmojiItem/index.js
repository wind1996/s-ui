import React from 'react';
import styles from './index.module.less';
import { NumberToText } from '../../emojiMap';

const WeChatExpression = (props) => {
  const { imgIndex } = props;
  const column = imgIndex % 15;
  const row = Math.floor(imgIndex / 15);

  const handleClick = (e) => {
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

export default WeChatExpression;
