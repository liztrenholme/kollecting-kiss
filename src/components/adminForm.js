import React, { Component } from 'react';
import './mem.css';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

class AdminForm extends Component {
  state = {
    newCategory: '',
    prettyCategory: ''
  }
  handleUpdateNewCategory = (e) => {
    let categoryInput = e.currentTarget.value.replace(/[`~!@#$%^&*()_|+\-=÷¿?;:'",.<>{}[\]\\/]/gi, '');
    let category = categoryInput;
    if (categoryInput.includes(' ')) {
      category = categoryInput.replace(/\\s[`~!@#$%^&*()_|+\-=÷¿?;:'",.<>{}[\]\\/]/gi, '$1').trim().replace(category[0], category[0].toLowerCase());
      const temp = category.split(' ');
      const tempTwo = []; 
      temp.forEach(i => {
        if (i && i[0] && i[0] !== '') {
          tempTwo.push(i.replace(i[0], i[0].toUpperCase()));
        }});
      category = tempTwo.join('');
      category = category.replace(category[0], category[0].toLowerCase());
    }
    this.setState({newCategory: category, prettyCategory: e.currentTarget.value});
  }
  render() {
    const imgArr = this.props.imgArr || this.props.imgURL;
    const {newCategory, prettyCategory} = this.state;
    return (
      <div className="Admin">
        <div className="row">
          <div className="col-md-1">
          </div>
          <div className="col-md-10 adminform">
            <h3 className="title">{this.props.edit ? 'Edit Item' : 'Enter New Item'}</h3>
            <div className="row">
              <div className="col-md-12">
                <h1 style={{ color: 'red' }}>{this.props.errorMsg}</h1>
                <h1 style={{ color: 'green' }}>{this.props.successMessage}</h1>
              </div>
            </div>
            <div >
              <Dropzone onDrop={this.props.onImageDrop}
                multiple={false}
                accept="image/*">
                {({ getRootProps, getInputProps, isDragActive }) => {
                  return (<div
                    {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                      isDragActive ?
                        <p className="photo-upload">Drop image here...</p> :
                        <p className="photo-upload">Try dropping an image here, or click to select image to upload.</p>
                    }
                  </div>);
                }}
              </Dropzone>
              <div className="edit-image-container">
                {this.props.imageURL === '' ? null :
                  imgArr.map(image => (
                    <div key={image} className="uploaded-display">
                      <span 
                        onClick={this.props.handleDeleteImage(image)} 
                        style={{
                          fontWeight: 'bold',
                          color: 'red',
                          verticalAlign: 'top'}}>X</span>
                      <img 
                        className={'uploaded', this.props.mainImage === image ? 'mainImageAdmin' : ''}
                        onClick={this.props.setMainImage(image)} 
                        src={image} 
                        key={image} 
                        alt="Successfully uploaded" 
                        height="100px"
                      />
                    </div>
                  ))
                }
              </div>
            </div>
            <form onSubmit={this.props.edit ? this.props.handleEdit : this.props.handleSubmit}>
              <input 
                className="text-input" 
                placeholder=" Item Name" 
                required type="text"
                name="itemName" 
                value={this.props.itemName} 
                onChange={this.props.handleChange} />
              <input 
                className="text-input" 
                placeholder=" Manufacturer" 
                type="text"
                name="itemManufacturer" 
                value={this.props.itemManufacturer} 
                onChange={this.props.handleChange} />
              <input 
                className="text-input" 
                placeholder=" Year" 
                type="text" 
                name="year" 
                value={this.props.year} 
                onChange={this.props.handleChange} />
              <textarea 
                className="text-input" 
                required 
                rows="10" 
                cols="25"
                name="description" 
                value={this.props.description} 
                onChange={this.props.handleChange} 
                placeholder=" Description" 
                width="50%" 
                height="50%" />
              <input 
                className="text-input" 
                placeholder=" Video URL" 
                type="text"
                name="videoURL" 
                value={this.props.videoURL} 
                onChange={this.props.handleChange} />
              <input 
                className="text-input" 
                placeholder=" Estimated value" 
                type="text"
                name="itemValue" 
                value={this.props.itemValue} 
                onChange={this.props.handleChange} />
              <div className='checkbox-div'>
                {this.props.allCategories && this.props.allCategories.length ? 
                  this.props.allCategories.map(category => <div 
                    className="checkbox"
                    key={category}>
                    <input 
                      className="checked"
                      checked={this.props.categories.includes(category) ? true : false}
                      type="checkbox"
                      onChange={this.props.handleCheck} 
                      value={category}/>{category ? category.replace(/([A-Z]+)/g, ' $1').trim().replace(category[0], category[0].toUpperCase()) : null}</div>)
                  : null}
                <div className="checkbox">
                  <input
                    className="checked"
                    checked={this.props.categories.includes(newCategory) ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value={newCategory}/>
                  <input 
                    onChange={this.handleUpdateNewCategory} 
                    type="text"
                    placeholder="Add new category"
                    value={prettyCategory}/>
                  {/* <div className='addNewCatBtn'>+</div> */}
                </div>
              </div>
              <input 
                type="submit" 
                className='btn-dark' 
                value={this.props.edit ? 'Submit Changes' : 'Submit'}
                style={{margin: '1em', padding: '1em', cursor: 'pointer'}} />
            </form>
          </div>
          <div className="col-md-1">
          </div>
        </div>
        {this.props.edit ?
          (<div className="row">
            <div className="col-md-4">
            </div>
            <div className="col-md-2">
              <button 
                className='btn-secondary' 
                style={{margin: '1em', padding: '1em', cursor: 'pointer'}}
                onClick={this.props.handleCloseModal}>
                  Cancel
              </button>
            </div>
            <div className="col-md-2">
              <button 
                className='btn-danger' 
                style={{margin: '1em', padding: '1em', cursor: 'pointer'}}
                onClick={this.props.deleteItem}>
                  Delete Item
              </button>
            </div>
            <div className="col-md-4">
            </div>
          </div>) : null}
      </div>
    );
  }
}

AdminForm.propTypes = {
  items: PropTypes.object,
  _id: PropTypes.string,
  itemName: PropTypes.string,
  imageURL: PropTypes.string,
  itemManufacturer: PropTypes.string,
  year: PropTypes.number,
  deleteItem: PropTypes.func,
  onImageDrop: PropTypes.func,
  categories: PropTypes.array,
  videoURL: PropTypes.string
};

export default AdminForm;
