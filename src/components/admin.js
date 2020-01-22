import React, { Component } from 'react';
import './mem.css';
import stitchClient from './stitch';
import request from 'superagent';
import AdminEdit from './adminEdit';
import AdminForm from './adminForm';

// TO DO: change category select to be checkboxes, push into array of categories to send to db

const {
  RemoteMongoClient,
  AnonymousCredential
} = require('mongodb-stitch-browser-sdk');
let imgArr = [];

class Admin extends Component {
  state = {
    itemName: '',
    itemManufacturer: '',
    year: '',
    description: '',
    itemValue: '',
    category: 'actionFigures',
    submit: '',
    uploadedFile: null,
    imageURL: '',
    mainImage: '',
    categories: [],
    editModalOpen: false
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      submit: ''
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const mongodb = stitchClient.getServiceClient(
      RemoteMongoClient.factory,
      'mongodb-atlas'
    );
    const items = mongodb.db('memorabilia').collection('items');
    // here we are inserting data into the database through the form
    // eslint-disable-next-line no-unused-vars
    stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(user => {
      try {
        items.insertOne({
          itemName: this.state.itemName,
          itemManufacturer: this.state.itemManufacturer,
          year: this.state.year,
          description: this.state.description,
          itemValue: this.state.itemValue,
          category: this.state.category,
          imageURL: this.state.imageURL,
          mainImage: this.state.mainImage
        });
        this.setState({
          itemName: '',
          itemManufacturer: '',
          year: '',
          description: '',
          itemValue: '',
          category: 'actionFigures',
          imageURL: '',
          successMessage: 'Data successfully inserted!',
          errorMsg: ''
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        this.setState({
          errorMsg: 'Error inserting data.'
        });
      }
    });
  }
  // allows user to either click on or drag image to box for upload
  onImageDrop = (files) => {
    this.setState({
      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
  }
  // sends image to cloudinary, updates state, fetches imageURL to send to mongodb
  handleImageUpload = (file) => {
    let upload = request.post('https://api.cloudinary.com/v1_1/cheesecake/upload')
      .field('upload_preset', 'jvr3ebf0')
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        this.setState({
          errorMsg: 'Error: picture may be too large, or there was a problem on Cloudinary\'s end.'
        });
      }

      if (response.body.secure_url !== '') {
        imgArr.push(response.body.secure_url);
        this.setState({
          imageURL: imgArr, mainImage: imgArr[0]
        });
      }
    });
  }
  setMainImage = (url) => () => { this.setState({mainImage: url}); }
  handleOpenModal = () => this.setState({ editModalOpen: true })
  handleCloseModal = () => this.setState({ editModalOpen: false })
  render() {
    return (
      <div className="Admin">
        {this.state.editModalOpen ? 
          (<div className="editModal">
            <div onClick={this.handleCloseModal} 
              style={{fontWeight: 'bolder', textAlign: 'right', marginRight: '1em'}}>
              <h2>X</h2>
            </div>
            <AdminForm
              imgArr={imgArr}
              errorMsg={this.state.errorMsg}
              successMessage={this.state.successMessage}
              category={this.state.category}
              categories={this.state.categories}
              handleChange={this.handleChange}
              handleImageUpload={this.handleImageUpload}
              handleSubmit={this.handleSubmit}
              itemName={this.state.itemName}
              itemManufacturer={this.state.itemManufacturer}
              year={this.state.year}
              description={this.state.description}
              itemValue={this.state.itemValue}
              submit={this.state.submit}
              uploadedFile={this.state.uploadedFile}
              imageURL={this.state.imageURL}
              mainImage={this.state.mainImage}
              onImageDrop={this.onImageDrop}
              setMainImage={this.setMainImage}
            />
          </div>) : null}
        <AdminForm
          imgArr={imgArr}
          errorMsg={this.state.errorMsg}
          successMessage={this.state.successMessage}
          category={this.state.category}
          categories={this.state.categories}
          handleChange={this.handleChange}
          handleImageUpload={this.handleImageUpload}
          handleSubmit={this.handleSubmit}
          itemName={this.state.itemName}
          itemManufacturer={this.state.itemManufacturer}
          year={this.state.year}
          description={this.state.description}
          itemValue={this.state.itemValue}
          submit={this.state.submit}
          uploadedFile={this.state.uploadedFile}
          imageURL={this.state.imageURL}
          mainImage={this.state.mainImage}
          onImageDrop={this.onImageDrop}
          setMainImage={this.setMainImage}
        />
        <div className="row">
          <div className="col-md-12">
            <AdminEdit openModal={this.handleOpenModal} />
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
