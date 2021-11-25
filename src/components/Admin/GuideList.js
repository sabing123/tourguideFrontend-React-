import React, { Component } from 'react'
import {Drawer,Header,Navigation,Content,Layout,Textfield} from 'react-mdl'
import { Card,CardTitle,CardText,CardBody,CustomInput, Col, Row,Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, FormGroup } from 'reactstrap'
import Axios from 'axios'
import Popup from './GuidePopup'

export default class GuideList extends Component {
constructor(props) {
    super(props)

    this.state = {
         guides:[],
         currentGuide:{},
         selectedFile: null,
    }
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
                currentGuide: { ...this.state.currentGuide, image: response.data.filename }
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

componentDidMount(){
    Axios.get('http://localhost:3000/touristguide')
    .then((response)=>{
        console.log (response.data)
        this.setState({
            guides: response.data
        })

    })
}

HandleGuideDelete = (Guideid) => {
    Axios.delete(`http://localhost:3000/touristguide/${Guideid}`)
    .then((response) =>{
      const filteredGuide = this.state.guides.filter((Guide) => {
        return Guide._id == Guideid
    })
    this.setState({
        guides: filteredGuide
    }) 
    alert('Delete Successful!');
    window.location.reload(false);
    })
}



  //Update information of Guide by Unique ID
  GuideEdit = (Guideid) => {
    console.log(Guideid)

    this.setState({
        currentGuide: this.state.guides.find((Guide) => {
            return Guide._id === Guideid
        })
    }, console.log(this.state.currentGuide.name));
     this.toggle();
}

handleGuideChange = (e) => {
    this.setState({
        currentGuide: { ...this.state.currentGuide, [e.target.name]: e.target.value }
    });
};



///update Tourist Guide information
handleUpdate=(Guideid)=>{
    console.log(Guideid);
    Axios.put(`http://localhost:3000/touristguide/${Guideid}`,this.state.currentGuide)
    .then((response)=>{
        console.log(response.data)
        let updateGuide = this.state.guides.map((guide)=> {
            if(guide._id === Guideid) {
                guide = this.state.currentGuide
            }
            return guide
        })
        
        this.setState({
            guides: updateGuide
        })
        this.toggle();

        // alert('user updated');
    })
}

    render() {
        return (
            <div>
                {/* The drawer is always open in large screens. The header is always shown, even in small screens. */}
<div style={{height: '1000px', position: 'relative'}}>
    <Layout fixedHeader fixedDrawer>
        <Header title="Admin Pannel"> 
        <Button color="primary" onClick={this.togglePopup.bind(this)}>Add Guide</Button>
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

        <Row>

{
this.state.guides.map((guide)=> {
return<Col xs="6">
<Card style={{ width: '25rem', background:'white', marginLeft:'40px'}}>
      
      <CardBody>
          <img style={{textAlign:"center", marginLeft:'80px'}} src={`http://localhost:3000/uploads/${guide.image}`} alt="Guides" height="100" width="150"/>
          <br />
      <Button variant="primary" size="lg" active style={{marginTop:'10px',marginLeft:'80px', textAlign:'center', background:'blue'}} > {guide.name} </Button>
         <br />
        
          <CardTitle>
          <label><b>Address : </b></label>
          &nbsp; {guide.address}</CardTitle>
          <CardText>
              <label><b>Phone Number : </b></label>
        &nbsp;{ guide.contact }
          </CardText>

         <CardText>
<label><b>Known language : </b></label>
&nbsp; {guide.language}
          </CardText>
         
          <CardText>
          <label><b>Description :  </b></label>
          &nbsp; {guide.description}
          </CardText>
          <Button color="primary" onClick={()=>this.GuideEdit(guide._id)}>Edit</Button> &nbsp;
      <Button color="danger" onClick={() => this.HandleGuideDelete(guide._id)}>Delete</Button>
      </CardBody>
    </Card>
    </Col>
    
})
}
    </Row>
        </Content>
        <br />
    </Layout>


    <Modal  isOpen={this.state.isEdit} toggle={this.toggle}  >
                    <ModalHeader toggle={this.toggle}
                   
                    >
                        Edit Hotel Data
                    </ModalHeader>
                    <ModalBody className="editoperation"  >
                        <FormGroup>
                            <Input name='name' type='text'
                            value={this.state.currentGuide.name} 
                                onChange={this.handleGuideChange}
                                />
                        </FormGroup>
                        <FormGroup>
                            <Input name='address' type='text'
                            value={this.state.currentGuide.address} 
                                onChange={this.handleGuideChange}
                               />
                        </FormGroup>

                        <FormGroup>
                            <Input name='contact' type='text'
                            value={this.state.currentGuide.contact} 
                                onChange={this.handleGuideChange}
                               />
                        </FormGroup>

                        <FormGroup>
                            <Input name='language' type='text'
                            value={this.state.currentGuide.language} 
                                onChange={this.handleGuideChange}
                               />
                        </FormGroup>

                        <FormGroup>
                            <textarea className="area" name='description'
                            value={this.state.currentGuide.description} 
                                onChange={this.handleGuideChange}
                            />
                        </FormGroup>   

                        <FormGroup>
                                <img className='img-thumbnail'
                                    width='200' src={`http://localhost:3000/uploads/${this.state.currentGuide.image}`}
                                    alt="Hotel Pic" /><br />
                                <CustomInput type='file' id='profilePic'
                                    onChange={this.handleFileSelect} />
                                    <Button color='danger' onClick={this.uploadFile} block>Upload Picture</Button>
                            </FormGroup>  
                                                     
                    </ModalBody>  
                    <ModalFooter>
                        <Button color='primary' onClick={()=>this.handleUpdate(this.state.currentGuide._id)}>
                            Save Changes</Button>
                    </ModalFooter>
                </Modal>

    
</div>
<br />      </div>
        )
    }
}
