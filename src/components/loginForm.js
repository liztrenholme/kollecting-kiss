import React, { Component } from 'react';
import './mem.css';

class Form extends Component {
    // constructor(props) {
    //     super(props);

    // }
    render() {
        return (
            <div className="Login">
                <div className="row">
                    <div className="col-md-1">
                    </div>
                    <div className="col-md-10 authform">
                        <form onSubmit={this.props.onSubmitValue}>
                            <h2>Please sign in</h2>
                            <input type="text" className="text-input" 
                                placeholder="Username" name="username" 
                                value={this.props.username} onChange={this.props.onChangeValue} required />
                            <input type="password" className="text-input" 
                                placeholder="Password" name="password" value={this.props.password} 
                                onChange={this.props.onChangeValue} required />
                            <input type="submit" className='btn btn-outline-secondary' value="Log In" />
                        </form>
                        <p className="error-msg" style={{ color: 'red' }}>{this.props.message}</p>
                        <div className="col-md-1">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form;