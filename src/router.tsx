import React from 'react';

const Async = (Component: { (): Promise<any> }) => {
    const LazyComponent = React.lazy(Component);
    return class App extends React.PureComponent {
        render() {
            return (
                <React.Suspense fallback={<div>Loading...</div>}>
                    <LazyComponent {...this.props} />
                </React.Suspense>
            );
        }
    };
};

const routes = [
    {
        path: '/',
        title: '首页',
        exact: true,
        hidden: true,
        component: Async(() => import(/* webpackChunkName:'Home' */'./Home')),
    },
    {
        path: '/Navigation',
        title: '导航-Navigation',
        exact: true,
        component: Async(() => import(/* webpackChunkName:'Navigation' */'./components/Navigation/demo/example')),
    },
    {
        path: '/count',
        title: '时间计数器-TimeCounter',
        exact: true,
        component: Async(() => import(/* webpackChunkName:'Navigation' */'./components/timeCount/demo/example')),
    }
];

export default routes;
