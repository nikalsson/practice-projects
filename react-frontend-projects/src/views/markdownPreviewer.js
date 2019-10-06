import React from 'react';
import styled from 'styled-components' // styled-components module for easier CSS

// Load the CSS using styled-components
const CustomCSS = styled.div(require('./markdownPreviewer.css'))

// Require marked.js, a low-level markdown compiler and set it to recognize line breaks
const marked = require('marked');
marked.setOptions({
  breaks: true
})

class MarkdownPreviewer extends React.PureComponent {
  state = {
    textarea: "# This is an ugly markdown previewer\n## Made for freeCodeCamp frontend library project\n This is an example [link](https://www.freecodecamp.com)\n`<script>alert('super')</script>` inline code with backticks\n```\nfunction sumTwo (a,b) {\n return a+b\n}\n```\n> BLOCK QUOTE\n- List item\n- **Bolded list item**\n\nAnd an image:\n![This is the alt text](https://developers.cloudflare.com/logos/freecodecamp.svg)",
    markdown: ""
  } 
  
  // Convert the text area text from markdown to HTML
  InputToMarkdown = () => {
    let textAreaInput = document.getElementById("editor").value
    this.setState({
      textarea: textAreaInput
    })
  }

  // Run the converter when the module loads
  componentDidMount(){
    this.InputToMarkdown();
  }

  componentWillUnmount() {
    this.InputToMarkdown();
  }

  render(){
    return(
      <CustomCSS>
        <div className="wrapper-markdown">
          <h3 style={{textAlign: 'center'}}>Markdown</h3>
          {/* Set the text area and on change run the InputToMarkdown function */}
          <textarea id="editor" onChange={ this.InputToMarkdown } defaultValue={this.state.textarea} />
          <br/>

          <h3 style={{textAlign: 'center'}}>Preview of the markdown</h3>
          {/* Update the markdown processed by marked and print it to HTML */}
          <div id="preview" dangerouslySetInnerHTML={{__html: marked(this.state.textarea)}} />
        </div>
      </CustomCSS>  
    )
  }
}

export default MarkdownPreviewer;