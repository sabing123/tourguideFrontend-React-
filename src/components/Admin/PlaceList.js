import React, { Component } from 'react'
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, CustomInput} from 'reactstrap'

import {Drawer,Header,Navigation,Content,Layout,Textfield} from 'react-mdl';
import Popup from './Placepopup';
import Axios from 'axios';

export default class HotelList extends Component {

    constructor(props) {
        super(props)
        this.state = { showPopup: false };  
        this.state = {
          Places: [],
          currentplace:{},
          selectedFile: null,
        }
    }
    toggle = (e) => {
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    togglePopup() {  
        this.setState({  
             showPopup: !this.state.showPopup  
        });  
         }

    componentDidMount(){
        Axios.get('http://localhost:3000/place')
        .then((response)=>{
            console.log (response.data)
            this.setState({
                Places: response.data
            })
            
        })
    
    }

    handleFileSelect = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    uploadFile = (e) => {
        e.preventDefault();
        const data = new FormData()
        console.log(this.state.selectedFile)
        data.append('myFile', this.state.selectedFile)
        Axios.post('http://localhost:3000/upload', data)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    currentplace: { ...this.state.currentplace, image: response.data.filename }
                })
            }).catch((err) => console.log(err.response))
    }

    HandleDelete = (placelId) => {
        Axios.delete(`http://localhost:3000/place/${placelId}`)
        .then((response) =>{
          const filteredPlaces = this.state.Places.filter((place) => {
            return place._id == placelId
        })
        this.setState({
            places: filteredPlaces
        })
        alert('Delete Successful!');
        window.location.reload(false);
        })
    }


  //Places edit by their unique id
  PlaceEdit = (placelId) => {
    console.log(placelId)

    this.setState({
        currentplace: this.state.Places.find((place) => {
            return place._id === placelId
        })
    }, console.log(this.state.currentplace.name));
     this.toggle();
}
handlePlaceChange = (e) => {
    this.setState({
        currentplace: { ...this.state.currentplace, [e.target.name]: e.target.value }
    });
};

///update events data by admin
handleUpdate=(placelId)=>{
    console.log(placelId);
    // event.preventDefault();
    Axios.put(`http://localhost:3000/place/${placelId}`,this.state.currentplace)
    .then((response)=>{
        console.log(response.data)
        let updateplace = this.state.Places.map((places)=> {
            if(places._id === placelId) {
                places = this.state.currentplace
            }
            return places
        })
        
        this.setState({
            Places: updateplace
        })
        this.toggle();

        // alert('user updated');
    })
}


    render() {
     
        return (
            <div>

{/* The drawer is always open in large screens. The header is always shown, even in small screens. */}
<div style={{height: '720px', position: 'relative'}}>
    <Layout fixedHeader fixedDrawer>
        <Header title="Admin Pannel"> 
            
        <Button color="primary" onClick={this.togglePopup.bind(this)}>Add Place</Button>
        {this.state.showPopup ?  
<Popup closePopup={this.togglePopup.bind(this)}
/>      
: null  
} 

        </Header>
        <Drawer title="Tour Guide">
            <Navigation>
            <a href="/AdminDashboard">Dashboard</a>
                <a href="/PlaceList">Manage Place</a>
                <a href="/HotelList">Manage Hotel</a>
                <a href="/TrekkingList">Manage Treeking</a>
                <a href="/GuideList">Manage Tourist Guide</a>
            </Navigation>
        </Drawer>
        <Content> 

        <br />
                <h1>Admin Pannel for Places Information</h1>

               <Table striped bordered hover size="10md">
                  
  <thead style={{textAlign:'center'}}>
    <tr>

      <th>Name</th>
      <th>Location</th>
      <th style={{width:'550px'}}>Description</th>
      <th>Image</th>
      <th style={{width:'200px'}}>Action</th>
    </tr>
  </thead>
<tbody>
{
    this.state.Places.map((places)=> {
        return<tr>

      <td>{places.name}</td>
      <td>{places.location}</td>
      <td style={{textAlign:'justify'}}>{places.description}</td>
      <td><img src={`http://localhost:3000/uploads/${places.image}`} alt="Places" height="auto" width="50"/></td>
      <td><Button color="primary" onClick={()=>this.PlaceEdit(places._id)}>Edit</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button color="danger" onClick={() => this.HandleDelete(places._id)} > Delete </Button>
      </td>
    </tr>

    })
  }
</tbody>

</Table>

        </Content>
    </Layout>


    <Modal  isOpen={this.state.isEdit} toggle={this.toggle}  >
                    <ModalHeader toggle={this.toggle}
                   
                    >
                        Edit Hotel Data
                    </ModalHeader>
                    <ModalBody className="editoperation"  >
                        <FormGroup>
                            <Input name='name' type='text'
                            value={this.state.currentplace.name} 
                                onChange={this.handlePlaceChange}
                               
                                />
                        </FormGroup>
                        <FormGroup>
                            <Input name='location' type='text'
                            value={this.state.currentplace.location} 
                                onChange={this.handlePlaceChange}
                               />
                        </FormGroup>
                        <FormGroup>
                            <textarea className="area" name='description'
                            value={this.state.currentplace.description} 
                                onChange={this.handlePlaceChange}
                            />
                        </FormGroup>    

                        <FormGroup>
                                <img className='img-thumbnail'
                                    width='200' src={`http://localhost:3000/uploads/${this.state.currentplace.image}`}
                                    alt="Hotel Pic" /><br />
                                <CustomInput type='file' id='profilePic'
                                    onChange={this.handleFileSelect} />
                                    <Button color='danger' onClick={this.uploadFile} block>Upload Picture</Button>
                            </FormGroup> 
                                                     
                    </ModalBody>  
                    <ModalFooter>
                        <Button color='primary' onClick={()=>this.handleUpdate(this.state.currentplace._id)}>
                            Save Changes</Button>
                    </ModalFooter>
                </Modal>

</div>

            </div>
        )
}
}