import React from 'react';
import { Navbar, Badge, Button } from 'react-bootstrap';
import styled from 'styled-components' // styled-components module for easier CSS


const CustomCSS = styled.div`
  .navbar {
    flex-wrap: wrap;
    justify-content: space-between;
  }
`

export const UserAmountDisplay = (props) => {
  return(
    <CustomCSS>
      <Navbar sticky="top" bg="light">
        {props.state.acceptedCandidatesCount <= 250 && <Navbar.Brand>Wszyscy przyjęci: {props.state.acceptedCandidatesCount} / 250</Navbar.Brand>}
        {props.state.acceptedCandidatesCount > 250 && <Navbar.Brand style={{ color: "red" }}>Wszyscy przyjęci: {props.state.acceptedCandidatesCount} / 250 <Badge variant="danger">!!!</Badge></Navbar.Brand>}
        {(props.state.allButtonsVisible && props.state.workshopCandidatesCount !== "" && props.state.workshopCandidatesCount <= props.state.workshopSize) && <Navbar.Brand>Miejsca na warsztat {props.state.chosenWorkshopFilter}: {props.state.workshopCandidatesCount} / {props.state.workshopSize}</Navbar.Brand>}
        {(props.state.allButtonsVisible && props.state.workshopCandidatesCount !== "" && props.state.workshopCandidatesCount > props.state.workshopSize) && <Navbar.Brand style={{ color: "red" }}>Miejsca na warsztat {props.state.chosenWorkshopFilter}: {props.state.workshopCandidatesCount} / {props.state.workshopSize} <Badge variant="danger">!!!</Badge></Navbar.Brand>}
        <Button onClick={props.fetchLists} variant="outline-info" >Pobierz listy kandydatów</Button>
      </Navbar>
    </CustomCSS>
  )
}