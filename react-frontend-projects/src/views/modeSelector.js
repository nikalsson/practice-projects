import React from 'react';
import styled from 'styled-components' // styled-components module for easier CSS
import { Row, Col, Button } from 'react-bootstrap'

// Load the CSS using styled-components
const CustomCSS = styled.div(require('./modeSelector.css'))

// Selection buttons on the landing page 
export const ModeSelectorButtons = (props) => (
  <CustomCSS>
    <div className="show-grid">
      {/* Screen divided to three equal rows and two columns */}
      <Row>
        <Col>
          <p className="description">freeCodeCamp Front end projects made using React, Font-Awesome, Marked.js and Styled Components</p>
        </Col>
        <Col>
          <Button onClick={props.changeView} block variant="info" id="quoteMachine">Random Quote Machine</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={props.changeView} variant="warning" block id="markdown">Markdown Previewer</Button>
        </Col>
        <Col>
          <Button onClick={props.changeView} variant="danger" block id="calculator">Calculator</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={props.changeView} block variant="success" id="drumMachine">Drum Machine - improved version does not pass FCC tests anymore, but is shorter in code and does all the same things          </Button>
        </Col>
        <Col>
          <Button onClick={props.changeView} block variant="primary" id="pomodoroClock">Pomodoro clock</Button>
        </Col>
      </Row>
    </div>
  </CustomCSS>
)

// Return to start button on top of the page
export const ReturnButton = (properties) => (
  <CustomCSS>
    <Button text="return" onClick={properties.backToModeSelector} className="return-button" variant="warning" block>Return to the mode selector</Button>
  </CustomCSS>
)