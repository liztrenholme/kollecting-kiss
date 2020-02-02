import React, { Component } from 'react';
import './mem.css';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

class AdminForm extends Component {
  render() {
    const imgArr = this.props.imgArr || this.props.imgURL;
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
                <h1 style={{ color: 'green' }}>{this.props.successMsg}</h1>
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
                placeholder=" Estimated value" 
                type="text"
                name="itemValue" 
                value={this.props.itemValue} 
                onChange={this.props.handleChange} />
              <div className='checkbox-div'>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('actionFigures') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="actionFigures"/>Action Figures / Dolls</div>
                <div className="checkbox">
                  <input
                    checked={this.props.categories.includes('advertisingAds') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="advertisingAds"/>Advertising Ads</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('artworkBusts') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="artworkBusts"/>Artwork / Busts</div>
                <div className="checkbox">
                  <input
                    checked={this.props.categories.includes('backstagePasses') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="backstagePasses"/>Backstage Passes</div>
                <div className="checkbox">
                  <input
                    checked={this.props.categories.includes('bags') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="bags"/>Bags / Backpacks / Wallets</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('beltBuckles') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="beltBuckles"/>Belt Buckles</div>
                <div className="checkbox">
                  <input
                    checked={this.props.categories.includes('blankets') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="blankets"/>Blankets / Rugs / Towels</div>
                <div className="checkbox">
                  <input
                    checked={this.props.categories.includes('bobbleheads') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="bobbleheads"/>Bobbleheads</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('books') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="books"/>Books</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('buttons') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="buttons"/>Buttons / Lapel Pins</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('calendars') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="calendars"/>Calendars</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('capsHatsBandannas') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="capsHatsBandannas"/>Caps / Hats / Bandannas</div>
                <div className="checkbox">
                  <input
                    checked={this.props.categories.includes('autoAccessories') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="autoAccessories"/>Car Automobile Accessories</div>
                <div className="checkbox">
                  <input
                    checked={this.props.categories.includes('cars') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="cars"/>Cars / Die Cast</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('clocks') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="clocks"/>Clocks / Watches</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('clothing') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="clothing"/>Clothing</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('coins') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="coins"/>Coins</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('comics') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="comics"/>Comics</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('electronics') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="electronics"/>Electronics / Gaming Gear</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('games') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="games"/>Games / Puzzles</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('glassware') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="glassware"/>Glassware</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('guitarDrum') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="guitarDrum"/>Guitar Picks & Drum Sticks</div>
                <div className="checkbox">
                  <input
                    checked={this.props.categories.includes('halloween') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="halloween"/>Halloween Products</div>
                <div className="checkbox">
                  <input
                    checked={this.props.categories.includes('health') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="health"/>Health & Beauty</div>
                <div className="checkbox">
                  <input
                    checked={this.props.categories.includes('holiday') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="holiday"/>Holiday / KISSmas</div>
                <div className="checkbox">
                  <input
                    checked={this.props.categories.includes('homeDecor') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="homeDecor"/>Home Decor</div>
                <div className="checkbox">
                  <input
                    checked={this.props.categories.includes('incenseCandles') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="incenseCandles"/>Incense / Candles</div>
                <div className="checkbox">
                  <input
                    checked={this.props.categories.includes('jewelry') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="jewelry"/>Jewelry</div>
                <div className="checkbox">
                  <input
                    checked={this.props.categories.includes('keychains') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="keychains"/>Keychains</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('lunchboxes') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="lunchBoxes"/>Lunch Boxes</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('magazines') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="magazines"/>Magazines</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('magnets') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="magnets"/>Magnet / Magnet Sets</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('misc') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="misc"/>Miscellaneous</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('ornaments') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="ornaments"/>Ornaments</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('petSupplies') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="petSupplies"/>Pet Supplies & Accessories</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('phoneAccessories') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="phoneAccessories"/>Phone Accessories</div>
                <div className="checkbox">
                  <input
                    checked={this.props.categories.includes('plush') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="plush"/>Plush</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('posters') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="posters"/>Posters</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('stationary') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="stationary"/>Stationary Products</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('stickersPatches') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="stickersPatches"/>Stickers / Patches</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('tickets') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="tickets"/>Tickets / Stubs</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('tourBooks') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="tourBooks"/>Tour Books</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('toys') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="toys"/>Toys</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('tradingPostCards') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="tradingPostCards"/>Trading Cards & Post Cards</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('wine') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="wine"/>Wine</div>
                <div className="checkbox">
                  <input 
                    checked={this.props.categories.includes('lighters') ? true : false}
                    type="checkbox"
                    onChange={this.props.handleCheck} 
                    value="lighters"/>Zippos / Lighters</div>
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
            <div className="col-md-4">
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
  categories: PropTypes.array
};

export default AdminForm;
