import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import './mem.css';
import PropTypes from 'prop-types'; 
import stitchClient from './stitch';

const {
  RemoteMongoClient,
  AnonymousCredential
} = require('mongodb-stitch-browser-sdk');
  

class AdminEdit extends Component {
state = {
  items: {}
}

componentDidMount() {
  stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(() => {
    const mongodb = stitchClient.getServiceClient(
      RemoteMongoClient.factory,
      'mongodb-atlas'
    );
    const items = mongodb.db('memorabilia').collection('items');
    return items.find({}).asArray();
  })
    .then(items => this.setState({ items: items }));
}
render() {
  const { items } = this.state;
  const itemsArr = Object.keys(items).map(i => items[i]);
  return (
    <div style={{backgroundColor: '#fff'}}>
      <div className="row">
        <div className="col-md-12">
          <div className="grid-container">
            {itemsArr.map(item =>
              <div className="grid-item"
                grn={item.grn}
                key={item._id} 
                data-key={item._id}
                data-valuename={item.itemName} 
                onClick={this.props.openModal(item)}>
                <h4 className="listing-title">{item.itemName}</h4> 
                <p className="listing-description">{item.description}</p>
                <img className="featured-image" src={item.mainImage || item.imageURL[0] || ''} 
                  alt={item.itemName} height="100px" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
}

AdminEdit.propTypes = {
  items: PropTypes.object,
  _id: PropTypes.string,
  itemName: PropTypes.string,
  imageURL: PropTypes.string,
  itemManufacturer: PropTypes.string,
  year: PropTypes.number,
  openModal: PropTypes.func
};

export default AdminEdit;