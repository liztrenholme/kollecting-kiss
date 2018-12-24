import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Admin from './admin';
import Form from './loginForm';

const { Stitch } = require('mongodb-stitch-browser-sdk');

const client = Stitch.defaultAppClient;

class adminLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: '',
      authed: false,
      whichView: this.showWhichView(this.authed)
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showWhichView = this.showWhichView.bind(this);
  }


  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      message: ''
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    client.callFunction("login", [this.state.username, this.state.password]).then(result => {
      console.log(result);
      if (result === true) {
        this.setState({
          authed: true
        })
        // return <Admin />
      }
      else if (result === false || result === null || result === undefined) {
        this.setState({
          username: '',
          password: '',
          message: "Incorrect Username and/or Password",
          authed: false
        })
      }
    })
  }

    showWhichView(authed) {
      if (authed === false) {
        return <Form />
      }
      else if (authed === true) {
        return <Admin />
      }
    }
  

  render() {
    return (
      <div>
        {this.state.whichView}
        {console.log(this.state.authed)}
        <Form />
      </div>
    );
  }
}

export default adminLogin;
