import React from 'react';
import './stylesheets/index.css'; // Import stylesheet
import 'bootstrap/dist/css/bootstrap.min.css'; // Import bootstrap stylesheet
import { ModeSelectorButtons, ReturnButton } from './views/modeSelector' 
import MarkdownPreviewer from './views/markdownPreviewer'
import Calculator from './views/calculatorLogic'
import QuoteMachine from './views/randomQuoteMachine'
import DrumMachine from './views/drumMachine'
import PomodoroClock from './views/pomodoroClock'

class App extends React.PureComponent {
  state = {
    modePickerVisible: true,
    markdownPreviewerSelected: false,
    calculatorSelected: false,
    randomQuoteMachineSelected: false,
    drumMachineSelected: false,
    pomodoroClockSelected: false
  }

  componentDidMount() {
    window.scrollTo(0,1);
    window.focus();
  }

  changeView = (event) => {
    // Create an object, use switch to add the desired view to the object and then set it to state
    let selectionObject = {modePickerVisible: false}
    switch(event.target.id){
      case "markdown":
        selectionObject.markdownPreviewerSelected = true
        break;
      case "calculator":
        selectionObject.calculatorSelected = true
        break;
      case "quoteMachine":
        selectionObject.randomQuoteMachineSelected = true
        break;
      case "drumMachine":
        selectionObject.drumMachineSelected = true
        break;
      case "pomodoroClock":
        selectionObject.pomodoroClockSelected = true
        break;
      default: 
        selectionObject = ""
    }
    this.setState(selectionObject)
  }

  backToModeSelector = () => {
    this.setState({
      modePickerVisible: true,
      markdownPreviewerSelected: false,
      calculatorSelected: false,
      randomQuoteMachineSelected: false,
      drumMachineSelected: false,
      pomodoroClockSelected: false

    })
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.modePickerVisible && 
          <ModeSelectorButtons changeView = { this.changeView }/>
        }

        {
          this.state.markdownPreviewerSelected && 
          <React.Fragment>
            <ReturnButton backToModeSelector={ this.backToModeSelector }/>
            <MarkdownPreviewer/>
          </React.Fragment>
        }

        {
          this.state.calculatorSelected && 
          <React.Fragment>
            <ReturnButton backToModeSelector={ this.backToModeSelector }/>
            <Calculator/>
          </React.Fragment>
        }

        {
          this.state.randomQuoteMachineSelected && 
          <React.Fragment>
            <ReturnButton backToModeSelector={ this.backToModeSelector }/>
            <QuoteMachine/>
          </React.Fragment>
        }
        
        {
          this.state.drumMachineSelected && 
          <React.Fragment>
            <ReturnButton backToModeSelector={ this.backToModeSelector }/>
            <DrumMachine/>
          </React.Fragment>
        }

        {
          this.state.pomodoroClockSelected && 
          <React.Fragment>
            <ReturnButton backToModeSelector={ this.backToModeSelector }/>
            <PomodoroClock/>
          </React.Fragment>
        }
      </React.Fragment>
    )
  }

}

export default App;