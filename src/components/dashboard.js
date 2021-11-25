import React, { Component } from 'react';
import Navigation from './navigationBar';
import images from './images/ad.jpg'
import ad2 from './images/ad2.jpg'
import ad3 from './images/ad3.jpg'
import ad4 from './images/ad4.jpg'
import ad5 from './images/annapurna.jpg'
import ad6 from './images/Chitwan.jpg'
import ad7 from './images/gokyo.jpg'
import ad8 from './images/Sunrise.jpg'
import ad9 from './images/TilichoLake.jpg'
import Axios from 'axios'
import {Row, Col, CardBody, Card} from 'reactstrap'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


export default class dashboard extends Component {
constructor(props) {
    super(props)

    this.state = {
         trekkings:[],
         touristsguides:[]
    }

    
}


componentDidMount(){
    Axios.get('http://localhost:3000/trekking')
    .then((response)=>{
        console.log (response.data)
        this.setState({
            trekkings: response.data
        })

    })


    Axios.get('http://localhost:3000/touristguide')
    .then((response)=>{
        console.log (response.data)
        this.setState({
            touristsguides: response.data
        })

    })
}


    render() {
        return (
            <div>
            <Navigation />
                    <img src={images} alt="front image" width="1080" height="350" />
                  
            <div className="header" >
                    <h1>Grab some information about Trekking Places</h1>
 {
    this.state.trekkings.map((trekking)=> {

return <div className="row">
            <div class="leftcolumn">
                <div class="card">
                <p><div class="trekkingimg" style={{height: '250'}}><img src={`http://localhost:3000/uploads/${trekking.image}`} alt="Places" height="250" width="750" rounded /></div></p>
                        <h2><label>Name : </label> {trekking.name}</h2>
                        <h5><label>Location : </label> {trekking.location}</h5>
                        <p>
                        {trekking.description}</p>
                </div>
            </div>
        </div>

        
   
})

 }
 <br />
<h2> Some Places to visit in summar</h2>
<div class="carousel-wrapper" style={{backgroundColor:'red'}}>
            <Carousel  infiniteLoop  autoPlay>
                <div>
                    <img src={ad2} />
                    <p className="legend">Mustang</p>
                </div>
                <div>
                    <img src={ad3} />
                    <p className="legend">Kathmandu</p>
                </div>
                <div>
                    <img src={ad4} />
                    <p className="legend">Pokhara</p>
                </div>
                <div>
                    <img src={ad5} />
                    <p className="legend">Annapurna</p>
                </div>
                <div>
                    <img src={ad6} />
                    <p className="legend">Chitwan</p>
                </div>
                <div>
                    <img src={ad7} />
                    <p className="legend">Gokyo Lake</p>
                </div>
                <div>
                    <img src={ad8} />
                    <p className="legend">Sunrise Point</p>
                </div>
                <div>
                    <img src={ad9} />
                    <p className="legend">Tilicho Lake</p>
                </div>
            </Carousel>
            
        </div>
 </div>

<h1>Some Famous tourist Guide in the Town</h1>

 {
    this.state.touristsguides.map((touristsguides)=> {

return <div class="row">
<Card style={{ width: '55rem', background:'white' , marginLeft:'200px'}}>
<CardBody>
    <Row>


<Col xs="6">
            <div class="leftcolumn">
                <div className="guidecard" >
                <p><div><img className="img-circular" src={`http://localhost:3000/uploads/${touristsguides.image}`} alt="Places" height="250" width="750"/></div></p>
                     
                       
                        
                </div>
            </div>
    </Col>
<Col xs="6">
<div>
                        <h2><label>Name : </label> {touristsguides.name}</h2>
                        <h3><label>Address : </label> {touristsguides.address}</h3>
                        <h4><label>Contact : </label> {touristsguides.contact}</h4>
                        <h5><label>Known Language : </label> {touristsguides.language}</h5>
                        <p>{touristsguides.description}</p>
</div>
 </Col>

    </Row>
    </CardBody>
    </Card>
        </div>
      


        
   
})

 }
 <br />

 </div>

 
 
        )
    }
}
