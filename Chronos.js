import React, { Component } from 'react';


export default class Chronos extends Component {

    constructor(props) {
        super(props);

        this.seconds = "0.0";
        this.minutes = "0.0";
        this.hours = "0.0";
        this.from = null;

        this.started = false;

        this.offset = 0.1;
        this.lever = 5.9;
        this.leverDown = 0.1;
        this.wait = 1000;
        this.interval = null;

        this.DEFAULT_OFFSET_MINUTES = "0.0:0.2:0.0";
        this.DEFAULT_OFFSET_MINUTES_TIMER = "0.0:0.0:0.0";

        this.state = {
            seconds: "0.0",
            minutes: "0.0",
            hours: "0.0",
            from: null
        };
    }

    componentDidMount() {
        let { type, from } = this.props;
        if (type) {
            switch (type) {
                case "countdown": {
                    if (!from) {
                        this.from = this.DEFAULT_OFFSET_MINUTES;
                        this.setState({"from": this.DEFAULT_OFFSET_MINUTES});
                    }
                    else this.from = from;
                    this.offset = -this.offset;
                    try {
                        const separator = this.from.split(":");

                        this.seconds = separator[2];
                        this.minutes = separator[1];
                        this.hours = separator[0];

                    } catch (e) {
                        console.error(e);
                        return;
                    }
                    this.setState({"seconds": this.seconds});
                    this.setState({"minutes": this.minutes});
                    this.setState({"hours": this.hours});
                    this.startCountdown();
                    break;
                }
                case "timer": {
                    if (!from) {
                        this.from = this.DEFAULT_OFFSET_MINUTES_TIMER;
                        this.setState({"from": this.DEFAULT_OFFSET_MINUTES_TIMER});
                    }
                    else this.from = from;
                    try {
                        const separator = this.from.split(":");

                        this.seconds = separator[2];
                        this.minutes = separator[1];
                        this.hours = separator[0];

                    } catch (e) {
                        console.error(e);
                        return;
                    }
                    this.setState({"seconds": this.seconds});
                    this.setState({"minutes": this.minutes});
                    this.setState({"hours": this.hours});
                    this.startTimer();
                    break;
                }
            }
        }
    }


    componentWillUnmount() {
        if (this.props.customFunction) {
            this.props.customFunction({hours: this.state.hours, minutes: this.state.minutes, seconds: this.state.seconds});
        }
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

    startCountdown() {
        let { seconds, minutes, hours } = this;

        if (!this.started) {
            this.started = true;
            this.interval = setInterval(() => {


                if (seconds <= this.leverDown) {
                    seconds = "5.9";
                    this.setState({"seconds": seconds});
                    if (minutes > 0) {
                        console.log('minutes', minutes);
                        minutes = this.formatFloat(minutes);
                        this.setState({"minutes": minutes});
                    } else {
                        minutes = "5.9";
                        this.setState({"minutes": minutes});
                        if (hours > 0) {
                            hours = this.formatFloat(hours);
                            this.setState({"hours": hours});
                        }
                        else {
                            this.setState({"seconds": "0.0", "minutes": "0.0", "hours": "0.0"});
                        }
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
        num = Number(num) + this.offset;
        if (num % Math.abs(0.1) === 0) num = num.toString().concat("0");
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

