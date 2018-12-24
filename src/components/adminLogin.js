import React, { Component } from 'react';
import Admin from './admin';
// import Form from './loginForm';

const { Stitch } = require('mongodb-stitch-browser-sdk');

const client = Stitch.defaultAppClient;

class adminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: '',
      authed: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }


  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      message: ''
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    client.callFunction("login", [this.state.username, this.state.password]).then(result => {
      console.log("handleSubmit here: " + result);
      if (result === true) {
        this.setState({
          authed: true
        })
      }
      else if (result === false) {
        this.setState({
          username: '',
          password: '',
          message: "Incorrect Username and/or Password",
          authed: false
        })
      }
    })
  }
  render() {
    const form = <div className="Login">
      <div className="row">
        <div className="col-md-1">
        </div>
        <div className="col-md-10 authform">
          <form onSubmit={this.handleSubmit}>
            <h2>Please sign in</h2>
            <input type="text" className="text-input"
              placeholder="Username" name="username"
              value={this.state.value} onChange={this.handleChange} required />
            <input type="password" className="text-input"
              placeholder="Password" name="password" value={this.state.value}
              onChange={this.handleChange} required />
            <input type="submit" className='btn btn-outline-secondary' value="Log In" />
          </form>
          <p className="error-msg" style={{ color: 'red' }}>{this.state.message}</p>
          <div className="col-md-1">
          </div>
        </div>
      </div>
    </div>;
    return (
      <div>
        {this.state.authed ? <Admin /> : form}
      </div>
    );
  }
}

export default adminLogin;
