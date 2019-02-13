import React, { Component } from 'react'
import './App.css';

import axios from 'axios'

class App extends Component {
	
	state = {
		venues: []
	}
	
	componentDidMount() {
		this.getVenuesFourSquare()
		this.loadMap()
	}
	
	loadMap = () => {
		loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDccS5PRoLH8cItEXSWTakiMTwfUvFgnLU&callback=initMap")
		window.initMap = this.initMap
	}
	
/*gets Venues from Foursquare*/ 
	getVenuesFourSquare = () => {
		const lastPoint = "https://api.foursquare.com/v2/venues/explore?"
		const param = {
			client_id: "HYLFQ5SUKKGMKEWALBY4N3VNHOKX3SO1H2ZUEB2RBF2ZUMAI",
			client_secret: "OKTJWB0JAMXAHPC03ON0UT4OKJIOYXUM0P2QKI2I1O35K2U5",
			query: "shops",
			near: "Sidney",
			v: "20182507"
		}

/* get Parameters by using axios */		
		axios.get(lastPoint + new URLSearchParams(param))
			.then(response => {
				this.setState({
					venues: response.data.response.groups[0].items
				})
			})
			.catch(error => {
				console.log("Error " + error)
			})
	}
	
	initMap = () => {
        var map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        })
		
		var marker = new window.google.maps.Marker({
			position: {lat: -34.397, lng: 150.644},
			map: map,
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
