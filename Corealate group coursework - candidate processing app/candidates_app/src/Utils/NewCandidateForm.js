import React, { useState } from 'react';
import { Form, Button, Col, Alert } from 'react-bootstrap';
import { AppConfig } from '../AppConfig' // Needed for workshop options defined in AppConfig
import styled from 'styled-components' // styled-components module for easier CSS

// Workshop options for select input in the form
const options = AppConfig.filterOptions.workshopFilterOptions;

function MapOptions({ options }) {

  return (
      options.map(option => {
          return (
              <option key={options.indexOf(option)} value={option.value}>{option.text}</option>)
      })
  )
}

const CustomCSS = styled.div`
  .backdrop {
    background-color: #EDEDED
    border-radius: .25rem
  }

  .alert {
    margin: 1rem auto;
  }

  form {
    padding 30px;
    margin: auto;
    max-width: 800px
  }
`

export const NewCandidateForm = (props) => {
  // The section before the form is mandatory to have form validation and required fields working correctly, otherwise might not prevent sending a form that has missing information!
  const [validated, setValidated] = useState(false)

  const handleSubmit = event => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    // If form fills requirements, send the post request
    if (form.checkValidity() === true){
      props.postCandidate(event);
    }
  }

  return (
    <CustomCSS>
      <div className="backdrop">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group controlId="formName" as={Col} xs lg="6">
              <Form.Label>Imię</Form.Label>
              <Form.Control 
                required
                type="text" 
                name="name" 
                onChange={props.handleChange} 
                size="sm" 
                placeholder="Imię" 
                maxLength="100" 
                autoFocus 
              />
              <Form.Control.Feedback>OK!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formSurname" as={Col} xs lg="6">
              <Form.Label>Nazwisko</Form.Label>
              <Form.Control 
                required
                type="text" 
                name="lastname" 
                onChange={props.handleChange}  
                size="sm" 
                placeholder="Nazwisko"
                maxLength="100" 
              />
              <Form.Control.Feedback>OK!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="formEmail" as={Col} xs lg="6">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                required
                type="email" 
                name="email" 
                onChange={props.handleChange}  
                size="sm" 
                placeholder="example@email.com" 
                maxLength="100"
              />
              <Form.Control.Feedback>OK!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Prosze podaj prawidlowy adres!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formCompany" as={Col} xs lg="6">
              <Form.Label>Firma</Form.Label>
              <Form.Control 
                required
                type="text" 
                name="company" 
                onChange={props.handleChange} 
                size="sm" 
                placeholder="Firma" 
                maxLength="100"
              />
              <Form.Control.Feedback>OK!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="formCompany" as={Col} xs lg="6">
              <Form.Label>Stanowisko</Form.Label>
              <Form.Control 
                required 
                type="text" 
                name="role" 
                onChange={props.handleChange} 
                size="sm" 
                placeholder="Stanowisko" 
                maxLength="100" 
              />
            <Form.Control.Feedback>OK!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formWorkshop" as={Col} xs lg="6">
              <Form.Label>Wybierz warsztat</Form.Label>
              <Form.Control 
                required
                as="select" 
                name="workshop" 
                onChange={props.handleChange} 
                size="sm" 
              >
                <MapOptions options={options} />
              </Form.Control>
              <Form.Control.Feedback>OK!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="formMotivation" as={Col} xs lg="12">
              <Form.Label>Opisz swoją motywację</Form.Label>
              <Form.Control 
                required 
                as="textarea" 
                name="motivation" 
                onChange={props.handleChange} 
                size="sm" 
                placeholder="Max. 10000 znaków" 
                maxLength="10000" 
              />
              <Form.Control.Feedback>OK!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="formLecture" as={Col} xs lg="12">
                <Form.Check 
                  name="is_lecture"
                  onClick={props.handleSelect}
                  label="Czy chcesz iść na wykład?"
                />
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit">Prześlij swoją kandydaturę</Button>

          {(props.state.success === true) && <Alert variant="success" as={Col} xs="true" lg="4">{props.state.alertText}</Alert>}
          {(props.state.success === false) && <Alert variant="danger" as={Col} xs="true" lg="4">{props.state.alertText}</Alert>}
        </Form>
      </div>
    </CustomCSS>
  )
}
