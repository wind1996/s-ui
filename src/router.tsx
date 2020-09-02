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
        path: '/sEditor',
        title: '编辑器-sEditor',
        exact: true,
        component: Async(() => import(/* webpackChunkName:'Navigation' */'./components/SEditor/demo/example')),
    }
];

export default routes;
