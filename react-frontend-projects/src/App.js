import React from 'react';
import './index.css'; // Import stylesheet
import 'bootstrap/dist/css/bootstrap.min.css'; // Import bootstrap stylesheet
import { ModeSelectorButtons, ReturnButton } from './views/modeSelector' 
import MarkdownPreviewer from './views/markdownPreviewer'
import Calculator from './views/calculatorLogic'
import QuoteMachine from './views/randomQuoteMachine'

class App extends React.PureComponent {
  state = {
    modePickerVisible: true,
    markdownPreviewerSelected: false,
    calculatorSelected: false,
    randomQuoteMachineSelected: false
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
      randomQuoteMachineSelected: false
    })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.modePickerVisible && 
          <ModeSelectorButtons changeView = { this.changeView }/>
        }

        {this.state.markdownPreviewerSelected && 
          <React.Fragment>
            <ReturnButton backToModeSelector={ this.backToModeSelector }/>
            <MarkdownPreviewer/>
          </React.Fragment>
        }

        {this.state.calculatorSelected && 
          <React.Fragment>
            <ReturnButton backToModeSelector={ this.backToModeSelector }/>
            <Calculator/>
          </React.Fragment>
        }

        
        {this.state.randomQuoteMachineSelected && 
          <React.Fragment>
            <ReturnButton backToModeSelector={ this.backToModeSelector }/>
            <QuoteMachine/>
          </React.Fragment>
        }
        
        
      </React.Fragment>
    )
  }

}

export default App;