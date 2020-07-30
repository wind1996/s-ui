const ENV = process.env.NODE_ENV;
if (
    ENV !== 'production' &&
    ENV !== 'test' &&
    typeof console !== 'undefined' &&
    console.warn && // eslint-disable-line no-console
    typeof window !== 'undefined'
) {
    // eslint-disable-next-line no-console
    console.warn(
        'You are using a whole package of antd, ' +
        'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.',
    );
}

export {default as Navigation} from './Navigation/index';
