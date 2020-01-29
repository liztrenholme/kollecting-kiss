import React, { Component } from 'react';
import './mem.css';
import stitchClient from '../components/stitch';
import PropTypes from 'prop-types';
import {
  AnonymousCredential,
  RemoteMongoClient,
} from 'mongodb-stitch-browser-sdk';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
 
class ItemView extends Component {
state = {
  itemName: '',
  year: '',
  mainImage: '',
  itemManufacturer: '',
  description: '',
  imageURL: [],
  largeViewOn: false,
  errorMessage: '',
  loading: true
}
componentDidMount() {
  const grn = window.location.pathname.split('/')[2];
  stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(() => {
    const mongodb = stitchClient.getServiceClient(
      RemoteMongoClient.factory,
      'mongodb-atlas'
    );
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
          imageURL: items[0].imageURL,
          largeImage: items[0].mainImage || items[0].imageURL[0],
          loading: false
        });
      }
      if (items && !items.length) {
        this.setState({errorMessage: 'Not found.', loading: false});
      }
    }
    // eslint-disable-next-line no-console
    ).catch(err => console.log(err));
}

handleViewLarger = (image) => () => this.setState({ largeImage: image })

enableLargeView = () => this.setState({ largeViewOn: true })
disableLargeView = () => this.setState({ largeViewOn: false })

render() {
  const {largeImage, largeViewOn, itemManufacturer, loading,
    itemName, description, year, imageURL, errorMessage} = this.state;
  return (
    <div>
      {loading ?
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          // timeout={3000} //3 secs
        /> : (
          <div className="row">
            <div className="col-md-2">
            </div>
            {errorMessage
              ? (<div className="col-md-8 featured-items">
                <h3>{errorMessage}</h3>
              </div>) :
              (<div className="col-md-8 featured-items">
                <div className="row">
                  <div className="col-md-12">
                    <h3>{itemName}</h3>
                  </div>
                </div>
                <div className="row item-view-body">
                  {largeViewOn ?
                    (<div className="large-view-modal">
                      <img
                        className="large-view-image"
                        src={largeImage}
                        alt={description}
                        onMouseOut={this.disableLargeView} />
                    </div>) : null}
                  <div className="col-md-4">
                    <img 
                      src={largeImage} 
                      alt={itemName}
                      style={{maxWidth: '250px', cursor: 'pointer'}}
                      onMouseOver={this.enableLargeView}
                    />
                  </div>
                  <div className="col-md-8">
                    <p>{description}</p>
                    <p>{year}</p>
                    <p>{itemManufacturer}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8">
                    {imageURL ? imageURL.map(img => (
                      <img
                        className="item-view-thumbnail"
                        width="80px"
                        src={img} 
                        alt={img} 
                        key={img} 
                        onClick={this.handleViewLarger(img)} />
                    )) : null}
                  </div>
                </div>
              </div>)}
            <div className="col-md-2">
            </div>
          </div>)}
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