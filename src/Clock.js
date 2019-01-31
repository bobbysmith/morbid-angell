import './clock.scss';

import React, { Component } from 'react';

const DUE_DATE = new Date('2019-03-29');

export default class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: '',
      hours: '',
      minutes: '',
      seconds: '',
      timeSet: false,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.calculateCountdown();
    }, 1000);
  }

  componentWillUnMount() {
    clearInterval(this.interval);
  }

  convertUTCDateToLocalDate = (date) => {
    const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    const offset = date.getTimezoneOffset() / 60;
    const hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
}

  calculateCountdown = () => {
    const { timeSet } = this.state;
    let difference = (
      Date.parse(new Date((DUE_DATE))) - Date.parse(this.convertUTCDateToLocalDate(new Date()))
    ) / 1000;

    if (!timeSet) {
      this.setState({ timeSet: true });
    }

    if (difference <= 0) {
      this.setState({ morbid: true });
    }

    const timeRemaining = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference >= 86400) {
      timeRemaining.days = Math.floor(difference / 86400);

      difference -= timeRemaining.days * 86400;
    }

    if (difference >= 3600) { // 60 * 60
      timeRemaining.hours = Math.floor(difference / 3600);

      difference -= timeRemaining.hours * 3600;
    }

    if (difference >= 60) {
      timeRemaining.minutes = Math.floor(difference / 60);

      difference -= timeRemaining.minutes * 60;
    }

    timeRemaining.seconds = difference;

    this.setState(timeRemaining);
  }

  addLeadingZero = (value) => {
    return String(value).length < 2 ? `0${value}` : value;
  }

  render() {
    const { days, hours, minutes, seconds, morbid, timeSet } = this.state;

    if (morbid) {
      return (
        <div className="clockContainer congrats">
          <span className="metal" role="img" aria-label="baby">👶🏻</span>
          Happy Birthday Baby Angell
          <span className="metal" role="img" aria-label="baby">👶🏻</span>
        </div>
      );
    }

    if (!timeSet) { return null; }

    return (
      <div className="clockContainer">
        <div className="metal"><span role="img" aria-label="metal">🤘</span></div>
        <div className="clock">
          <div>
            <span>{this.addLeadingZero(days)}</span>
            <span className="label">days</span>
          </div>
          <div>
            <span>{this.addLeadingZero(hours)}</span>
            <span className="label">hours</span>
          </div>
          <div>
            <span>{this.addLeadingZero(minutes)}</span>
            <span className="label">minutes</span>
          </div>
          <div>
            <span>{this.addLeadingZero(seconds)}</span>
            <span className="label">seconds</span>
          </div>
        </div>
        <div className="metal"><span role="img" aria-label="metal">🤘</span></div>
      </div>
    );
  }
}
