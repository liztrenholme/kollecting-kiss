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
import { FacebookProvider, Like } from 'react-facebook';
import ReactPlayer from 'react-player';
 
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
          videoURL: items[0].videoURL,
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
handleNoTake = (e) => e.preventDefault()

render() {
  const {largeImage, largeViewOn, itemManufacturer, loading,
    itemName, description, year, imageURL, videoURL, errorMessage} = this.state;
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
                      <picture>
                        <source 
                          onMouseDown={this.handleNoTake}
                          onContextMenu={this.handleNoTake}
                          srcSet={largeImage} 
                          type="image/webp" />
                        <img 
                          onMouseDown={this.handleNoTake}
                          onContextMenu={this.handleNoTake}
                          src={largeImage && largeImage.endsWith('.webp') 
                            ? largeImage.replace('.webp', '.png') : largeImage} 
                          className="large-view-image"
                          alt={description}
                          onMouseOut={this.disableLargeView} />
                      </picture>
                    </div>) : null}
                  <div className="col-md-4">
                    <picture>
                      <source 
                        onMouseDown={this.handleNoTake}
                        onContextMenu={this.handleNoTake}
                        srcSet={largeImage} 
                        type="image/webp" />
                      <img
                        onMouseDown={this.handleNoTake}
                        onContextMenu={this.handleNoTake}
                        src={largeImage && largeImage.endsWith('.webp') 
                          ? largeImage.replace('.webp', '.png') : largeImage} 
                        alt={itemName} 
                        style={{maxWidth: '250px', cursor: 'pointer'}}
                        onMouseOver={this.enableLargeView} />
                    </picture>
                  </div>
                  <div className="col-md-8">
                    <p>{description}</p>
                    {videoURL ? <div className='player-wrapper'>
                      <ReactPlayer 
                        className='react-player'
                        url={videoURL}
                        light
                        width='100%'
                        height='100%'
                      />
                    </div> : null}
                    <p>{year}</p>
                    <p>{itemManufacturer}</p>
                    <FacebookProvider appId="894073691014883">
                      <Like href={`${process.env.PUBLIC_URL}${window.location.pathname}`} 
                        colorScheme="light" 
                        showFaces 
                        share />
                    </FacebookProvider>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8">
                    {imageURL ? imageURL.map(img => (
                      <picture key={img}>
                        <source 
                          onMouseDown={this.handleNoTake}
                          onContextMenu={this.handleNoTake}
                          srcSet={img} 
                          type="image/webp" />
                        <img
                          onMouseDown={this.handleNoTake}
                          onContextMenu={this.handleNoTake}
                          src={img && img.endsWith('.webp') 
                            ? img.replace('.webp', '.png') : img} 
                          alt={img}
                          className="item-view-thumbnail"
                          width="80px"
                          onClick={this.handleViewLarger(img)} />
                      </picture>
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