import React from "react";
import NavHeader from "../navigation";
import "../style";

const switchIframeAppPage = (item: any) => {
    console.log("item", item)
}


const array = [
    {
        title: "标题1",
        url: "标题1",
        children: [
            {
                title: "标题1-1",
                // url: "标题1-1",
                children: [
                    {
                        title: "标题1-1-1-ll-ll-lll-llll",
                        url: "标题1-1-1",
                    },
                    {
                        title: "标题1-1-2",
                        url: "标题1-1-2",
                    },
                    {
                        title: "标题1-1-3",
                        url: "标题1-1-3",
                    }
                ]
            },
            {
                title: "标题1-2",
                url: "标题1-2",
                children: [
                    {
                        title: "标题1-2-1",
                        url: "标题1-2-1",
                    },
                    {
                        title: "标题1-2-2",
                        url: "标题1-2-2",
                    },
                    {
                        title: "标题1-2-3",
                        url: "标题1-2-3",
                    }
                ]
            },
            {
                title: "标题1-3",
                url: "标题1-3",
            }
        ]
    },
    {
        title: "标题2",
        url: "标题2",
        children: [
            {
                title: "标题2-1",
                url: "标题2-2",
            }
        ]
    }
]

export default class Navigation extends React.Component {
    render() {
        return (
            <div>
                <p>组件预览-Navgation</p>
                <div style={{height: 400, background: "#e2e2e2"}}>
                    <NavHeader
                        list={array}
                        style={{height: 60}}
                        onNavClick={switchIframeAppPage}
                    />
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet consequuntur cum
                        dicta dolor earum expedita fugiat ipsum, labore libero mollitia nam necessitatibus, neque
                        nesciunt nobis, perspiciatis porro totam vitae?
                    </div>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet consequuntur cum
                        dicta dolor earum expedita fugiat ipsum, labore libero mollitia nam necessitatibus, neque
                        nesciunt nobis, perspiciatis porro totam vitae?
                    </div>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet consequuntur cum
                        dicta dolor earum expedita fugiat ipsum, labore libero mollitia nam necessitatibus, neque
                        nesciunt nobis, perspiciatis porro totam vitae?
                    </div>
                </div>
            </div>
        );
    }
}