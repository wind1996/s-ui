import React from "react"
import ReplyBox from "./ReplyBox";

interface SEditorProps {
    className?: string;
    contentStyle?: Object;
}

export default class NavHeader extends React.Component<SEditorProps, any> {
    constructor(props: SEditorProps) {
        super(props);
        this.state = {
            a: 0
        }
    }

    render() {
        const {contentStyle = {}, className} = this.props
        return (
            <div className={className}>
                <ReplyBox textContentStyle={contentStyle}/>
            </div>
        )
    }
}
