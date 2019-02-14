import React, { Component } from 'react'
import './App.css';
import Header from './Components/Header'
import List from './Components/List';

import axios from 'axios'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			venues: [],
			allVenues: []
		}
	
		this.map = {};
		this.mapMarkers = [];
	}
	
	componentDidMount() {
		this.getVenuesFourSquare()
	}
	
	loadMap = () => {
		loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyD9avFCSC6zAgb4drhvsMPv4xlNdhxH_JM&callback=initMap")
		window.initMap = this.initMap
	}
	
/*gets Venues from Foursquare*/ 
	getVenuesFourSquare = () => {
		const lastPoint = "https://api.foursquare.com/v2/venues/explore?"
		const param = {
			client_id: "HYLFQ5SUKKGMKEWALBY4N3VNHOKX3SO1H2ZUEB2RBF2ZUMAI",
			client_secret: "OKTJWB0JAMXAHPC03ON0UT4OKJIOYXUM0P2QKI2I1O35K2U5",
			query: "restaurant",
			near: "Salzburg",
			v: "20182507"
		}

/* get Parameters by using axios */		
		axios.get(lastPoint + new URLSearchParams(param))
			.then(response => {
				this.setState({
					venues: response.data.response.groups[0].items, 
					allVenues: response.data.response.groups[0].items
				}, this.loadMap())
			})
			.catch(error => {
				console.log("Error " + error)
			})
	}
	
	initMap = () => {
        this.map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 47.811195, lng: 13.033229},
          zoom: 15
        })
		
		this.updateMarkers();
	}
	
	updateMarkers = () => {
		let infowindow = new window.google.maps.InfoWindow()

		// first remove all markers from the map
		this.removeAllMapMarkers();
		
		 this.state.venues.map(myVenue => {
			 
			let contentString = `${myVenue.venue.name}`
			let contentStringAdress = `${myVenue.venue.location.adress}`

/*adds Markers to the map*/
			let marker = new window.google.maps.Marker({
			position: {lat: myVenue.venue.location.lat , lng: myVenue.venue.location.lng},
			map: this.map,
			title: myVenue.venue.name
			})

/*Listener to open Marker Information*/			
			marker.addListener('click', function() {
				
				infowindow.setContent(contentString)
				
				infowindow.open(this.map, marker);
			})
			
			this.mapMarkers.push(marker);
		})
		
	}
	
	removeAllMapMarkers = () => {
		this.mapMarkers.forEach((marker) => {
			// setting the map null removes a marker from the map
			marker.setMap(null);
		});
	}
	
	handleFilterChange = event => {
		
		let searchQuery = event.target.value;
		console.log("handleFilterChange", searchQuery);
		let allVenues = this.state.allVenues.slice();
		let venues = this.filterLocations(searchQuery, allVenues);
		this.setState({venues: venues}, this.updateMarkers());
	};
	
	filterLocations = (searchQuery, locations) => {
		return locations.filter(location =>
			location.venue.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
	};
	
  render() {
    return (
		<div className="App">
			<Header />
			<List venues={this.state.venues} handleFilterChange={this.handleFilterChange}/>
			<div id="map"></div>
			<main>
			</main>
		</div>
    );
  }
}

/* loads script*/ 
function loadScript(url) {
	let index = window.document.getElementsByTagName("script")[0]
	let script = window.document.createElement("script")
	script.src = url
	script.async = true
	script.defer = true
	index.parentNode.insertBefore(script, index)
	
}

export default App;
