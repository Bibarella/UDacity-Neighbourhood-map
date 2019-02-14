import React from 'react';

class ListItem extends React.Component{
	render() {
		const locations = this.props.locations;
		return (
			<div className="ListItem">
				{this.props.venue.name}
				<p className="ListAdress">
					{this.props.venue.location.address}
				</p>
			</div>
    );
  }
}

export default ListItem;