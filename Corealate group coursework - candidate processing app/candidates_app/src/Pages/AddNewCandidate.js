import React from 'react';
import { NewCandidateForm } from '../Utils/NewCandidateForm';
import {AppConfig} from '../AppConfig'

class AddNewCandidate extends React.PureComponent {
    state = {
        is_lecture: false,
        workshop: null,
        reload: false,
        success: null
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value === "null" ? null : event.target.value
        })
        event.preventDefault();
    }

    handleSelect = () => {
        this.setState((prevState) => {
            return {
                is_lecture: !prevState.is_lecture
            }
        })
    }

    postCandidate = async (event) => {
        event.preventDefault()
        const url = AppConfig.urls.candidates.post;
        const options = {
            method: 'POST',
            body: JSON.stringify(this.state),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        }
        let status = undefined;
        const text = await fetch(url, options)
            .then((response) => {
                status = response.status;
                return response.text();
            })
            .then((response) => {
                return response;
            })
            .catch(error => console.log(error));
        
        if (status < 300 && status !== undefined) {
            this.setState({
                reload: true,
                success: true,
                alertText: text
            })
        }
        else {
            this.setState({
                success: false,
                alertText: text
            })
        }
    }

    componentDidUpdate = () => {
        this.setState({ reload: false })
    }

    render() {
        return !this.state.reload && (
            <NewCandidateForm handleChange={this.handleChange} handleSelect={this.handleSelect} postCandidate={this.postCandidate} state={this.state} />
        )
    }
}

export default AddNewCandidate;