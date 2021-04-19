import React, {Children} from "react"

interface NavProps {
    maxValue?: number,
    minValue?: number,
    triggerMaxValue?: (item: any) => any;
    triggerMinValue?: (item: any) => any;
}

interface TimeCounterState {
    count: number
}


export default class TimeCounter extends React.Component<NavProps, TimeCounterState> {
    private timeIntervalFlag: NodeJS.Timer | null = null;
    private startTime: number = 0;

    constructor(props: NavProps) {
        super(props);
        this.state = {
            count: 0
        }
    }

    start = (up: boolean = true) => {
        const {maxValue, triggerMaxValue, minValue = 0, triggerMinValue} = this.props
        this.startTime = Date.now()
        if (up) {
            this.setState({
                count: minValue
            }, () => {
                setTimeout(()=>{
                    this.startCore(up)
                },1000)
            })
        } else {
            if (maxValue) {
                this.setState({
                    count: maxValue
                }, () => {
                    setTimeout(()=>{
                        this.startCore(up)
                    },1000)
                })
            } else {
                throw "maxValue为必须"
            }
        }

    }

    startCore = (up: boolean) => {
        clearInterval(Number(this.timeIntervalFlag))
        this.timeIntervalFlag = setInterval(() => {
            const {count} = this.state
            const {maxValue, triggerMaxValue, minValue, triggerMinValue} = this.props
            if (up) {
                if (count === maxValue) {
                    if (triggerMaxValue) {
                        triggerMaxValue(maxValue)
                    }
                    clearInterval(Number(this.timeIntervalFlag))
                } else {
                    this.setState((preState) => ({count: preState.count + 1}))
                }
            } else {
                if (count === minValue) {
                    if (triggerMinValue) {
                        triggerMinValue(maxValue)
                    }
                    clearInterval(Number(this.timeIntervalFlag))
                } else {
                    this.setState((preState) => ({count: preState.count - 1}))
                }
            }

        }, 1000)
    }

    pause = () => {
        console.log("start2");
        clearInterval(Number(this.timeIntervalFlag))
    }

    reset = () => {
        console.log("reset 2")
        this.setState({
            count: 0
        })
    }

    render() {
        console.log(this.props, this.state)
        const {count} = this.state
        const {children: child} = this.props;
        console.log('1111111111111111', this.props)
        let Component = null
        if (typeof child === "function") {
            Component = child(count, Date.now() - this.startTime)
        }
        return <div>
            {Component}
        </div>;
    }
}
