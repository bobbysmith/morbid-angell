import './stars.scss';

import React, { Component } from 'react';

export default class Stars extends Component {
  numberOfStars = (screenWidth) => {
    return screenWidth < 720 ?
      Math.floor(Math.random() * (600 - 300 + 1) + 300) :
      Math.floor(Math.random() * (1000 - 500 + 1) + 500);
  }

  starColor = () => {
    return Math.floor(Math.random() * (255 - 220 + 1) + 220);
  }

  generateStars = () => {
    const w = window,
    g = document.getElementsByTagName('body')[0],
    screenWidth = g.clientWidth || w.innerWidth,
    screenHeight = g.clientHeight || w.innerHeight;

    const stars = [...Array(this.numberOfStars(screenWidth)).keys()];

    return stars.map((star, index) => {
      const starSize = `${Math.floor(Math.random() * (3 - 1 + 1)) + 1}px`;

      const starStyles = {
        top: `${Math.floor(Math.random() * (screenHeight - 0 + 1)) + 0}px`,
        left: `${Math.floor(Math.random() * (screenWidth - 0 + 1)) + 0}px`,
        width: starSize,
        height: starSize,
        background: `rgb(${this.starColor()}, ${this.starColor()}, ${this.starColor()})`,
        boxShadow: `0 0 3px 1px rgb(${this.starColor()}, ${this.starColor()}, ${this.starColor()})`,
        opacity: (Math.random() * (1.0 - 0.1) + 0.1).toFixed(1),
      };

      return (
        <div
          className="star"
          key={index}
          style={starStyles}
        />
      );
    });
  }

  render() {
    return (
      <div className="container">{this.generateStars()}</div>
    );
  }
}
