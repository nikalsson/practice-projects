import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

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
    this.resetTimer = this.resetTimer.bind(this);
  }

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

  // Counts the time, updates every second if the countingDown is true
  tick() {
    if (this.state.countingDown){
      this.setState(function (prevState) {
        // When the counter hits 00:00, toggle between Session and Break and reset the timer to the corresponding one
        if (prevState.timeLeftMinutes <= 0 && prevState.timeLeftSeconds <= 0) {
          this.alarmBeep.play() // Play alarm sound at 00:00
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

    // Prevent the timer length being set to <1 or >60
    if ((this.state[[keyHolder]] === 1 && event.target.innerHTML === "-") || (this.state[[keyHolder]] === 60 && event.target.innerHTML === "+")) {
      return
    };

    // eval() is used to convert the mathematical operator + or - from string, below line is to prevent warning in console about eval()
    // eslint-disable-next-line 
    let newValue = (eval(`${this.state[[keyHolder]]} ${event.target.innerHTML} 1`))

    // Update also the timer with the change of the length if the corresponding label matches 
    if (this.state.timerLabel === "Session" && keyHolder === "sessionLength") {
      this.setState({
        timeLeftMinutes: newValue,
        timeLeftSeconds: 0,
        [keyHolder]: newValue
      })
    }
    else if (this.state.timerLabel === "Break" && keyHolder === "breakLength") {
      this.setState({
        timeLeftMinutes: newValue,
        timeLeftSeconds: 0,
        [keyHolder]: newValue
      })
    } 
    else {
      this.setState({
        [keyHolder]: newValue
      })
    }
  }

  // Reset the timer, also stop and reload alarm sound
  resetTimer() {
    this.alarmBeep.load()
    this.setState({
      breakCounter: false,
      breakLength: 5,
      sessionCounter: true,
      sessionLength: 25,
      timerLabel: "Session",
      timeLeftMinutes: 25,
      timeLeftSeconds: 0,
      countingDown: false,
      alarmPlaying: false
    })
  }

  render(){
    let startStopButtonVariant;
    this.state.countingDown ? startStopButtonVariant = "warning" : startStopButtonVariant = "success"
    
    // Disable the buttons if the counter is running
    let buttonsDisabled;
    if (this.state.countingDown === true) {
      buttonsDisabled = true;
    } else {
      buttonsDisabled = false;
    }

    return(
      <CustomCSS>
        <div className="pomodoro-background">
          <div id="clock-frame">

            <div className="labels">
              <div id="break" className="labels-grid">
                <div id="break-label">Break</div>
                <div id="break-length" className="length">{this.state.breakLength}</div>
                <ButtonGroup aria-label="break-length-buttons">
                  <Button id="break-increment" className="pale-green" block variant="outline-success" onClick={ this.incrementDecrement } disabled={buttonsDisabled}>+</Button>
                  <Button id="break-decrement" className="pale-blue" block variant="outline-primary" onClick={ this.incrementDecrement } disabled={buttonsDisabled}>-</Button>
                </ButtonGroup>
              </div>

              <div id="session" className="labels-grid">
                <div id="session-label">Session</div>
                <div id="session-length" className="length">{this.state.sessionLength}</div>
                <ButtonGroup aria-label="session-lenght-buttons">
                  <Button id="session-decrement" className="pale-green" block variant="outline-success" onClick={ this.incrementDecrement } disabled={buttonsDisabled}>-</Button>
                  <Button id="session-increment" className="pale-blue" block variant="outline-primary" onClick={ this.incrementDecrement } disabled={buttonsDisabled}>+</Button>
                </ButtonGroup>
              </div>
            </div>

            <ButtonGroup id="start-reset">
              <Button id="start_stop" block variant={startStopButtonVariant}  onClick={ this.startStopTimer }>
                {this.state.countingDown ? "Stop" : "Start" }
              </Button>
              <Button id="reset" block variant="danger" onClick={ this.resetTimer }>Reset</Button>
            </ButtonGroup>

            <div id="timer">
              <div id="timer-label">
                {this.state.timerLabel}
              </div>
              <div id="time-left">
                {this.state.timeLeftMinutes < 10 ? `0${this.state.timeLeftMinutes}`  : this.state.timeLeftMinutes }:{this.state.timeLeftSeconds < 10 ? `0${this.state.timeLeftSeconds}`  : this.state.timeLeftSeconds }
              </div>
              <audio id="beep" ref={(alarmBeep) => { this.alarmBeep = alarmBeep }} src="./alarm/pager-beep.wav"/>
            </div>

          </div>
        </div>
      </CustomCSS>
    )
  }

}

export default PomodoroClock;