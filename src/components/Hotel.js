import React, { Component } from 'react'
import Axios from 'axios'

import Navigation from './navigationBar';
export default class Hotel extends Component {

constructor(props) {
    super(props)

    this.state = {
        hotels: []
    }
}


    componentDidMount(){
        Axios.get('http://localhost:3000/hotel')
        .then((response)=>{
            console.log (response.data)
            this.setState({
                hotels: response.data
            })

        })
    }

    render() {
        return (
          
            <div>
            <Navigation />
                <div className="header" >
                    <h1>Grab some information about Hotel</h1>

{
    this.state.hotels.map((hotel)=> {

        return <div class="row">
					<div class="leftcolumn">
						<div class="card">
								<h2>{hotel.name}</h2>
								<h5>{hotel.location},{hotel.createdAt.date}</h5>
								<p><div class="fakeimg" style={{height: '250'}}><img src={`http://localhost:3000/uploads/${hotel.image}`} alt="Places" height="250" width="750"/></div>
								{hotel.description}</p>
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

