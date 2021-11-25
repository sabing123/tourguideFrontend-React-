import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Navigation from './navigationBar';
import Axios from 'axios'

export default class Profileupdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: null,
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            selectedFile: null,
            user:{}
        }
    }
    componentDidMount() {
        Axios.get('http://localhost:3000/user/me', this.state.config)
            .then((response) => {
                this.setState({
                    user: response.data
                })
            });
    }

    updateUser = (e) => {
        e.preventDefault();
        Axios.put('http://localhost:3000/user/me', this.state.user, this.state.config)
            .then((response) => console.log(response.data)).catch((err) => console.log(err.response))
        this.props.history.push('/Dashboard');
    }

    handleChange(e) {
        this.setState({
            user: { ...this.state.user, [e.target.name]: e.target.value }
        })
    }
    render() {
        return (<div>
 <Navigation />
      <div className='form-main'>
      
      <div className='myForm'>
        <div className="form-row">
    
        <div className="form-group col-md-6">
      <label for="inputEmail4">First Name</label>
      <input type="text" className="form-control" name="firstname" id="firstName" placeholder="First Name" 
      value={this.state.user.firstname}  onChange={(e) => this.handleChange(e)}
      />
    </div>

    <div className="form-group col-md-6">
      <label for="inputEmail4">Last Name</label>
      <input type="text" className="form-control" name="lastname" id="lastName" placeholder="Last Name" 
      value={this.state.user.lastname}  onChange={(e) => this.handleChange(e)}
      />
    </div>

    <div className="form-group col-md-6">
      <label for="inputEmail4">Username</label>
      <input type="email" className="form-control" name="username" id="username" placeholder="Email"
      value={this.state.user.username}  onChange={(e) => this.handleChange(e)}
       />
    </div>
  </div>
  <div className="form-group">
    <label for="inputAddress">Address</label>
    <input type="text" name ="address" className="form-control" id="inputAddress" placeholder="Dillibazar, Kathmandu"
    value={this.state.user.address}  onChange={(e) => this.handleChange(e)}
     />
  </div>


    <div className="form-group col-md-6">
      <label for="inputState">Choose gender</label>
      <select id="inputState" className="form-control" name="gender" value={this.state.user.gender}  onChange={(e) => this.handleChange(e)}>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
    </div>
    <div className="form-group col-md-12">
      <label for="inputZip">Date Of Birth</label>
      <input type="Date" name="dateofbirth" className="form-control" id="inputZip" value={this.state.user.dateofbirth}  onChange={(e) => this.handleChange(e)}/>
    </div>
  </div>
  <button class="btn btn-primary" type="submit" onClick={this.updateUser} alert="success">Update</button>
  <br/>
        </div>

        </div>
         
        )
    }
}
