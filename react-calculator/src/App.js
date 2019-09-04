import React from 'react';
import Calculator from './calculator'

class App extends React.PureComponent {
  state = {
    display: 0,
    formulaLine: "",
    operatorButtonPressed: false,
    formulaEvaluated: false,
    negativeNumberAdded: false
  }

  // For running FCC tests
  componentDidMount () {
    const script = document.createElement("script");
    script.src = "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
    script.async = true;
    document.body.appendChild(script);
  }

  // Function for recording numbers and decimal point -> print them on the display line
  receiveNumberPress = (event) => {
    const pressedNumber = event.target.innerHTML

    // If the previous equation was solved, write over it when inputting new numbers
    if (this.state.formulaEvaluated === true) {
      this.setState({
        negativeNumberAdded: false,
        display: pressedNumber,
        formulaLine: "",
        operatorButtonPressed: false,
        formulaEvaluated: false,
      })
      return;
    }

    // Allow only one decimal point!
    if (this.state.display.toString().includes(".") && pressedNumber === ".") {
      console.log("Only one decimal point allowed!")
      return;
    }

    // Prevent adding multiple zeros without a decimal point
    if ((this.state.display === 0 || this.state.display === "0") && pressedNumber === "0") {
      console.log("No extra zeros")
      return;
    }

    // // Replace the 0 from calculator default state with any given number
    if (this.state.display === 0 || this.state.display.slice(-1) === "+" || this.state.display.slice(-1) === "/" || this.state.display.slice(-1) === "*" || this.state.display.slice(-1) === "-"){
      this.setState({
        negativeNumberAdded: false,
        display: pressedNumber,
        operatorButtonPressed: false,
      })
      return;
    }

    let number = this.state.display + pressedNumber
    this.setState({
      negativeNumberAdded: false,
      display: number,
      operatorButtonPressed: false,
    })
  }

  receiveOperationPress = (event) => {
    const mathOperator = event.target.innerHTML;

    // If the previous equation was solved, it is possible to do mathematical operations on that result
    if (this.state.formulaEvaluated === true) { 
      this.setState({
        negativeNumberAdded: false,
        formulaLine: this.state.display + mathOperator,
        display: "",
        operatorButtonPressed: true,
        formulaEvaluated: false
      })
      return;
    }

    // If 2 or more operators are entered consecutively, the operation performed should be the last operator entered -- Demanded by FCC tests
    if (this.state.negativeNumberAdded) {
      this.setState({
        negativeNumberAdded: false,
        formulaLine: this.state.formulaLine.slice(0,-2) + this.state.display + mathOperator, // Remove the previous two operators and add the new one
        display: mathOperator,
        operatorButtonPressed: true,
      })
      return;
    }

    // Prevent adding two consequent math operator but allow to replace the previously pressed one
    if (this.state.operatorButtonPressed && mathOperator === "-" && this.state.formulaLine.slice(-1) !== "-") {
      this.setState({
        formulaLine: this.state.formulaLine + mathOperator,
        display: "",
        operatorButtonPressed: true,
        negativeNumberAdded: true,
      })
      return
    }

    // Prevent adding two consequent math operator but allow to replace the previously pressed one
    if (this.state.operatorButtonPressed) {
      this.setState({
        negativeNumberAdded: false,
        formulaLine: this.state.formulaLine.slice(0,-1) + mathOperator,
        display: mathOperator,
        operatorButtonPressed: true,
      })
      return;
    }

    this.setState({
      negativeNumberAdded: false,
      formulaLine: this.state.formulaLine + this.state.display + mathOperator,
      display: mathOperator,
      operatorButtonPressed: true,
    })
  }
  

  solveEquation = (event) => {
    if (this.state.formulaEvaluated === true) return // Prevent trying to solve multiple times
    const mathOperator = event.target.innerHTML;

    // eval() crashes the app in case of error if not wrapped within a try...catch block
    try {
      let calculation = this.state.formulaLine + this.state.display
      let solved = eval(calculation).toString() // eval() function evaluates JavaScript code represented as a string -- EVAL() HANDLES THE CALCULATION AND ORDER OF OPERATIONS
      this.setState({
      negativeNumberAdded: false,
      formulaLine: this.state.formulaLine + this.state.display + mathOperator,
      operatorButtonPressed: false,
      formulaEvaluated: true,
      display: solved
     })
    }

    catch(error) {
      console.log(error)
      this.setState({
        display: "ERROR"
      })
    }
    
  }

  // Clear button returns the calculator in the original state
  clearDisplay = () => {
    this.setState({
      negativeNumberAdded: false,
      display: 0,
      formulaLine: "",
      formulaEvaluated: false
    })
  }

  render(){
    return (
      <Calculator state ={ this.state }  receiveNumberPress ={ this.receiveNumberPress }  receiveOperationPress ={ this.receiveOperationPress }  solveEquation ={ this.solveEquation }  clearDisplay ={ this.clearDisplay }/>
    );
  }
}

export default App;
