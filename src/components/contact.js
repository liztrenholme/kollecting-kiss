import React, { Component } from 'react';
import './mem.css';

class Contact extends Component {
  render() {
    return (
      <div className="Contact">
            <div className="row">
              <div className="col-md-2">
              </div>
              <div className="col-md-8 contactform">
              <h3 className="title">Ask a question</h3>
                <p className="hear">Send us a general question or comment here.</p>
                <form action="https://formspree.io/liztrenholme@gmail.com" method="POST">
                  <input className="text-input" placeholder="First Name" required type="text" name="first_name" />
                  <input className="text-input" placeholder="Last Name" type="text" name="last_name" />
                  <input className="text-input" placeholder="Your Email Address" required type="email" name="_replyto" />
                  <textarea className="text-input" required rows="10" cols="38" name="message" placeholder="Message..." width="50%" height="50%"></textarea>
                  <input type="submit" className='btn btn-outline-secondary' value="Send" />
                </form>
              </div>
              <div className="col-md-2">
              </div>
            </div>
          </div>
    );
  }
}

export default Contact;