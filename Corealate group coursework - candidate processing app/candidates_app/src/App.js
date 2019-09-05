import React from 'react';
import './App.css';
import Candidates from './Pages/CandidatesGrid';
import AddNewCandidate from './Pages/AddNewCandidate'
import { ViewSelectionButtons, ReturnButton } from './Pages/SelectionButtons'
import { Layout } from './Components/Layout';

class App extends React.PureComponent {
  state = {
    choiceButtonsVisible: true,
    formVisible: false,
    candidatesVisible: false
  }

  showCandidates = () => {
    this.setState({
      choiceButtonsVisible: false,
      formVisible: false,
      candidatesVisible: true
    })
  }

  showForm = () => {
    this.setState({
      choiceButtonsVisible: false,
      formVisible: true,
      candidatesVisible: false
    })
  }

  goBack = () => {
    this.setState({
      choiceButtonsVisible: true,
      formVisible: false,
      candidatesVisible: false
    })
  }

  render() {
    return (
      <React.Fragment>
        <Layout>
          { this.state.choiceButtonsVisible && <ViewSelectionButtons showForm={ this.showForm } showCandidates={ this.showCandidates }/> }

          { this.state.formVisible &&
            <React.Fragment>
              <ReturnButton goBack={ this.goBack } />
              <AddNewCandidate />
            </React.Fragment>
          }

          { this.state.candidatesVisible &&
            <React.Fragment>
              <ReturnButton goBack={ this.goBack } />
              <Candidates />
            </React.Fragment>
          }
        </Layout>
        
      </React.Fragment>
    );
  }
}

export default App;
