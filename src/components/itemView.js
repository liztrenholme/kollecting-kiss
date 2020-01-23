import React, { Component } from 'react';
import './mem.css';
import stitchClient from '../components/stitch';
import PropTypes from 'prop-types';

// const {
//   RemoteMongoClient,
//   AnonymousCredential,
//   BSON
// } = require('mongodb-stitch-browser-sdk');
import {
  AnonymousCredential,
  Stitch,
  RemoteMongoClient,
  BSON
} from 'mongodb-stitch-browser-sdk';

// import { BSON } from 'mongodb-stitch-browser-sdk';
 
class ItemView extends Component {
state = {
  itemName: '',
  year: '',
  mainImage: '',
  itemManufacturer: '',
  description: '',
  imgURL: []
}
componentDidMount() {
  const grn = window.location.pathname.split('/')[2];
  console.log(window.location.pathname.split('/')[2]);
  stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(() => {
    const mongodb = stitchClient.getServiceClient(
      RemoteMongoClient.factory,
      'mongodb-atlas'
    );
      // Get a hook to the items collection
    const items = mongodb.db('memorabilia').collection('items');
    return items.find({ 'grn': grn}).asArray();

  })
    .then(items => {
      if (items && items[0]) {
        this.setState({
          itemName: items[0].itemName,
          year: items[0].year,
          mainImage: items[0].mainImage,
          itemManufacturer: items[0].itemManufacturer,
          description: items[0].description,
          imgURL: items[0].imgURL
        });
      }
    }
    );
}

render() {
  return (
    <div>
      <div className="row">
        <div className="col-md-2">
        </div>
        <div className="col-md-8 featured-items">
          <div className="row">
            <div className="col-md-12">
              <h4>{this.state.itemName}</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <img src={this.state.mainImage} alt={this.state.itemName} />
              <p>{this.state.year}</p>
              <p>{this.state.itemManufacturer}</p>
            </div>
            <div className="col-md-8">
              <p>{this.state.description}</p>
            </div>
          </div>
        </div>
        <div className="col-md-2">
        </div>
      </div>
    </div>
  );
}
}

ItemView.propTypes = {
  description: PropTypes.string,
  _id: PropTypes.string,
  itemName: PropTypes.string,
  mainImage: PropTypes.string,
  itemManufacturer: PropTypes.string,
  year: PropTypes.number,
};

export default ItemView;