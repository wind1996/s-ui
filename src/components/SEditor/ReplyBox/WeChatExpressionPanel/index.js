import React from 'react';
import styles from './index.module.less';
import { NumberToText } from '../emojiMap';
import WeChatExpression from './EmojiItem';

const WeChatExpressionPanel = ({ insertEmoji }) => (
  <div className={`${styles.emojiContainer} self-scroll-bar`}>
    <div className={styles.emojiContent}>
      <div className={styles.emojiFace}>
        {Object.keys(NumberToText).map(item => <WeChatExpression
          imgIndex={item}
          key={item}
          insertEmoji={insertEmoji}
        />)}
      </div>
    </div>
  </div>
);

export default WeChatExpressionPanel;
