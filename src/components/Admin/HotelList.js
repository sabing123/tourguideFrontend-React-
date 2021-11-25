import React, { Component } from 'react'
import Axios from 'axios'
import Popup from './popup'; 
import FileUploadButton from './FileUploadButton' 
import {Drawer,Header,Navigation,Content,Layout,Textfield} from 'react-mdl'
import { Modal, ModalHeader, ModalBody, ModalFooter,Table, Button, Input, CustomInput, FormGroup, Label } from 'reactstrap'
export default class HotelList extends Component {
 
    constructor(props) {
        super(props)
        this.state = { showPopup: false };  
        this.state = {
            
          hotels: [],
          currentHotel:{},
          selectedFile: null,
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
                    currentHotel: { ...this.state.currentHotel, image: response.data.filename }
                })
            }).catch((err) => console.log(err.response))
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
  

    HandlehotelDelete = (hotelId) => {
        Axios.delete(`http://localhost:3000/hotel/${hotelId}`)
        .then((response) =>{
          const filteredHotel = this.state.hotels.filter((hotel) => {
            return hotel._id == hotelId
        })
        this.setState({
            hotels: filteredHotel
        })
        alert('Delete Successful!');
        window.location.reload(false);
        })
    }
  //Places edit by their unique id
  HotelEdit = (hotelId) => {
    console.log(hotelId)

    this.setState({
        currentHotel: this.state.hotels.find((hotel) => {
            return hotel._id === hotelId
        })
    }, console.log(this.state.currentHotel.name));
     this.toggle();
}

handleHotelChange = (e) => {
    this.setState({
        currentHotel: { ...this.state.currentHotel, [e.target.name]: e.target.value }
    });
};

///update events data by admin
handleUpdate=(hotelId)=>{
    console.log(hotelId);
    // event.preventDefault();
    Axios.put(`http://localhost:3000/hotel/${hotelId}`,this.state.currentHotel)
    .then((response)=>{
        console.log(response.data)
        let updatehotel = this.state.hotels.map((hotel)=> {
            if(hotel._id === hotelId) {
                hotel = this.state.currentHotel
            }
            return hotel
        })
        
        this.setState({
            hotels: updatehotel
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
        <Header title="Admin Pannel" > <Button color="primary" onClick={this.togglePopup.bind(this)}>Add Hotel</Button>
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
                <h1>Admin Pannel for hotel Information</h1>

               <Table striped bordered hover size="2sm">
                  
  <thead>
    <tr>

      <th>Name</th>
      <th>Location</th>
      <th>Description</th>
      <th>Image</th>
      <th>Action</th>
    </tr>
  </thead>
<tbody>
{
    this.state.hotels.map((hotel)=> {
        return<tr>

      <td>{hotel.name}</td>
      <td>{hotel.location}</td>
      <td>{hotel.description}</td>
      <td><img src={`http://localhost:3000/uploads/${hotel.image}`} alt="Places" height="50" width="50"/></td>
      <td><Button color="primary" onClick={()=>this.HotelEdit(hotel._id)}>Edit</Button> &nbsp;
      <Button color="danger" onClick={() => this.HandlehotelDelete(hotel._id)}>Delete</Button>
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
                            value={this.state.currentHotel.name} 
                                onChange={this.handleHotelChange}
                               
                                />
                        </FormGroup>
                        <FormGroup>
                            <Input name='location' type='text'
                            value={this.state.currentHotel.location} 
                                onChange={this.handleHotelChange}
                               />
                        </FormGroup>
                        <FormGroup>
                            <textarea className="area" name='description'
                            value={this.state.currentHotel.description} 
                                onChange={this.handleHotelChange}
                            />
                        </FormGroup>   

                           <FormGroup>
                                <img className='img-thumbnail'
                                    width='200' src={`http://localhost:3000/uploads/${this.state.currentHotel.image}`}
                                    alt="Hotel Pic" /><br />
                                <CustomInput type='file' id='profilePic'
                                    onChange={this.handleFileSelect} />
                                    <Button color='danger' onClick={this.uploadFile} block>Upload Picture</Button>
                            </FormGroup> 
                                                     
                    </ModalBody>  
                    <ModalFooter>
                        <Button color='primary' onClick={()=>this.handleUpdate(this.state.currentHotel._id)}>
                            Update Information</Button>
                    </ModalFooter>
                </Modal>
</div>
<div>
</div>

           
            </div>
        )
    }
}
