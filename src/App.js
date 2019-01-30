import React, { Component } from 'react';
import './App.css';
import Clock from './Clock';
import Stars from './Stars';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Stars />
        <Clock />
      </div>
    );
  }
}

export default App;
