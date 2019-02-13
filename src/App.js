import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	
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

export default App;
