import React, { Component } from 'react';
import Scores from './Scores';
import './App.css';

class Finished extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h1>Typey type</h1>
          <h2>{this.props.lessonTitle}</h2>
          <h3>{this.props.lessonSubTitle}</h3>
        </div>
        <div className="main">
          <div className="">
            <h1>Finished!</h1>
            <Scores timer={this.props.timer} totalNumberOfMatchedWords={this.props.totalNumberOfMatchedWords}/>
          </div>
        </div>
      </div>
    )
  }

}

export default Finished;
