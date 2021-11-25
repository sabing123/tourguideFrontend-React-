import React, { Component } from 'react'
import { GoogleApiWrapper,Marker  } from 'google-maps-react';
import Navigation from './navigationBar';
import Map from './Map'


export class gmaps extends Component {
    
    render() {
        return (
            <div>
              <Navigation />
              <div style={{margin:'50px'}}>

    
<Map
google={this.props.google}
center={{lat: 27.7172, lng:  85.3240}}
height='300px'
zoom={15}
/>
</div> 
            </div>
        
        )

    }
    
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA699wE4sgPIqECKQj50xdleihAVXTBgUI'
  })(gmaps);

