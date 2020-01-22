import React, { Component } from 'react';
import Admin from './admin';
import './mem.css';

const { Stitch } = require('mongodb-stitch-browser-sdk');

const client = Stitch.defaultAppClient;

class adminLogin extends Component {
state = {
  username: '',
  password: '',
  message: '',
  authed: true
}


handleChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value,
    message: ''
  });
}

handleSubmit = (event) => {
  event.preventDefault();
  // authenticating through stitch to keep password secure
  client.callFunction('login', [this.state.username, this.state.password]).then(result => {
    if (result === true) {
      this.setState({
        authed: true
      });
    }
    else if (result === false) {
      this.setState({
        username: '',
        password: '',
        message: 'Incorrect Username and/or Password',
        authed: false
      });
    }
  });
}
render() {
  const form = (<div className="Login">
    <div className="row">
      <div className="col-md-3">
      </div>
      <div className="col-md-6 authform">
        <div className="row">
          <div className="col-md-12">
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
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p className="error-msg" style={{ color: 'red' }}>{this.state.message}</p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
      </div>
    </div>
  </div>);
  return (
    <div>
      {this.state.authed ? <Admin /> : form}
    </div>
  );
}
}

export default adminLogin;
