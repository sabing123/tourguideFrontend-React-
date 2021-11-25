import React from 'react';  
import './style.css';  
import Axios from 'axios';
import {Button, FormGroup, CustomInput} from 'reactstrap';

class TrekkingPopup extends React.Component { 
  
    constructor(props) {
        super(props)
    
        this.state = {
        trekking:[],
        name:'',
        location:'',
        description:'',
        image:'',
        selectedFile: null,
        }
    }
    handleChange = (event) =>{
      this.setState({
        [event.target.name]: event.target.value
      })
    }


    handleFileChange = (e) => {
      this.setState({
          currentFile: e.target.files[0]
      })
  }


  
  handleSubmit = (e) => {
    e.preventDefault();

    let data = new FormData();
    console.log(this.currentFile);
    console.log(data);
    data.append('myFile', this.state.currentFile);
    Axios.post('http://localhost:3000/upload', data)
        .then((response) => {
            console.log(response.data)
            Axios.post('http://localhost:3000/trekking',
                {
                    name: this.state.name,
                    image: response.data.filename,
                    location:this.state.location,
                    description: this.state.description,

                })
                .then((response) => {
                    console.log(response.data)
                    this.setState({
                        name: '',
                        image: '',
                        location:'',
                        description: '',
                        
                    });


                }).catch((err) => console.log(err.response))


        }).catch((err) => console.log(err));
    alert('Successfully Added Trekking Route Information');
    window.location.reload(false);


}



  render() {  
return (  
<div className='popup'>  
<div className='popup\_inner'>
  
<div className='form-main'>
      <div className='myForm'>
        <div className="form-row">

        <div className="form-group col-md-6 ">    
        <h1 style={{textAlign:'center'}}>Add Some Trekking Places</h1> 
        </div>


        <div className="form-group col-md-1" style={{marginLeft:'180px'}}>  
        <button style ={{marginRight:'100px'}} onClick={this.props.closePopup} >Close</button>
        </div>
        <div className="form-group col-md-6 ">
        <label for="inputEmail4">Place Name</label>
        <input type="text" className="form-control" name="name" id="name" placeholder="Enter Place Name......" 
        value={this.state.name} onChange={this.handleChange}
        />
    </div>
    <div class="form-label-group">
      <input type="file" id="inputEmail" class="form-control" placeholder="Price" required onChange={this.handleFileChange} />
      <label for="inputEmail">Image</label>
        </div>


    <div className="form-group col-md-12">
      <label for="inputEmail4">Place Location</label>
      <input type="text" className="form-control" name="location" id="location" placeholder="Enter Location......." 
      value={this.state.location} onChange={this.handleChange}
      />
    </div>
    <div className="form-group col-md-12">
      <label for="inputEmail4">Some Description about That Place</label><br />
     <textarea style={{width:"500px", height:"100px"}} name="description" 
     value={this.state.description} onChange={this.handleChange}
     ></textarea>
    </div>


    <button class="btn btn-primary"  type="submit"   onClick={this.handleSubmit} alert="success">Add</button>
    </div>
    </div>
    </div>
   



</div>  
</div>  
);  
}  
}  

export default TrekkingPopup;