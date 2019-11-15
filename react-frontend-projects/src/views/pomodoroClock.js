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
      breakLength: 5,
      sessionCounter: true,
      sessionLength: 25,
      timerLabel: "Session",
      timeLeftMinutes: 25,
      timeLeftSeconds: 0,
      countingDown: false,
      alarmPlaying: false
    };
    this.startStopTimer = this.startStopTimer.bind(this);
    this.incrementDecrement = this.incrementDecrement.bind(this);
  }

  // componentDidMount(){
  //   this.startTimer();
  // }

  // componentDidUpdate() {
  //   this.startTimer();
  // }

  // Start and stop the timer, set or remove 1000ms interval tick(), which updates mins & secs
  startStopTimer() {
    if (this.state.countingDown === false) {
      this.timer = setInterval(() => this.tick(), 1000)
      this.setState({
        countingDown: true
      })
    }

    else if (this.state.countingDown === true) {
      clearInterval(this.timer);
      this.setState({
        countingDown: false
      })
    }
  }

  tick() {
    if (this.state.countingDown){
      this.setState(function (prevState) {
        // When the counter hits 00:00, toggle between Session and Break and reset the timer to that
        if (prevState.timeLeftMinutes <= 0 && prevState.timeLeftSeconds <= 0) {
          if (prevState.timerLabel === "Session") {
            return {
              timerLabel: "Break",
              timeLeftMinutes: this.state.breakLength,
              timeLeftSeconds: 0
            }
          }
          else {
            return {
              timerLabel: "Session",
              timeLeftMinutes: this.state.sessionLength,
              timeLeftSeconds: 0
            }
          } 
        }

        // When seconds hit 00, reduce from minute counter and roll back seconds counter
        else if (prevState.timeLeftSeconds <= 0) {
          return {
            timeLeftSeconds: 59,
            timeLeftMinutes: prevState.timeLeftMinutes - 1
          }
        }

        // Or just count down from seconds
        else {
          return {
            timeLeftSeconds: prevState.timeLeftSeconds - 1
          };
        }
      });
    }
  }

  // Increment or decrement both the break and session counters
  incrementDecrement(event) {
    let keyHolder;
    if (event.target.id.includes("break")){
      keyHolder = "breakLength";
    } else {
      keyHolder = "sessionLength";
    }

    // eval() is used to convert the mathematical operator + or - from string, below line is to prevent warning in console about eval()
    // eslint-disable-next-line 
    let newValue = (eval(`${this.state[[keyHolder]]} ${event.target.innerHTML} 1`))

    // Update also the timer with the change of the length if the corresponding label matches 
    if (this.state.timerLabel === "Session" && keyHolder === "sessionLength") {
      this.setState({
        timeLeftMinutes: newValue,
        [keyHolder]: newValue
      })
    }
    else if (this.state.timerLabel === "Break" && keyHolder === "breakLength") {
      this.setState({
        timeLeftMinutes: newValue,
        [keyHolder]: newValue
      })
    } 
    else {
      this.setState({
        [keyHolder]: newValue
      })
    }

  }

  render(){
    return(
      <CustomCSS>
        <div className="background">
          <div id="labels">
            <div id="break">
              <div id="break-label">Break length</div>
              <div id="break-length">{this.state.breakLength}</div>
              <button id="break-decrement" onClick={ this.incrementDecrement }>-</button>
              <button id="break-increment" onClick={ this.incrementDecrement }>+</button>
            </div>
            <div id="timer">
              <div id="session-label">Session</div>
              <div id="session-length">{this.state.sessionLength}</div>
              <button id="session-decrement" onClick={ this.incrementDecrement }>-</button>
              <button id="session-increment" onClick={ this.incrementDecrement }>+</button>
            </div>
          </div>

          <button id="start_stop" onClick={ this.startStopTimer }>
            {this.state.countingDown ? "Stop" : "Start" }
          </button>
          <button id="reset">Reset</button> 
          {/* : When I click the element with the id of reset, any running timer should be stopped, the value within id="break-length" should return to 5, the value within id="session-length" should return to 25, and the element with id="time-left" should reset to it's default state. */}
          <div id="timer">
            <div id="timer-label">
              {this.state.timerLabel}
            </div>
            <div id="time-left">
              {this.state.timeLeftMinutes < 10 ? `0${this.state.timeLeftMinutes}`  : this.state.timeLeftMinutes }:{this.state.timeLeftSeconds < 10 ? `0${this.state.timeLeftSeconds}`  : this.state.timeLeftSeconds }
            </div>
          </div>
        </div>
      </CustomCSS>
    )
  }

}

export default PomodoroClock;