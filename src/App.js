import React, { Component } from 'react';
import './components/mem.css';
import Logo from './images/logo.jpg';
import Tumblr from "./images/tumblr.png";
import Twitter from "./images/twitter-48.png";
import Blogger from "./images/blogger-5-48.png";
import HeaderImg from "./images/header.jpg";
import Routes from './routes/routes';
import stitchClient from './components/stitch';

const {
    RemoteMongoClient,
    AnonymousCredential
} = require('mongodb-stitch-browser-sdk');


class App extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            category: '',
            results: []
        };
        this.fetchData = this.fetchData.bind(this);
    }
    onChange(e) {
        // event.preventDefault();
        this.setState({ value: e.target.value });
        console.log(this.state.value);
    }

    fetchData() {
        const mongodb = stitchClient.getServiceClient(
            RemoteMongoClient.factory,
            "mongodb-atlas"
        );
        const items = mongodb.db("memorabilia").collection("items");
 
        stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(user => { 
            items.find({category: 'beltBuckles'})
        });
        console.log(items);
    }

    componentWillMount() {
        
    }

    render() {
        return (
            <div className="App">
                <div className="container-fluid">
                    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="/"><img src={Logo} alt="logo" width="80px" /></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" 
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="http://kollectingkiss.tumblr.com/"><img src={Tumblr} alt="tumblr" width="24px" height="24px" /></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="http://twitter.com/KollectingKiss"><img src={Twitter} alt="twitter" width="24px" height="24px" /></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href=" http://kollectingkiss.blogspot.com/"><img src={Blogger} className="blogger-pic" alt="blogspot" width="24px" height="24px" /></a>
                                </li>
                                <li className="nav-item active dropdown">
                                    <p className="nav-link dropdown-toggle scrollable-menu"
                                        id="navbarDropdown" role="button" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">Categories</p>
                                    <div className="dropdown-menu pre-scrollable"
                                        aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="actionFigures" href="actionFigures">Action Figures / Dolls</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="advertisingAds" href="advertisingAds">Advertising Ads</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="artworkBusts" href="artworkBusts">Artwork / Busts</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="backstagePasses" href="backstagePasses">Backstage Passes</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="bags" href="bags">Bags / Backpacks / Wallets</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="beltBuckles" href="beltBuckles">Belt Buckles</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="blankets" href="blankets">Blankets / Rugs / Towels</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="books" href="books">Books</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="buttons" href="buttons">Buttons / Lapel Pins</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="calendars" href="calendars">Calendars</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="autoAccessories" href="autoAccessories">Car Automobile Accessories</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="cars" href="cars">Cars / Die Cast</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="clocks" href="clocks">Clocks / Watches</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="clothing" href="clothing">Clothing</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="coins" href="coins">Coins</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="comics" href="comics">Comics</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="electronics" href="electronics">Electronics / Gaming Gear</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="games" href="games">Games / Puzzles</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="glassware" href="glassware">Glassware</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="guitarDrum" href="guitarDrum">Guitar Picks & Drum Sticks</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="halloween" href="halloween">Halloween Products</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="health" href="health">Health & Beauty</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="homeDecor" href="homeDecor">Home Decor</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="incenseCandles" href="incenseCandles">Incense / Candles</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="jewelry" href="jewelry">Jewelry</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="keychains" href="keychains">Keychains</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="lunchBoxes" href="lunchBoxes">Lunch Boxes</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="magazines" href="magazines">Magazines</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="magnets" href="magnets">Magnet / Magnet Sets</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="misc" href="misc">Miscellaneous</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="ornaments" href="ornaments">Ornaments</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="petSupplies" href="petSupplies">Pet Supplies & Accessories</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="posters" href="posters">Posters</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="stationary" href="stationary">Stationary Products</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="stickersPatches" href="stickersPatches">Stickers / Patches</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="tickets" href="tickets">Tickets / Stubs</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="tourBooks" href="tourBooks">Tour Books</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="tradingPostCards" href="tradingPostCards">Trading Cards Phone & Post Cards</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="wine" href="wine">Wine</a>
                                        <a className="dropdown-item" onChange={e => this.onChange(e)} name="lighters" href="lighters">Zippos / Lighters</a>
                                    </div>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" href="/contact">Contact</a>
                                </li>
                            </ul>
                            <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2"
                                    type="text"
                                    onChange={e => this.onChange(e)}
                                    placeholder="Search"
                                    aria-label="Search" />
                                    <button className="btn btn-outline-secondary" id="main-search"
                                        type="submit" onSubmit={this.fetchData}>Search</button>
                            </form>
                        </div>
                    </nav>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <img className="header" src={HeaderImg} alt="header" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="routes-rendered-here col-md-12">
                                <Routes />
                            </div>
                        </div>
                    </div>
                </div>
                <footer>&#9400; 2007-2019 Kollecting KISS | All rights reserved.</footer>
                <footer><a className="light" href={process.env.PUBLIC_URL + "/login"}>[Admin]</a></footer>
            </div>
        );
    }
}

export default App;
