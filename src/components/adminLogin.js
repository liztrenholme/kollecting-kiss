import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential
} = require('mongodb-stitch-browser-sdk');

const client = Stitch.defaultAppClient;

class adminLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: ''
    };
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    client.callFunction("login", [this.state.username, this.state.password]).then(result => {
      console.log(result) // Output: 7
  });
  }
  showMe = (items) => {
    console.log(items);
  }

  render() {
    return (
      <div className="container">
        <form className="authform" onSubmit={this.handleSubmit}>
          <h2 className="form-signin-heading">Please sign in</h2>
          <label htmlFor="inputName" >Email address</label>
          <input type="text" className="form-control" placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange} required />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} required />
          <button className="btn btn-outline-secondary" type="submit">Login</button>
          <p>
            Not a member? <Link to="/admin"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Register here</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default adminLogin;
