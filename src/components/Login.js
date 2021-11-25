import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import LoginbackgroundImage from '../components/images/loginbackground.jpg'

import {
    Container, Col, Form, FormGroup, Label, Input, Button, FormText
} from 'reactstrap'

import axios from 'axios'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            isLoggedIn: false,
            error: ''
        };
        this.dismissError = this.dismissError.bind(this);
    }
    
    dismissError() {
        this.setState({ error: '' });
      }
    handleChange = (e) => {
        this.setState(
            { [e.target.name]: e.target.value }
        )
    }
    submitForm = (e) => {
        e.preventDefault();
        if (!this.state.username) {
            return this.setState({ error: 'Username is required' });
          }
      
        else if (!this.state.password) {
            return this.setState({ error: 'Password is required' });
          }
      else{
        axios.post('http://localhost:3000/user/login', this.state)
            .then((response) => {
                console.log(response.data)
                localStorage.setItem('token', response.data.token)
                this.setState({ isLoggedIn: true })
            }).catch((err) => console.log(err.response))
        this.setState({ username: '', password: '' })
      }
      return this.setState({ error: '' });
    }
    render() {

        if (this.state.isLoggedIn === true) {
            return <Redirect to='/dashboard' />
        }
        return (
             <div className="bg">
        <div className="loginform-main">


            <Container  className="loginform-submain" >
                <h2>Sign In</h2>
                {
            this.state.error &&
            <h3 style= {{color:'red', textAlign:"center"}} data-test="error" onClick={this.dismissError}>
              {this.state.error}<button style= {{color:'red', background:'transparent'}}  onClick={this.dismissError}>✖</button>
            </h3>
            
          }
                <Form>
                    <Col>
                        <FormGroup>
                            <Label for='username'>Username</Label>
                            <Input type='text' name='username' id='username' value={this.state.username} onChange={this.handleChange} />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for='password'>Password</Label>
                            <Input type='password' name='password' id='password' value={this.state.password} onChange={this.handleChange} />
                        </FormGroup>
                    </Col>
                    <Button color="primary" onClick={this.submitForm} type="submit">Submit</Button>
                    <FormText>Not yet a user? <Link to='/register'> Sign Up here!</Link></FormText>
                </Form>
            </Container>
            </div>
            </div>
        )
    }
}

export default Login;