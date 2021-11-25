import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Axios from 'axios'
export default class Register extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       firstname:'',
       lastname:'',
       username:'',
       password:'',
       address:'',
       dateofbirth:'',
       gender:''
    }
  }
  
  handleChange = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) =>{
    event.preventDefault();
    Axios.post('http://localhost:3000/user/register',this.state)
    .then((response) =>{
      console.log(response)
    }).catch((err)=>{ console.log(err)})
    alert('Signup Success');
    window.location.reload(false)
  }


  render() {

    return (
      <div className="signupbg">
        <div className="signupmain">
      <div className='form-main'>
      <div className='myForm'>
        <div className="form-row">
    
        <div className="form-group col-md-6">
      <label for="inputEmail4">First Name</label>
      <input type="text" className="form-control" name="firstname" id="firstName" placeholder="First Name" 
      value={this.state.firstname} onChange={this.handleChange}
      />
    </div>

    <div className="form-group col-md-6">
      <label for="inputEmail4">Last Name</label>
      <input type="text" className="form-control" name="lastname" id="lastName" placeholder="Last Name" 
      value={this.state.lastname} onChange={this.handleChange}
      />
    </div>

    <div className="form-group col-md-6">
      <label for="inputEmail4">Username</label>
      <input type="email" className="form-control" name="username" id="username" placeholder="Email"
      value={this.state.username} onChange={this.handleChange}
       />
    </div>
    <div className="form-group col-md-6">
      <label for="inputPassword4">Password</label>
      <input type="password" className="form-control" name="password" id="password" placeholder="Password" 
      value={this.state.password} onChange={this.handleChange}
      />
    </div>
  </div>
  <div className="form-group">
    <label for="inputAddress">Address</label>
    <input type="text" name ="address" className="form-control" id="inputAddress" placeholder="Dillibazar, Kathmandu"
    value={this.state.address} onChange={this.handleChange}
     />
  </div>


    <div className="form-group col-md-6">
      <label for="inputState">Choose gender</label>
      <select id="inputState" className="form-control" name="gender" value={this.state.gender} onChange={this.handleChange}>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
    </div>
    <div className="form-group col-md-12">
      <label for="inputZip">Date Of Birth</label>
      <input type="Date" name="dateofbirth" className="form-control" id="inputZip" value={this.state.dateofbirth} onChange={this.handleChange}/>
    </div>
  </div>
  <div className="form-group">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="gridCheck" />
      <label className="form-check-label" for="gridCheck">
       Accept the Terms and Conditions
      </label>
    </div>
  </div>
  <button class="btn btn-primary" type="submit" onClick={this.handleSubmit} alert="success">Sign Up</button>
  <br/>
  Already Have Acoount <Link to='/'>Click here !</Link><br/>
        </div>
        </div>
        </div>
    )
  }
}
