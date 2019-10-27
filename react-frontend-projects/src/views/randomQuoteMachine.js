import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'  // Import Font-Awesome
import { faTwitter } from '@fortawesome/free-brands-svg-icons' // Import Twitter logo from Font-Awesome
import styled from 'styled-components' // styled-components module for easier CSS

// Load the CSS using styled-components
const CustomCSS = styled.div(require('./randomQuoteMachine.css'))

class QuoteMachine extends React.PureComponent {

  state = {
    color: "rgb(227, 226, 193)",
    quote: "",
    author: "",
    buttonActive: true,
    toggleFade: true,
  }

  // Load a random quote on module load
  componentDidMount () {
    this.quotePicker();
  }

  RGBGenerator = () => {
    // Generate RGB values between 150 and 255, attempt to create pastel colors
    let RGBValueHolder = []
    let i = 0
    while (i < 3) {
      RGBValueHolder.push(Math.floor((Math.random() * 70) + 185))
      // Prevent too bright values by reducing the last RGB value if previous two were too bright
      if (RGBValueHolder.length === 3 && (RGBValueHolder[0] >= 240 && RGBValueHolder[1] >= 240)){
        let randomRGBinArr = Math.floor((Math.random() * 3)) // Pick number from 0...2 so as to reduce a random RGB value
        RGBValueHolder[randomRGBinArr] -= 30
      }
      i++
    }

    // Set the new randomized RGB value as state
    let RGB = `rgb(${RGBValueHolder[0]}, ${RGBValueHolder[1]}, ${RGBValueHolder[2]})`
    this.setState({
      color: RGB
    })
  }
  
  // Fetch the quote from Forismatic API
  fetchQuote = async() => {
    try {
      // Use this proxy to bypass CORS because this is a simple single-page application
      let url = "https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
      // let url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json" 
      const fetchedData = await fetch(url, {mode: "cors", dataType: "jsonp"})
      const fetchedDataInJSON = await fetchedData.json() // To extract the JSON body content from the response, use the json() method
      return fetchedDataInJSON
    }
    catch(error) {
      console.log(error)
      const errorReturn = {quoteText: "Error fetching the quote, please try again", quoteAuthor: "Admin"}
      return errorReturn
    }
  }
  
  // Set the quote to text field
  quotePicker = async() => {
    // Pick a random quote
    let fetchedQuote = await this.fetchQuote();
    const newQuote = fetchedQuote.quoteText
    const newAuthor = fetchedQuote.quoteAuthor ? fetchedQuote.quoteAuthor : "Unknown"
    this.setState({
      quote: newQuote,
      author: newAuthor 
    })
  }

  buttonCooldown = () => {
    this.setState({ buttonActive: false })
    setTimeout(() => {
      this.setState({ buttonActive: true })
    }, 1500);
  }

  render(){

    // Use a darker variant of the background color as the quote and author text color
    let RGBColors = this.state.color.split(/[^\d]/).filter(n => n)
    let darkerColors = RGBColors.map(number => number - 80);
    let textColor = `rgb(${darkerColors[0]}, ${darkerColors[1]}, ${darkerColors[2]})`

    return (
      <CustomCSS>
        <div className="wrapper" style={{backgroundColor: this.state.color}}>
          <div id="quote-box" style={{color: textColor}}>
            <div id="text">
              {this.state.quote}
            </div>
            <div id="author">
              {this.state.author}
            </div>
            <div id="button-bar">
              <a id="tweet-quote" style={{color: this.state.color}} target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text='${this.state.quote}' -${this.state.author}`}>
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <button id="new-quote"
                disabled={!this.state.buttonActive}
                style={{backgroundColor: this.state.color}} 
                onClick ={() => { this.RGBGenerator(); this.quotePicker(); this.buttonCooldown(); }}>
                  New quote
              </button>
            </div>
          </div>
        </div>
      </CustomCSS>
    );
  }
}

export default QuoteMachine;
