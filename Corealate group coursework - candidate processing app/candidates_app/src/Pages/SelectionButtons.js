import React from 'react';
import styled from 'styled-components' // styled-components module for easier CSS
import { Row, Col, Button } from 'react-bootstrap';

const CustomCSS = styled.div`
  .show-grid {
    height: 100%;
  }

  .show-grid .row {
    height: 33.3vh
  }

  .show-grid .row .col {
    padding: 0;
  }

  .row .col .btn-block {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  .return-button {
    margin-top: 5px;
    margin-bottom: 15px;
    opacity: 0.8
  }
`

// Selection buttons on the landing page 
export const ViewSelectionButtons = (props) => (
  <CustomCSS>
    <div className="show-grid">
      {/* Screen divided to three equal rows and two columns */}
      <Row></Row>
      <Row>
        <Col>
          <Button onClick={props.showForm} variant="primary" block>Dodaj kandydata</Button>
        </Col>
        <Col>
          <Button onClick={props.showCandidates} variant="success" block>Pokaż kandydatów</Button>
        </Col>
      </Row>
      <Row></Row>
    </div>
  </CustomCSS>
)

// Return to start button on top of the page
export const ReturnButton = (properties) => (
  <CustomCSS>
    <Button text="Powrót" onClick={properties.goBack} className="return-button" variant="warning" block>Powrót</Button>
  </CustomCSS>
)