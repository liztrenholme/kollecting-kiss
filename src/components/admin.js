import React, { Component } from 'react';
import '../App.css';
const {
    Stitch,
    RemoteMongoClient,
    AnonymousCredential,
    userPasswordCredential
} = require('mongodb-stitch-browser-sdk');

const client = Stitch.initializeDefaultAppClient('kollecting-kiss-qctxo');

const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('memorabilia');
const mongodb = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
                _id: '',
                itemName: '',
                itemManufacturer: '',
                year: '',
                description: '',
                itemValue: '',
                category: 'actionFigures',
            submit: '',
            stringle: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // componentDidMount() {
    //     client.auth.loginWithCredential(new AnonymousCredential()).then(user =>
    //       db.collection('items').updateOne({owner_id: client.auth.user.id}, {$set:{number:44}}, {upsert:true})
    //     ).then(() =>
    //       db.collection('items').find({owner_id: client.auth.user.id}, { limit: 100}).asArray()
    //     ).then(docs => {
    //         console.log("Found docs", docs)
    //         console.log("[MongoDB Stitch] Connected to Stitch")
    //     }).catch(err => {
    //         console.error(err)
    //     });
    // }
    loadList() {
        // if (!this.client.auth.isLoggedIn) {
        //    return;
        // }
        // let obj = this;
        db.collection('items').find({}, {limit: 1000}).asArray().then(docs => {
        //    obj.setState({ items: docs, requestPending: false });
        console.log(docs);
        console.log(this.state);
        });
     }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            itemName: '',
            itemManufacturer: '',
            year: '',
            description: '',
            itemValue: '',
            category: '',
            submit: this.state.category
        });
    //     const {
    //         Stitch,
    //         RemoteMongoClient,
    //         AnonymousCredential
    //     } = require('mongodb-stitch-browser-sdk');
    //     const client = Stitch.initializeDefaultAppClient('kollecting-kiss');
        
    //     const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('memorabilia');

    //     client.auth.loginWithCredential(new AnonymousCredential()).then(user =>
    //       db.collection('items').insertOne({itemName:this.state.itemName, 
    //                                         itemManufacturer:this.state.itemManufacturer,
    //                                         year:this.state.year,
    //                                          description:this.state.description,
    //                                         itemValue:this.state.itemValue,
    //                                         category:this.state.category})
    //     ).then(() =>{(

    //     )}.catch(err => {
    //       console.error(err)
    //   });
    }
    getResult() {
    let client = Stitch.defaultAppClient;
    client.callFunction("functionTest").then(result => {
    this.setState({stringle: result})
});
    }
    render() {
        this.getResult();
        return (
            <div className="Admin">
                <div className="row">
                    <div className="col-md-1">
                    </div>
                    <div className="col-md-10 adminform">
                        <h3 className="title">Enter new item</h3>
                        <form onSubmit={this.handleSubmit}>
                            <input className="text-input" placeholder=" Item Name" required type="text"
                                name="itemName" value={this.state.itemName} onChange={this.handleChange} />
                            <input className="text-input" placeholder=" Manufacturer" required type="text"
                                name="itemManufacturer" value={this.state.itemManufacturer} onChange={this.handleChange} />
                            <input className="text-input" placeholder=" Year" type="text" name="year" value={this.state.year} onChange={this.handleChange} />
                            <textarea className="text-input" required rows="10" cols="25"
                                name="description" value={this.state.description} onChange={this.handleChange} placeholder=" Description" width="50%" height="50%"></textarea>
                            <input className="text-input" placeholder=" Estimated value" required type="text"
                                name="itemValue" value={this.state.itemValue} onChange={this.handleChange} />
                            <select name="category" value={this.state.category} onChange={this.handleChange} >
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
                            <input type="submit" className='btn btn-outline-secondary' value="Send" />

                        </form>
                    </div>
                    <div className="col-md-1">
                    </div>
                </div>
                <h1 style={{color: 'red'}}>Updates: {this.state.submit}</h1>
                {/* <p>{db.collection('items').find().asArray().catch(err => {console.error(err)})}</p> */}
                <p style={{color: 'red'}}>{this.state.stringle}</p>
            </div>
        );
    }
}

export default Admin;
