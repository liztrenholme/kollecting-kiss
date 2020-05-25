import React, { Component } from 'react';
import './mem.css';
import stitchClient from './stitch';
import request from 'superagent';
import AdminEdit from './adminEdit';
import AdminForm from './adminForm';
import PropTypes from 'prop-types';

// TO DO: 
// try/catch conversions
// sorted by category display for admin

import {
  AnonymousCredential,
  RemoteMongoClient,
} from 'mongodb-stitch-browser-sdk';

class Admin extends Component {
  state = {
    grn: '',
    itemName: '',
    itemManufacturer: '',
    year: '',
    description: '',
    itemValue: '',
    submit: '',
    uploadedFile: null,
    imageURL: [],
    mainImage: '',
    categories: [],
    editModalOpen: false,
    query: {},
    items: [],
    imgArr: [],
    searchInput: ''
  }
  
  componentDidMount() {
    this.getItemsToEdit();
  }

  getItemsToEdit = (search) => {
    if (search) {
      if (search !== '') {
        stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(() => {
          const mongodb = stitchClient.getServiceClient(
            RemoteMongoClient.factory,
            'mongodb-atlas'
          );
          const items = mongodb.db('memorabilia').collection('items');
          return items.find({
            '$or': [
              { 'categories': {$regex: `.+${search}`, $options:'i'} },
              { 'year': search },
              { 'itemName': {$regex: `.+${search}`, $options:'i'} },
              { 'itemManufacturer': {$regex: `.+${search}`, $options:'i'} },
              { 'description': {$regex: `.+${search}`, $options:'i'} }
            ]
          }).asArray();
  
        })
          .then(items => this.setState({items}))
          .catch(e => this.setState({loading: false, error: e}));
      } else {
        this.setState({searchResults: []});
      }
    }
    else {
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
  }


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      submit: ''
    });
    if (event.target.name === 'searchInput') {
      this.getItemsToEdit(event.target.value);
    }
  }

  handleCheck = (event) => {
    let {categories} = this.state;
    if (categories.includes(event.target.value)) {
      categories = categories.filter(i => i !== event.target.value);
      this.setState({categories});
    } else if (!categories.includes(event.target.value)) {
      categories.push(event.target.value);
      this.setState({categories});
    }
  }

  // TO DO: make all async/await and clean this up
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
          categories: this.state.categories,
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
          categories: [],
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
      this.getItemsToEdit();
    });
  }

  // TO DO: make all async/await and clean this up
  handleUpdateItem = (event) => {
    event.preventDefault();
    // const {query} = this.state;
    const query = {'grn': this.state.grn};
    const update = {
      '$set': {
        'itemName': this.state.itemName,
        'itemManufacturer': this.state.itemManufacturer,
        'year': this.state.year,
        'description': this.state.description,
        'itemValue': this.state.itemValue,
        'categories': this.state.categories,
        'imageURL': this.state.imgArr,
        'mainImage': this.state.mainImage
      }
    };
    const options = { upsert: false };
    const mongodb = stitchClient.getServiceClient(
      RemoteMongoClient.factory,
      'mongodb-atlas'
    );
    const items = mongodb.db('memorabilia').collection('items');
    // eslint-disable-next-line no-unused-vars
    stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(user => {
      try {
        items.findOneAndUpdate(query, update, options);
        this.setState({
          itemName: '',
          itemManufacturer: '',
          year: '',
          description: '',
          itemValue: '',
          categories: [],
          imageURL: [],
          successMessage: 'Data successfully updated!',
          errorMsg: '',
          editModalOpen: false
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        this.setState({
          errorMsg: 'Error updating data.'
        });
      }
    });
    // works intermittently bc of async nature of JS- needs better handles
    this.getItemsToEdit();
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
          categories: [],
          imageURL: '',
          successMessage: 'Data successfully updated!',
          errorMsg: '',
          editModalOpen: false
        });
      } catch (err) {
      // eslint-disable-next-line no-console
        console.log(err);
        this.setState({
          errorMsg: 'Error updating data.'
        });
      }
    });
    this.getItemsToEdit();
  }

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
        const {imgArr} = this.state;
        imgArr.push(response.body.secure_url);
        this.setState({
          imageURL: imgArr, mainImage: imgArr[0]
        });
      }
    });
  }
  setMainImage = (url) => () => { this.setState({mainImage: url}); }
  handleOpenModal = (item) => () => {
    this.setState({
      grn: item.grn,
      editModalOpen: true,
      itemName: item.itemName,
      itemManufacturer: item.itemManufacturer,
      year: item.year,
      description: item.description,
      itemValue: item.itemValue,
      submit: '',
      uploadedFile: null,
      imageURL: item.imageURL,
      mainImage: item.mainImage,
      categories: item.categories,
      imgArr: item.imageURL,
      query: {
        grn: item.grn,
        itemName: item.itemName,
        itemManufacturer: item.itemManufacturer,
        year: item.year,
        description: item.description,
        itemValue: item.itemValue,
        imageURL: item.imageURL,
        mainImage: item.mainImage,
        categories: [],
      }
    });
  }
  handleCloseModal = () => {
    this.setState({ 
      grn: '',
      itemName: '',
      itemManufacturer: '',
      year: '',
      description: '',
      itemValue: '',
      submit: '',
      uploadedFile: null,
      imageURL: [],
      mainImage: '',
      categories: [],
      editModalOpen: false,
      query: false,
      imgArr: []
    });
  }
  handleDeleteImage = (url) => () => {
    let {imgArr} = this.state;
    imgArr = imgArr.filter(i => i !== url);
    this.setState({imgArr});
  }
  render() {
    const {imgArr, errorMsg, successMessage, categories, itemName, itemManufacturer,
      year, description, itemValue, submit, uploadedFile, imageURL, mainImage,
      grn, editModalOpen, items, searchInput} = this.state;
    const allCategories = this.props.categories;
    return (
      <div className="Admin">
        {this.state.editModalOpen ? 
          (<div className="editModal">
            <div onClick={this.handleCloseModal} 
              style={{
                fontWeight: 'bolder',
                textAlign: 'right',
                marginRight: '2em',
                marginTop: '1em',
                cursor: 'pointer'}}>
              <h1>x</h1>
            </div>
            <AdminForm
              imgArr={imgArr}
              errorMsg={errorMsg}
              successMessage={successMessage}
              categories={categories}
              handleChange={this.handleChange}
              handleImageUpload={this.handleImageUpload}
              itemName={itemName}
              itemManufacturer={itemManufacturer}
              year={year}
              description={description}
              itemValue={itemValue}
              submit={submit}
              uploadedFile={uploadedFile}
              imageURL={imageURL}
              mainImage={mainImage}
              onImageDrop={this.onImageDrop}
              setMainImage={this.setMainImage}
              handleEdit={this.handleUpdateItem}
              deleteItem={this.handleDeleteItem}
              handleCheck={this.handleCheck}
              handleDeleteImage={this.handleDeleteImage}
              edit
              allCategories={allCategories}
            />
          </div>) : null}
        {editModalOpen ?
          <div className="modal-overlay" /> : null}
        <AdminForm
          imgArr={imgArr}
          errorMsg={errorMsg}
          successMessage={successMessage}
          categories={categories}
          handleChange={this.handleChange}
          handleImageUpload={this.handleImageUpload}
          handleSubmit={this.handleSubmit}
          itemName={itemName}
          itemManufacturer={itemManufacturer}
          year={year}
          description={description}
          itemValue={itemValue}
          submit={submit}
          uploadedFile={uploadedFile}
          imageURL={imageURL}
          mainImage={mainImage}
          onImageDrop={this.onImageDrop}
          setMainImage={this.setMainImage}
          grn={grn}
          handleCheck={this.handleCheck}
          handleDeleteImage={this.handleDeleteImage}
          edit={false}
          allCategories={allCategories}
        />
        <div className="row" style={{marginTop: '1em'}}>
          <div className="col-md-12">
            <h3>Edit Items</h3>
            <input 
              style={{margin: '0.5em'}}
              className="form-control mr-sm-2"
              placeholder="Search item to edit..." 
              type="text"
              value={searchInput}
              name="searchInput"
              onChange={this.handleChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <AdminEdit 
              openModal={this.handleOpenModal}
              items={items}  />
          </div>
        </div>
      </div>
    );
  }
}

Admin.propTypes = {
  categories: PropTypes.array
};

export default Admin;
