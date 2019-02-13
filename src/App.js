import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	
	loadMap = () => {
		loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDccS5PRoLH8cItEXSWTakiMTwfUvFgnLU&callback=initMap")
	}
	
	initMap = () => {
        const map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }
	
	
  render() {
    return (
		<main>
			<div id="map"></div>
		</main>
    );
  }
}

/* loads script from index.html */ 
function loadScript(url) {
	let index = window.document.getElementsByTagName("script")[0]
	let script = window.document.createElement("script")
	script.src = url
	script.async = true
	script.defer = true
	index.parentNode.insertBefore(script, index)
	
}

export default App;
