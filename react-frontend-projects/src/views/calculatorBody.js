import React from 'react';
import styled from 'styled-components' // styled-components module for easier CSS

// Load the CSS using styled-components
const CustomCSS = styled.div(require('../stylesheets/calculatorStyles.css'))

// Set the layout of the calculator
export const CalculatorBody = ({ state, receiveNumberPress, receiveOperationPress, solveEquation, clearDisplay }) => {
  return(
    <CustomCSS>
      <div className="background">
        <div className="calculator-body">
          <div id="calculator-screen">
            <div id="display-top">
              {state.formulaLine}
            </div>
            <div id="display">
              {state.display}
            </div>
          </div>
          <div className="button-row">
            <button className="operation-button" onClick={ clearDisplay } id="clear">CLEAR</button>
            <button className="operation-button" onClick={ solveEquation } id="equals">=</button>
          </div>
          <div className="button-row">
            <button className="number-button" onClick ={ receiveNumberPress } id="seven">7</button>
            <button className="number-button" onClick ={ receiveNumberPress } id="eight">8</button>
            <button className="number-button" onClick ={ receiveNumberPress } id="nine">9</button>
            <button className="operation-button" onClick={ receiveOperationPress } id="divide">/</button>
          </div>
          <div className="button-row">
            <button className="number-button" onClick ={ receiveNumberPress } id="four">4</button>
            <button className="number-button" onClick ={ receiveNumberPress } id="five">5</button>
            <button className="number-button" onClick ={ receiveNumberPress } id="six">6</button>
            <button className="operation-button" onClick={ receiveOperationPress } id="multiply">*</button>
          </div>
          <div className="button-row">
            <button className="number-button" onClick ={ receiveNumberPress } id="one">1</button>
            <button className="number-button" onClick ={ receiveNumberPress } id="two">2</button>
            <button className="number-button" onClick ={ receiveNumberPress } id="three">3</button>
            <button className="operation-button" onClick={ receiveOperationPress } id="subtract">-</button>
          </div>
          <div className="button-row">
            <button className="number-button" onClick ={ receiveNumberPress } id="zero">0</button>
            <button className="number-button" onClick ={ receiveNumberPress } id="decimal">.</button>
            <button className="operation-button" onClick={ receiveOperationPress } id="add">+</button>
          </div>
        </div>
      </div>
    </CustomCSS>
  )
}