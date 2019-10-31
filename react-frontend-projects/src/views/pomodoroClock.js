import React from 'react'
import styled from 'styled-components'

// Load custom CSS with styled-components
const CustomCSS = styled.div(require('./pomodoroClock.css'));

class PomodoroClock extends React.PureComponent{
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      breakCounter: false,
      breakTimer: 5,
      sessionCounter: true,
      sessionTimer: 25,
      timeLeftMinutes: 0,
      timeLeftSeconds: 4,
      countingDown: true,
      alarmPlaying: false
    }

    //     this.startTimer = this.startTimer.bind(this);
    // this.countdown = this.countdown.bind(this);
  }

  componentDidMount(){
    this.startTimer();
  }

  componentDidUpdate() {
    this.startTimer();
  }

  startTimer() {
    if (this.state.countingDown && this.timer === null) {
      this.timer = setInterval(() => this.tick(), 1000)
    } 
    else if (this.state.countingDown === false) {
      clearInterval(this.timer);
    }
  }

  tick() {
    this.setState(function (prevState) {
      if (prevState.timeLeftSeconds <= 0) {
        return {
          timeLeftSeconds: 59,
          timeLeftMinutes: prevState.timeLeftMinutes - 1
        }
      } else if (prevState.timeLeftMinutes <= 0 && prevState.timeLeftSeconds <= 0) {
        return {
          countingDown: false
        }
      }
      else {
        return {
          timeLeftSeconds: prevState.timeLeftSeconds - 1
        };
      }
    });
  }

  render(){
    return(
      <CustomCSS>
        <div className="background">
          {this.state.timeLeftMinutes}
          {this.state.timeLeftSeconds < 10 ? `0${this.state.timeLeftSeconds}`  : this.state.timeLeftSeconds }
        </div>
      </CustomCSS>
    )
  }

}

export default PomodoroClock;