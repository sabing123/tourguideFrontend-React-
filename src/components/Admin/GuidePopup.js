import React from 'react';  
import './style.css';  
import Axios from 'axios';

class Placepopup extends React.Component { 
  
    constructor(props) {
        super(props)
    
        this.state = {
          Guide:[],
        name:'',
        address:'',
        contact:'',
        description:'',
        language:'',
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
            Axios.post('http://localhost:3000/touristguide',
                {
                    name: this.state.name,
                    address:this.state.address,
                    contact:this.state.contact,
                    description: this.state.description,
                    language:this.state.language,
                    image: response.data.filename
                })
                .then((response) => {
                    console.log(response.data)
                    this.setState({
                      name:'',
                      address:'',
                      contact:'',
                      description:'',
                      language:'',
                      image:'',
                        
                    });


                }).catch((err) => console.log(err.response))


        }).catch((err) => console.log(err));
    alert('Successfully Guide Information Added');
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
        <h1 style={{textAlign:'center'}}>Add Touristguide Details</h1> 
        </div>


        <div className="form-group col-md-1" style={{marginLeft:'180px'}}>  
        <button style ={{marginRight:'100px'}} onClick={this.props.closePopup} >Close</button>
        </div>
        <div className="form-group col-md-6 ">
        <label for="inputEmail4"> Name</label>
        <input type="text" className="form-control" name="name" id="name" placeholder="Enter Place Name......" required
        value={this.state.name} onChange={this.handleChange}
        />
    </div>
    <div class="form-label-group">
      <input type="file" id="inputEmail" class="form-control" placeholder="Price" required onChange={this.handleFileChange} />
      <label for="inputEmail">Image</label>
        </div>
    <div className="form-group col-md-12">
      <label for="inputEmail4">Location</label>
      <input type="text" className="form-control" name="address" id="address" placeholder="Enter Address......." 
      value={this.state.address} onChange={this.handleChange}
      />
    </div>
    
    <div className="form-group col-md-12">
      <label for="inputEmail4">Contact Number</label>
      <input type="number" className="form-control" name="contact" id="contact" placeholder="Enter Phone NUmber......." min="0" style={{width:"40%"}}
      value={this.state.contact} onChange={this.handleChange}
      />
    </div>
    <div className="form-group col-md-12">
      <label for="inputEmail4">Language</label>
      <input type="text" className="form-control" name="language" id="language" placeholder="Enter Known Language......." 
      value={this.state.language} onChange={this.handleChange}
      />
    </div>
    <div className="form-group col-md-12">
      <label for="inputEmail4">Description</label><br />
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

export default Placepopup;