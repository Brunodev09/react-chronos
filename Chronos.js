import React, { Component } from 'react';


export default class Chronos extends Component {

    constructor(props) {
        super(props);

        this.seconds = "0.0";
        this.minutes = "0.0";
        this.hours = "0.0";

        this.started = false;

        this.lever = 5.9;
        this.wait = 1000;
        this.interval = null;

        this.state = {
            seconds: "0.0",
            minutes: "0.0",
            hours: "0.0"
        };
    }

    componentDidMount() {
        let { type } = this.props;
        if (type) {
            switch (type) {
                case "countdown": {
                    break;
                }
                case "timer": {
                    this.startTimer();
                    break;
                }
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    startTimer() {
        let { seconds, minutes, hours } = this;

        if (!this.started) {
            this.started = true;
            this.interval = setInterval(() => {

                if (seconds >= this.lever) {

                    seconds = "0.0";
                    this.setState({"seconds": seconds});

                    if (minutes >= this.lever) {
                        minutes = "0.0";
                        hours = this.formatFloat(hours);
                        this.setState({"minutes": minutes, "hours": hours});
                    }
                    else {
                        minutes = this.formatFloat(minutes);
                        this.setState({"minutes": minutes});
                    }
                }
                else {
                    seconds = this.formatFloat(seconds);
                    this.setState({"seconds": seconds});
                }

            }, this.wait);
        }

    }

    formatFloat(num) {
        if (typeof num === "string") num = Number(num);
        num += 0.1;
        if (num % 0.1 === 0) num = num.toString().concat("0");
        return Number(num).toFixed(1);
    }


    handler = () => {
        let auxState = {...this.state};
        let { seconds, minutes, hours } = auxState;

        seconds = seconds.toString().replace(/\./, "");
        minutes = minutes.toString().replace(/\./, "");
        hours = hours.toString().replace(/\./, "");
        return `${hours}:${minutes}:${seconds}`;
    };


    render() {
        let callFunction = this.handler();
        return (
            <div>{callFunction}</div>
        );
    }

}

