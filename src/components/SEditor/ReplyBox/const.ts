// 静态资源
export const transparentBase64: string = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';

interface MESSAGE_TYPE {
    VAL: number,
    LABEL: string
}

// 消息内容类型
export const MESSAGE_TYPE: Object = {
    TEXT: {
        VAL: 1,
        LABEL: '文本和表情',
    },
    IMAGE: {
        VAL: 2,
        LABEL: '图片',
    },
};
