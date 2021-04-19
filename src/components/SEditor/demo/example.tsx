import React from "react";
import SEditor from "../index";
import "../style";

export default class Navigation extends React.Component {
    render() {
        return (
            <div>
                <p>组件预览-sEditor</p>
                <SEditor
                    contentStyle={{maxHeight: 400}}
                />
            </div>
        );
    }
}
