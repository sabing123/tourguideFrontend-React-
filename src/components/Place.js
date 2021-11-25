import React, { Component } from 'react';
import Axios from 'axios';
import Navigation from './navigationBar';

export default class Place extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            places: []
 
        }
    }
    

    componentDidMount(){
        Axios.get('http://localhost:3000/place')
        .then((response)=>{
            console.log (response.data)
            this.setState({
                places: response.data
            })

        })
    }
   
    render() {
        return (
           
            <div>
            <Navigation />

                <div className="header" >
                    <h1>Grab some information about place</h1>
                  
{
    this.state.places.map((place)=> {

        return <div class="row">
					<div class="leftcolumn">
						<div class="card">
								<h2>{place.name}</h2>
								<h5>{place.location},{place.createdAt.date}</h5>
								<p><div class="fakeimg" style={{height: '250'}}><img src={`http://localhost:3000/uploads/${place.image}`} alt="Places" height="250" width="750"/></div>
								{place.description}</p>
						</div>
					</div>
				</div>
           
    })
}         
 </div>
 </div>  
        )
    }
}
