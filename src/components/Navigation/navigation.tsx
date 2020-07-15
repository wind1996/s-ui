import React from "react"
import NavPanel from "./navPanel"
import {listItem} from "./interface"

interface NavProps {
    list: Array<listItem>;
    className?: string;
    style?: Object;
    onNavClick?: (item: any) => any;
    openNewTab?: boolean
}


export default class NavHeader extends React.Component<NavProps, any> {
    constructor(props: NavProps) {
        super(props);
        this.state = {
            a: 0
        }
    }

    render() {
        console.log(this.props, this.state)
        const {className, style, list, onNavClick, openNewTab} = this.props

        return <div className={"nav-container " + className} style={style}>
            <ul className={"nav-ul"}>
                {list.map((item, index) => {
                    return (
                        <li key={index} className={"nav-li"}>
                            <a
                                href={item.url}
                                target="_blank"
                                title={openNewTab ? `${item.title}，右键可在新页面打开` : item.title}
                                rel="noopener noreferrer"
                                className={"nav-btn btn-bg-hover"}
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
                            {Array.isArray(item.children) && item.children
                                ? <NavPanel list={item.children} onNavClick={onNavClick} openNewTab={openNewTab}/>
                                : null}
                        </li>
                    )
                })}
            </ul>
        </div>;
    }
}