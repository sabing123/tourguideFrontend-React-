import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter,Table, Button, Input, Form, FormGroup, CustomInput} from 'reactstrap'
import Axios from 'axios'
import Popup from './TrekkingPopup'
import {Drawer,Header,Navigation,Content,Layout} from 'react-mdl'

export default class HotelList extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
          Trekkings: [],
          currentTreeking:{},
          selectedFile: null
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
        Axios.get('http://localhost:3000/trekking')
        .then((response)=>{
            console.log (response.data)
            this.setState({
                Trekkings: response.data
            })

        })
    }

    HandleRemove = (TreekingId) => {
        Axios.delete(`http://localhost:3000/trekking/${TreekingId}`)
        .then((response) =>{
          const filteredTrekking = this.state.Trekkings.filter((trekking) => {
            return trekking._id == TreekingId
        })
        this.setState({
            Trekkings: filteredTrekking
        })
        alert('Delete Successful!');
        window.location.reload(false);
        })
    }

 //Places edit by their unique id
 UpdateTrekking = (TreekingId) => {
    console.log(TreekingId)

    this.setState({
        currentTreeking: this.state.Trekkings.find((Treeking) => {
            return Treeking._id === TreekingId
        })
    }, console.log(this.state.currentTreeking.name));
     this.toggle();
}
handletreekingChange = (e) => {
    this.setState({
        currentTreeking: { ...this.state.currentTreeking, [e.target.name]: e.target.value }
    });
};
handleRouteUpdate=(TreekingId)=>{
    console.log(TreekingId);
    // event.preventDefault();
    Axios.put(`http://localhost:3000/trekking/${TreekingId}`,this.state.currentTreeking)
    .then((response)=>{
        console.log(response.data)
        let updateRoute = this.state.Trekkings.map((trekking)=> {
            if(trekking._id === TreekingId) {
                trekking = this.state.currentTreeking
            }
            return trekking
        })
        
        this.setState({
            Trekkings: updateRoute
        })
        this.toggle();

        // alert('user updated');
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
                currentTreeking: { ...this.state.currentTreeking, image: response.data.filename }
            })
        }).catch((err) => console.log(err.response))
}


    render() {
        return (
            <div>
            {/* The drawer is always open in large screens. The header is always shown, even in small screens. */}
<div style={{height: '720px', position: 'relative'}}>
    <Layout fixedHeader fixedDrawer>
        <Header title="Admin Pannel" >

        <Button color="primary" onClick={this.togglePopup.bind(this)}>Add Treeking Places</Button>
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

        <h1>Admin Pannel for Trekking Places Information</h1>

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
this.state.Trekkings.map((Trekking)=> {
return<tr>

<td>{Trekking.name}</td>
<td>{Trekking.location}</td>
<td>{Trekking.description}</td>
<td><img src={`http://localhost:3000/uploads/${Trekking.image}`} alt="Trekking Places" height="50" width="50"/></td>
<td><Button color="primary" onClick={()=>this.UpdateTrekking(Trekking._id)}>Edit</Button> &nbsp;
<Button color="danger" onClick={() => this.HandleRemove(Trekking._id)} >Delete</Button>
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
                            value={this.state.currentTreeking.name} 
                                onChange={this.handletreekingChange}
                               
                                />
                        </FormGroup>
                        <FormGroup>
                            <Input name='location' type='text'
                            value={this.state.currentTreeking.location} 
                                onChange={this.handletreekingChange}
                               />
                        </FormGroup>
                        <FormGroup>
                            <textarea className="area" name='description'
                            value={this.state.currentTreeking.description} 
                                onChange={this.handletreekingChange}
                            />
                        </FormGroup>  


                         <FormGroup>
                                <img className='img-thumbnail'
                                    width='200' src={`http://localhost:3000/uploads/${this.state.currentTreeking.image}`}
                                    alt="Trekking Pic" /><br />
                                <CustomInput type='file' id='profilePic'
                                    onChange={this.handleFileSelect} />
                                    <Button color='danger' onClick={this.uploadFile} block>Upload Picture</Button>
                            </FormGroup> 
                                          
                                                     
                    </ModalBody>  
                    <ModalFooter>
                        <Button color='primary' onClick={()=>this.handleRouteUpdate(this.state.currentTreeking._id)}>
                            Save Changes</Button>
                    </ModalFooter>
                </Modal>



</div>
                <br />
               
            </div>
        )
    }
}
