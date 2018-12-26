import React, { Component } from 'react';
import './mem.css';
import stitchClient from './stitch';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const {
    RemoteMongoClient,
    AnonymousCredential
} = require('mongodb-stitch-browser-sdk');
let lastItem = [];

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: '',
            itemManufacturer: '',
            year: '',
            description: '',
            itemValue: '',
            category: 'actionFigures',
            submit: '',
            uploadedFile: null,
            imageURL: '',
            lastItem: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onImageDrop = this.onImageDrop.bind(this);
    }
    // updates state with form inputs
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            submit: ''
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const mongodb = stitchClient.getServiceClient(
            RemoteMongoClient.factory,
            "mongodb-atlas"
        );
        const items = mongodb.db("memorabilia").collection("items");
        // here we are inserting data into the database through the form
        stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(user => {
            try {
                items.insertOne({
                    itemName: this.state.itemName,
                    itemManufacturer: this.state.itemManufacturer,
                    year: this.state.year,
                    description: this.state.description,
                    itemValue: this.state.itemValue,
                    category: this.state.category,
                    imageURL: this.state.imageURL
                });
                this.setState({
                    itemName: '',
                    itemManufacturer: '',
                    year: '',
                    description: '',
                    itemValue: '',
                    category: 'actionFigures',
                    imageURL: '',
                    submit: 'Data insert successful!'
                });
            } catch (err) {
                console.log(err);
                this.setState({
                    submit: 'Error inserting data.'
                })
            }
        })
        lastItem.push(JSON.stringify(this.state));
        // function showLastItem() {
        //     return ()
        // }
        // showLastItem();
    }
    // allows user to either click on or drag image to box for upload
    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });
        this.handleImageUpload(files[0]);
    }
    // sends image to cloudinary, updates state, fetches imageURL to send to mongodb
    handleImageUpload(file) {
        let upload = request.post('https://api.cloudinary.com/v1_1/cheesecake/upload')
            .field('upload_preset', 'jvr3ebf0')
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
                this.setState({
                    submit: "Error: picture may be too large, or there was a problem on Cloudinary's end."
                })
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    imageURL: response.body.secure_url
                });
                console.log(this.state.imageURL);
            }
        });
    }

    

    render() {
        // console.log(lastItem);
        return (
            <div className="Admin">
                <div className="row">
                    <div className="col-md-1">
                    </div>
                    <div className="col-md-10 adminform">
                        <h3 className="title">Enter new item</h3>
                        <div >
                            <Dropzone onDrop={this.onImageDrop}
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
                                    </div>)
                                }}
                            </Dropzone>
                            <div>
                                {this.state.imageURL === '' ? null :
                                    (<div>
                                        <p>{this.state.uploadedFile.name}</p>
                                        <img src={this.state.imageURL} alt="Successfully uploaded" height="200px" />
                                    </div>)}
                            </div>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <input className="text-input" placeholder=" Item Name" required type="text"
                                name="itemName" value={this.state.itemName} onChange={this.handleChange} />
                            <input className="text-input" placeholder=" Manufacturer" type="text"
                                name="itemManufacturer" value={this.state.itemManufacturer} onChange={this.handleChange} />
                            <input className="text-input" placeholder=" Year" type="text" name="year" value={this.state.year} onChange={this.handleChange} />
                            <textarea className="text-input" required rows="10" cols="25"
                                name="description" value={this.state.description} onChange={this.handleChange} placeholder=" Description" width="50%" height="50%"></textarea>
                            <input className="text-input" placeholder=" Estimated value" type="text"
                                name="itemValue" value={this.state.itemValue} onChange={this.handleChange} />
                            <select className="options" name="category" value={this.state.category} onChange={this.handleChange} >
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
                <div className="row">
                    <div className="col-md-12">
                        <h1 style={{ color: 'red' }}>{this.state.submit}</h1>
                    </div>
                </div>
                {/* <div className="row">
                <div className="col-md-12">
            
                {lastItem}
                 <p className="white-text">{lastItem.category} <img src={lastItem.imageURL} alt="no picture uploaded" width="80px" />
                    {lastItem.itemName} {lastItem.itemManufacturer}
                     {lastItem.description} ${lastItem.itemValue} {lastItem.year}</p>
                 
                </div>
                </div> */}
            </div>
        );
    }
}

export default Admin;
