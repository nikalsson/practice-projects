import React from 'react';
import {Table, Button, ButtonToolbar} from 'react-bootstrap';
import {shouldStatusChangeToACC_LEC,shouldStatusChangeToACC_WOR,shouldStatusChangeToMV_LEC,shouldStatusChangeToREJ} from '../Logic/choiceLogic'
import { AppConfig } from '../AppConfig' // Needed for workshop names 
import styled from 'styled-components' // styled-components module for easier CSS

const decisionsDictionary = {
  "REJ": "Odrzucony",
  "MV_LEC": "Zapronowano wykład",
  "ACC_LEC": "Zaapkceptowano na wykład",
  "ACC_WOR": "Zaakceptowano na warsztat",
  null: "Brak"
}

const CustomCSS = styled.div`
  tbody tr:nth-child(even) {
    background-color: #f8f9fa
  }

  .btn-toolbar .btn {
    margin: 2px;
  }
`

function RenderCandidateRecord(index,candidate, func) {
  // Use this for matching the candidate's workshop with the descriptions defined in AppConfig
  const workshopDescriptions = AppConfig.filterOptions.workshopFilterOptions
  const correspondingWorkshop = workshopDescriptions.filter(workshop => workshop.value === candidate.workshop)

  return (
    <tr key = {index}>
      <td>{candidate.name}</td>
      <td>{candidate.lastname}</td>
      <td>{candidate.email}</td>
      <td>{correspondingWorkshop.length === 0 ? "Nie wybrano" : correspondingWorkshop[0].text }</td>
      <td>{candidate.is_lecture ? "Tak" : "Nie"}</td>
      <td>{decisionsDictionary[candidate.decision]}</td>
      <td>
        <ButtonToolbar>
          {(candidate.decision !== "REJ" &&  shouldStatusChangeToREJ(candidate)) && <Button variant="danger" value = {candidate.email} onClick = {func} name = "REJ" size = "sm">Odrzuć</Button>}
          {(candidate.decision !== "MV_LEC" && shouldStatusChangeToMV_LEC(candidate)) && <Button variant="warning" value = {candidate.email} onClick = {func} name = "MV_LEC" size = "sm">Zaproponuj wykład</Button>}
          {(candidate.decision !== "ACC_LEC" &&  shouldStatusChangeToACC_LEC(candidate)) && <Button variant="primary" value = {candidate.email} onClick = {func} name = "ACC_LEC" size = "sm">Zaakceptuj na wykład</Button>}
          {(candidate.decision !== "ACC_WOR" &&  shouldStatusChangeToACC_WOR(candidate)) && <Button variant="success" value = {candidate.email} onClick = {func} name = "ACC_WOR" size = "sm">Zaakceptuj na warsztat</Button>}
        </ButtonToolbar>
      </td>
      <td>{candidate.motivation}</td>
    </tr>
  )
}
  
function CandidateTable({ candidates, func }) {
  return (
    <CustomCSS>
      <Table bordered>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Email</th>
            <th>Warsztat</th>
            <th>Wykład</th>
            <th>Decyzja</th>
            <th>Zmień decyzję</th>
            <th>Motywacja</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(candidate => RenderCandidateRecord(candidates.indexOf(candidate),candidate, func))}
        </tbody>
      </Table>
    </CustomCSS>
  )
}

export default CandidateTable