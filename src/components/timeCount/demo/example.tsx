import React from "react";
import Count from "../count";
import "../style";

const switchIframeAppPage = (item: any) => {
    console.log("item", item)
}


export default class TimecountDemo extends React.Component<any, any> {
    private counter: any;


    triggerMaxValue = () => {
        console.log("已经达到了最大值")
    }

    start = () => {
        console.log("start")
        this.counter.start && this.counter.start()
    }
    pause = () => {
        console.log("start")
        this.counter.pause && this.counter.pause()
    }
    reset = () => {
        console.log("start")
        this.counter.reset && this.counter.reset()

    }

    triggerMinValue = () => {
        console.log("已经达到了最小值")
    }


    render() {
        return (
            <div>
                <p>组件预览-timeCounter</p>
                <div style={{height: 400, background: "#e2e2e2"}}>
                    <Count
                        triggerMaxValue={this.triggerMaxValue}
                        triggerMinValue={this.triggerMinValue}
                        maxValue={5}
                        minValue={2}
                        ref={ref => {
                            this.counter = ref
                        }}>
                        {(count: number,offsetSecond:number) => {
                            return (<span>计数：{count}，开始后时间间隔：{Math.ceil(offsetSecond/1000)}秒</span>)
                        }}
                    </Count>
                    <button onClick={this.start}>开始</button>
                    <button onClick={this.pause}>暂停</button>
                    <button onClick={this.reset}>重置</button>
                </div>
            </div>
        );
    }
}
