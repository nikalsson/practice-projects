import React from 'react';
import CandidateTable from '../Tables/candidatesTable';
import { SearchGridForm, SearchCandidate }  from '../Utils/Forms';
import { UserAmountDisplay } from '../Utils/UserAmountDisplay';
import download from 'downloadjs';
import { AppConfig } from '../AppConfig'
import { changeCandidateDecision, getData } from '../Routes/candidatesRoutes'

function filterCandidatesWithDecision(candidates) {
  return candidates.filter(x => x.decision !== "REJ" && x.decision !== null)
}

function filterCandidatesAcceptedToWorkshop(candidates) {
  return candidates.filter(x => x.decision !== null && x.decision !== "REJ" && x.decision === "ACC_WOR")
}

class Candidates extends React.PureComponent {
  state = {
    endpoint: AppConfig.urls.candidates.all,
    candidates: [],
    workshopFilter: null,
    lectureFilter: null,
    acceptedCandidatesCount: 0,
    allButtonsVisible: false,
    searchFormReload: false,
    workshopCandidatesCount: "",
    workshopSize: "",
    workshopFilterOptions: AppConfig.filterOptions.workshopFilterOptions,
    lectureFilterOptions: AppConfig.filterOptions.lectureFilterOptions,
    filteredCandidates: [],
    filter: ""
  }
  componentDidMount = async () => {
    const data = await getData(this.state.endpoint, fetch)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.log(error);
      })

    this.setState({
      candidates: data,
      acceptedCandidatesCount: filterCandidatesWithDecision(data).length
    })
  }

  componentDidUpdate = () => {
    this.setState({
      searchFormReload: false
    })
  }

  fetchParticipantsCount = async () => {
    const data = await getData(AppConfig.urls.positivedecision, fetch)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.log(error);
      })
    return data.count
  }

  fetchLists = async () => {

    const url = AppConfig.urls.lists;
    await getData(url, fetch)
      .then(response => {
        return response.blob();
      })
      .then(blob => {
        download(blob, "listy.zip");
      })
      .catch(error => {
        console.log(error);
      });
  }
  handleFilterChange = (event) => {
    const newfilter = event.target.value;
    this.filterCandidatesByInput(newfilter);
    this.setState({
      filter: newfilter
    })
  }


  handleShowAllCandidatesClick = async (event) => {
    let newEndpoint = '';
    if (event.target.value === "all") {
      newEndpoint = AppConfig.urls.candidates.all;
    }
    else if (event.target.value === "lecture") {
      newEndpoint = AppConfig.urls.candidates.lecture;
    }
    else if (event.target.value === "workshop") {
      newEndpoint = AppConfig.urls.candidates.workshop;
    }
    else return

    const data = await getData(newEndpoint, fetch)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        if (error) return undefined;
        console.log(error);
      })

    this.setState({
      lectureFilter: null,
      workshopFilter: null,
      allButtonsVisible: false,
      searchFormReload: true,
      chosenWorkshopFilter: null
    })

    if (data !== undefined && data !== null) {
      this.setState({
        endpoint: newEndpoint,
        candidates: data
      })
    }
  }

  handleSearchFormChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value === "null" ? null : event.target.value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let newEndpoint = this.state.endpoint;
    let selectedWorkshopSize = "";
    let visible = false;

    if (event.target.value === "lecture" && this.state.lectureFilter !== null) {
      newEndpoint = AppConfig.urls.candidates.lecture + this.state.lectureFilter;
      visible = false;
    }

    else if (event.target.value === "workshop" && this.state.workshopFilter !== null) {
      newEndpoint = AppConfig.urls.candidates.workshop + this.state.workshopFilter;
      visible = true;

      // If the workshop filter is applied, find the corresponding workshop size
      if (this.state.workshopFilter > 0 && this.state.workshopFilter < 7) { 
        selectedWorkshopSize = AppConfig.filterOptions.workshopFilterOptions[this.state.workshopFilter].size;
      }
    }

    else {
      newEndpoint = AppConfig.urls.candidates.all;
      visible = false;
    }

    const data = await getData(newEndpoint, fetch)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.log(error);
      })

    const candidates = filterCandidatesAcceptedToWorkshop(data)

    this.setState({
      endpoint: newEndpoint,
      candidates: data,
      workshopCandidatesCount: this.state.workshopFilter !== null ? candidates.length : "",
      allButtonsVisible: visible,
      chosenWorkshopFilter: this.state.workshopFilter,
      workshopSize: selectedWorkshopSize
    })
  }

  handleDecisionChange = async (event) => {

    const email = event.target.value;
    const decision = event.target.name;
    const url = AppConfig.urls.decision;
    const options = AppConfig.fetchOptions.put;
    let status = ""
    const text = await changeCandidateDecision(email, url, decision, options, fetch)
      .then((response) => {
        status = response.status
        return response.text()
      })
      .catch(error => {
        console.log(error);
        return undefined;
      });
    if (status < 300 && status !== undefined) {
      const newCandidates = [...this.state.candidates]
      newCandidates.forEach(x => {
        if (x.email === email) x.decision = decision;
      })
      const count = await this.fetchParticipantsCount().catch(error => console.log(error));
      this.setState({
        candidates: newCandidates,
        workshopCandidatesCount: this.state.workshopFilter !== null ? filterCandidatesAcceptedToWorkshop(newCandidates).length : "",
        acceptedCandidatesCount: count
      })
    }
    else alert(text)
  }

  filterCandidatesByInput = (filter) => {
    const candidates = this.state.candidates;
    let candidatesTextFiltered = candidates.filter(candidate =>
      candidate.email.includes(filter) ||
      candidate.name.includes(filter) ||
      candidate.lastname.includes(filter)
    )
    this.setState({ filteredCandidates: candidatesTextFiltered })
  }

  render() {
    return (
      <React.Fragment>
        <UserAmountDisplay state={this.state} fetchLists={this.fetchLists} />
        {!this.state.searchFormReload && <SearchGridForm showAllCandidatesFunc={this.handleShowAllCandidatesClick} changeFunc={this.handleSearchFormChange} submitFunc={this.handleSubmit} workshopFilterOptions={this.state.workshopFilterOptions} lectureFilterOptions={this.state.lectureFilterOptions} />}
        <SearchCandidate changeFunc={this.handleFilterChange} ></SearchCandidate>
        {this.state.filter === "" && <CandidateTable candidates={this.state.candidates} func={this.handleDecisionChange} />}
        {this.state.filter !== "" && <CandidateTable candidates={this.state.filteredCandidates} func={this.handleDecisionChange} />}
      </React.Fragment>
    );
  }
}

export default Candidates