import React, { Component } from 'react';
import './mem.css';
import Dropzone from 'react-dropzone';

// TO DO: change category select to be checkboxes, push into array of categories to send to db
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
              <div>
                {this.props.imageURL === '' ? null :
                  imgArr.map(image => (
                    <img 
                      className={'uploaded', this.props.mainImage === image ? 'mainImageAdmin' : ''}
                      onClick={this.props.setMainImage(image)} 
                      src={image} 
                      key={image} 
                      alt="Successfully uploaded" 
                      height="100px"
                    />
                  ))
                }
              </div>
            </div>
            <form onSubmit={this.props.edit ? this.props.handleEdit : this.props.handleSubmit}>
              <input className="text-input" placeholder=" Item Name" required type="text"
                name="itemName" value={this.props.itemName} onChange={this.props.handleChange} />
              <input className="text-input" placeholder=" Manufacturer" type="text"
                name="itemManufacturer" value={this.props.itemManufacturer} onChange={this.props.handleChange} />
              <input className="text-input" placeholder=" Year" type="text" name="year" value={this.props.year} onChange={this.props.handleChange} />
              <textarea className="text-input" required rows="10" cols="25"
                name="description" value={this.props.description} onChange={this.props.handleChange} placeholder=" Description" width="50%" height="50%"></textarea>
              <input className="text-input" placeholder=" Estimated value" type="text"
                name="itemValue" value={this.props.itemValue} onChange={this.props.handleChange} />
              <select className="options" name="category" value={this.props.category} onChange={this.props.handleChange} >
                <option value="actionFigures">Action Figures / Dolls</option>
                <option value="advertisingAds">Advertising Ads</option>
                <option value="artworkBusts">Artwork / Busts</option>
                <option value="backstagePasses">Backstage Passes</option>
                <option value="bags">Bags / Backpacks / Wallets</option>
                <option value="beltBuckles">Belt Buckles</option>
                <option value="blankets">Blankets / Rugs / Towels</option>
                <option value="books">Books</option>
                <option value="buttons">Buttons / Lapel Pins</option>
                <option value="calendars">Calendars</option>
                <option value="autoAccessories">Car Automobile Accessories</option>
                <option value="cars">Cars / Die Cast</option>
                <option value="clocks">Clocks / Watches</option>
                <option value="clothing">Clothing</option>
                <option value="coins">Coins</option>
                <option value="comics">Comics</option>
                <option value="electronics">Electronics / Gaming Gear</option>
                <option value="games">Games / Puzzles</option>
                <option value="glassware">Glassware</option>
                <option value="guitarDrum">Guitar Picks & Drum Sticks</option>
                <option value="halloween">Halloween Products</option>
                <option value="health">Health & Beauty</option>
                <option value="homeDecor">Home Decor</option>
                <option value="incenseCandles">Incense / Candles</option>
                <option value="jewelry">Jewelry</option>
                <option value="keychains">Keychains</option>
                <option value="lunchBoxes">Lunch Boxes</option>
                <option value="magazines">Magazines</option>
                <option value="magnets">Magnet / Magnet Sets</option>
                <option value="misc">Miscellaneous</option>
                <option value="ornaments">Ornaments</option>
                <option value="petSupplies">Pet Supplies & Accessories</option>
                <option value="posters">Posters</option>
                <option value="stationary">Stationary Products</option>
                <option value="stickersPatches">Stickers / Patches</option>
                <option value="tickets">Tickets / Stubs</option>
                <option value="tourBooks">Tour Books</option>
                <option value="tradingPostCards">Trading Cards Phone & Post Cards</option>
                <option value="wine">Wine</option>
                <option value="lighters">Zippos / Lighters</option>
              </select>
              <input type="submit" className='btn btn-outline-secondary' value="Submit" />
            </form>
          </div>
          <div className="col-md-1">
          </div>
        </div>
      </div>
    );
  }
}

export default AdminForm;
