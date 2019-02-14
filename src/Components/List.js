import React from "react";
import ListItem from './ListItem';

class List extends React.Component {
state = {
        query: '',
        venues: this.props.venues
    }
	render() {
		return (
			<div id="list">
				<input onChange={this.props.handleFilterChange}  />
				<ul>
					{this.props.venues.map((venue, i) => {     
						return (<ListItem venue={venue.venue} />) 
					})}
				</ul>
			</div>
		)

	}
		
  }


export default List;