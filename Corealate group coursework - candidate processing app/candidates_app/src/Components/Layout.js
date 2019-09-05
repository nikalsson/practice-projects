import React from 'react'
import Container from 'react-bootstrap/Container'; // Does not import the entire library with this syntax!
import styled from 'styled-components' // styled-components module for easier CSS

// Custom CSS styling for the candidate filtering form
const CustomCSS = styled.div`
  // Override the Bootstrap default breakpoint for wide screens
  @media only screen and (min-width: 1200px) {
    .container {
      max-width: 90%;
    }
  }
`

export const Layout = (props) => (
  // Container is a bootstrap element to prevent contents from overflowing, center and add padding
  <CustomCSS>
    <Container>
      {props.children} 
    </Container>
  </CustomCSS>
)