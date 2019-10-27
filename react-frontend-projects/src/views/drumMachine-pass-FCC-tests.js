import React from 'react';
import styled from 'styled-components' // styled-components module for easier CSS

// Load the CSS using styled-components
const CustomCSS = styled.div(require('./drumMachine.css'))

const keyCodesDrumHits = {
	1: {keyCode: 81, letter: "Q", file: "hihat-808.wav"},
	2: {keyCode: 87, letter: "W", file: "hihat-digital.wav"},
	3: {keyCode: 69, letter: "E", file: "hihat-ring.wav"},
	4: {keyCode: 65, letter: "A", file: "tom-808.wav"},
	5: {keyCode: 83, letter: "S", file: "tom-rototom.wav"},
	6: {keyCode: 68, letter: "D", file: "snare-808.wav"},
	7: {keyCode: 90, letter: "Z", file: "kick-808.wav"},
	8: {keyCode: 88, letter: "X", file: "kick-big.wav"},
	9: {keyCode: 67, letter: "C", file: "clap-808.wav"}
}

class DrumMachine extends React.Component {
	state = {
		display: "Play a sound"
	}

	componentDidMount() {
		document.addEventListener("keydown", this.handleKeyDown);
		window.focus();
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.handleKeydown)
	}

	// Play audio files on component update
	componentDidUpdate() {
		if (this.state.display !== "Play a sound" || "Sound not found") {
			this.playSound(this.state.display);
			
			// The method to play audio file below seems to be more reliable than my playSound function, fires almost every time. But it does not pass the FCC tests since it doesn't play the audio element within the drum pad.
			// Using the public folder and process.env.PUBLIC_URL for audio files not to have to import them
			// const audio = new Audio(`${process.env.PUBLIC_URL}/drums/${this.state.display}`)
			// audio.play();
		}
	}

	// The playSound function allows to pass the FCC test but is unreliable - does not fire every time. 
	playSound = (id) => {
		try {
			let fileName = document.querySelector("#"+id.slice(0, -4)+"\\.wav audio")
			fileName.play();
		}
		catch (err) {
			console.log(err)
		}
	}
	
	handleClick = (event) => {
		this.setState({
			display: event.target.id
		})
	}
	
	handleKeyDown = (event) => {
		let soundToPlay = "";
		// Loop through the object, match the pressed key to the one in object keyCodesDrumHits
		Object.keys(keyCodesDrumHits).forEach(key => {
			if (keyCodesDrumHits[key].keyCode === event.keyCode) {
				// Can select the pressed button with this, leave it here if will be handy later
				// let fileName = keyCodesDrumHits[key].file
				// document.querySelector("#"+fileName.slice(0, -4)+"\\.wav")
				soundToPlay = keyCodesDrumHits[key].file
				return
			}
		})
		// Test if the keypress matched object's keyCodes
		this.setState({
			display: (soundToPlay !== "") ? soundToPlay : "Sound not found"
		})
	}

	// Function for creating a single drum pad
	Drumpad = (props) => {
		return (
			React.createElement("button", { className: "drum-pad", id: props.element.file, onClick: props.handleClick },
				<span>{props.element.letter}</span>,
				// The element has to have an audio element in to pass the tests
				React.createElement("audio", {
					className: "clip", 
					id: props.element.letter,
					src: `${process.env.PUBLIC_URL}/drums/${props.element.file}`,
				})
			)
		)
	}

	render() {
		return(
			<CustomCSS>
				<main id="drum-machine">
					<div id="drum-pad-grid">
						{ 
							// Create a grid of drum pads from the keyCodesDrumHits object, also specifies the order of the pads
							Object.keys(keyCodesDrumHits).map(key => {
								return (
									React.createElement(this.Drumpad, {
										element: keyCodesDrumHits[key],
										handleClick: this.handleClick,
										key: key
									})
								)
							})
						}
					</div>
				<div id="display">
						{this.state.display}
					</div>
				</main>
			</CustomCSS>
		)
	}
}

export default DrumMachine