import React, { Component } from 'react';
import './mem.css';
import stitchClient from './stitch';
import request from 'superagent';
import AdminEdit from './adminEdit';
import AdminForm from './adminForm';

// TO DO: change category select to be checkboxes, push into array of categories to send to db
// fix bugs related to img urls on edit
// DELETE functionality

const {
  RemoteMongoClient,
  AnonymousCredential
} = require('mongodb-stitch-browser-sdk');
let imgArr = [];

class Admin extends Component {
  state = {
    grn: '',
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
    editModalOpen: false,
    query: {}
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
          mainImage: this.state.mainImage,
          grn: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
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

  handleUpdateItem = (event) => {
    event.preventDefault();
    const {query} = this.state;
    const update = {
      '$set': {
        'itemName': this.state.itemName,
        'itemManufacturer': this.state.itemManufacturer,
        'year': this.state.year,
        'description': this.state.description,
        'itemValue': this.state.itemValue,
        'category': this.state.category,
        'imageURL': this.state.imageURL,
        'mainImage': this.state.mainImage
      }
    };
    const options = { upsert: true };
    const mongodb = stitchClient.getServiceClient(
      RemoteMongoClient.factory,
      'mongodb-atlas'
    );
    const items = mongodb.db('memorabilia').collection('items');
    // eslint-disable-next-line no-unused-vars
    stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(user => {
      try {
        console.log('????', query, update, options);
        items.updateOne(query, update, options);
        this.setState({
          itemName: '',
          itemManufacturer: '',
          year: '',
          description: '',
          itemValue: '',
          category: 'actionFigures',
          imageURL: '',
          successMessage: 'Data successfully updated!',
          errorMsg: ''
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        this.setState({
          errorMsg: 'Error updating data.'
        });
      }
    });
  }

  handleDeleteItem = () => {
  //   itemsCollection.deleteOne(query)
  // .then(result => console.log(`Deleted ${result.deletedCount} item.`))
  // .catch(err => console.error(`Delete failed with error: ${err}`))
    const grn = this.state.query.grn;
    const mongodb = stitchClient.getServiceClient(
      RemoteMongoClient.factory,
      'mongodb-atlas'
    );
    const items = mongodb.db('memorabilia').collection('items');
    // eslint-disable-next-line no-unused-vars
    stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(user => {
      try {
        items.deleteOne({'grn': grn});
        this.setState({
          grn: '',
          itemName: '',
          itemManufacturer: '',
          year: '',
          description: '',
          itemValue: '',
          category: 'actionFigures',
          imageURL: '',
          successMessage: 'Data successfully updated!',
          errorMsg: ''
        });
      } catch (err) {
      // eslint-disable-next-line no-console
        console.log(err);
        this.setState({
          errorMsg: 'Error updating data.'
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
  handleOpenModal = (item) => () => {
    console.log(item.imageURL);
    this.setState({
      grn: item.grn,
      editModalOpen: true,
      itemName: item.itemName,
      itemManufacturer: item.itemManufacturer,
      year: item.year,
      description: item.description,
      itemValue: item.itemValue,
      category: item.category,
      submit: '',
      uploadedFile: null,
      imageURL: item.imageURL,
      mainImage: item.mainImage,
      categories: [],
      query: {
        grn: item.grn,
        itemName: item.itemName,
        itemManufacturer: item.itemManufacturer,
        year: item.year,
        description: item.description,
        itemValue: item.itemValue,
        category: item.category,
        imageURL: item.imageURL,
        mainImage: item.mainImage,
        categories: [],
      }
    });
    imgArr = item.imageURL;
  }
  handleCloseModal = () => {
    this.setState({ 
      grn: '',
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
      editModalOpen: false,
      query: false
    });
    imgArr = [];
  }
  render() {
    console.log('state--------------', this.state);
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
              handleEdit={this.handleUpdateItem}
              deleteItem={this.handleDeleteItem}
              edit
            />
          </div>) : null}
        {this.state.editModalOpen ?
          <div className="modal-overlay" /> : null}
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
          grn={this.state.grn}
          edit={false}
        />
        <div className="row">
          <div className="col-md-12">
            <AdminEdit 
              openModal={this.handleOpenModal}  />
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
