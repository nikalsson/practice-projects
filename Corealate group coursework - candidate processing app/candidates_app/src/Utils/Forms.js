import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import styled from 'styled-components' // styled-components module for easier CSS

function MapOptions({ options }) {
    return (
        options.map(option => {
            return (
                <option key={options.indexOf(option)} value={option.value}>{option.text}</option>
            )
        })
    )
}

// Custom CSS styling for the candidate filtering form
const CustomCSS = styled.div`
	#show-all-buttons {
		justify-content: space-around;
	}

	.form-inline {
		justify-content: center;
		padding: 20px 0
	}

	.form-submit {
		margin-left: 5px;
	}

	.form-input {
		margin-left: 10px;
		width: 200px
	}

	.form-label {
		font-size: 1.1em;
	}

	.characterSearch {
		justify-content: center;
		flex-grow: 1;
		flex-wrap: wrap;
	}

	// Prevent buttons squashing up to each other on small screens
  	@media only screen and (max-width: 500px) {
		Button {
			margin-top: 0.5rem
		}

		.characterSearch {
			max-width 450px
		}
  }
` 

export function SearchGridForm({ changeFunc, submitFunc, showAllCandidatesFunc, workshopFilterOptions, lectureFilterOptions, fetchLists }) {
    return (
		<CustomCSS>
			<Form>
				<Form.Row>
					<Col>
						<Form.Group className="form-inline">
							<Form.Label>Warsztat</Form.Label>
							<Form.Control as="select" size="md" onChange={changeFunc} name="workshopFilter" className="form-input">
								<MapOptions options={workshopFilterOptions} />
							</Form.Control>
							<Button variant="primary" type="submit" onClick={submitFunc} value="workshop" className="form-submit">Filtruj</Button>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group className="form-inline">
							<Form.Label>Wykład</Form.Label>
							<Form.Control as="select" size="md" onChange={changeFunc} name="lectureFilter" className="form-input">
								<MapOptions options={lectureFilterOptions} />
							</Form.Control>
							<Button variant="primary" type="submit" onClick={submitFunc} value="lecture" className="form-submit">Filtruj</Button>
						</Form.Group>
					</Col>
				</Form.Row>
				<Form.Row id="show-all-buttons">
					<Button variant="success" value="all" onClick={showAllCandidatesFunc}>Wszyscy kandydaci</Button>
					<Button variant="success" value="workshop" onClick={showAllCandidatesFunc}>Uczestnicy warsztatów</Button>
					<Button variant="success" value="lecture" onClick={showAllCandidatesFunc}>Uczestnicy wykładów</Button>
				</Form.Row>
			</Form>
			<br/>
		</CustomCSS>
    )
}

export function SearchCandidate({ changeFunc}) {
	return (
		<CustomCSS>
			<Form>
				<Form.Row className="characterSearch">
					<Form.Group className="form-inline">
						<Form.Label>Szukaj według frazy</Form.Label>
						<Form.Control type="text" as="input" size="md" onChange={changeFunc} name="inputFilter" className="form-input" />
					</Form.Group>
				</Form.Row>
			</Form>
		</CustomCSS>
	)
}
