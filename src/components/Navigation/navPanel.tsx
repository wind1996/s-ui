import React from "react";
import {listItem} from "./interface"

interface PropsInterface {
    list: Array<listItem>;
    onNavClick?: (item: any) => any;
    openNewTab?: boolean
}

// 没有子级别菜单,显示列表
class List extends React.Component<PropsInterface, any> {
    render() {
        const {list, openNewTab, onNavClick} = this.props
        return <ul className={"nav-list"}>
            {list.map((item) => {
                return (
                    <li>
                        <a
                            href={item.url}
                            target="_blank"
                            title={openNewTab ? `${item.title}，右键可在新页面打开` : item.title}
                            rel="noopener noreferrer"
                            className={"nav-btn btn-color-hover"}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onNavClick) {
                                    e.preventDefault();
                                    onNavClick(item);
                                }
                            }}
                        >
                            <span>{item.title}</span>
                        </a>
                    </li>
                )
            })}
        </ul>
    }
}

// 没有子级别菜单,显示列表
class Panel extends React.Component<PropsInterface, any> {
    render() {
        const {list, openNewTab, onNavClick} = this.props
        return <ul className={"nav--panel"}>
            {list.map((item) => {
                return (
                    <li>
                        {item.url
                            ? (<a
                                href={item.url}
                                target="_blank"
                                title={openNewTab ? `${item.title}，右键可在新页面打开` : item.title}
                                rel="noopener noreferrer"
                                className={"nav-btn btn-color-hover"}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (onNavClick) {
                                        e.preventDefault();
                                        onNavClick(item);
                                    }
                                }}
                            >
                                <span className={"diamond-wrapper"}/>
                                <span>{item.title}</span>
                            </a>) : (<span className={"nav-btn"}>
                                <span className={"diamond-wrapper"}/>
                                <span>{item.title}</span>
                            </span>)}
                        {Array.isArray(item.children) ?
                            <List list={item.children} openNewTab={openNewTab} onNavClick={onNavClick}/>
                            : null}
                    </li>
                )
            })}
        </ul>
    }
}


export default class NavPanel extends React.Component<PropsInterface, any> {
    render() {
        const {list} = this.props
        if (list.some(item => item.children)) {
            return <div className={"panel-mount"}>
                <div className={"nav-panel"}>
                    <Panel {...this.props}/>
                </div>
            </div>;
        }
        return <div className={"panel-mount"}>
            <div className={"nav-panel"}>
                <List {...this.props}/>
            </div>
        </div>;
    }
}