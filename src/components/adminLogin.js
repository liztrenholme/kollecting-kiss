import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class adminLogin extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      message: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    axios.post('api/login', { username, password })
      .then((result) => {
        localStorage.setItem('jwtToken', result.data.token);
        this.setState({ message: '' });
        this.props.history.push('/')
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.setState({ message: 'Login failed. Username or password not match' });
        }
      });
  }

  render() {
    const { username, password, message } = this.state;
    return (
      <div className="container">
        <form className="authform" onSubmit={this.onSubmit}>
          {message !== '' &&
            <div className="alert alert-warning alert-dismissible" role="alert">
              { message }
            </div>
          }
          <h2 className="form-signin-heading">Please sign in</h2>
          <label htmlFor="inputName" className="sr-only">Email address</label>
          <input type="text" className="form-control" placeholder="Username" name="username" value={username} onChange={this.onChange} required/>
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required/>
          <button className="btn btn-outline-secondary" type="submit">Login</button>
          <p>
            Not a member? <Link to="/register"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Register here</Link>
          </p>
        </form>
        {/* <form action="/login" method="post" className="form-inline authform">
          <div className="form-group">
            <input className="form-control"
            type="email" name="email" placeholder="email" />
            <input className="form-control"
            type="password" name="password" placeholder="password" />
          </div>
          <input className="btn btn-outline-secondary btn-default" type="submit" />
        </form> */}
      </div>
    );
  }
}

export default adminLogin;
