import React, { Component } from 'react';
import './components/mem.css';
import Logo from './images/logo.jpg';
import Tumblr from "./images/tumblr.png";
import Twitter from "./images/twitter-48.png";
import Blogger from "./images/blogger-5-48.png";
import HeaderImg from "./images/header.jpg";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Contact from './components/contact';
import Featured from './components/featured';
// import Search from '../components/search';
import adminLogin from './components/adminLogin';
import ItemView from './components/itemView';
import stitchClient from './components/stitch';

const {
    RemoteMongoClient,
    AnonymousCredential
} = require('mongodb-stitch-browser-sdk');


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            category: '',
            results: [],
            _id: '',
            itemName: 'test',
            imageURL: '',
            year: 'test',
            itemManufacturer: 'test',
            description: 'test',
            items: '',
            selected: ''
        };
        this.grabId = this.grabId.bind(this);
        // this.onChange = this.onChange.bind(this);
    }
    // onChange(e) {
    //     // event.preventDefault();
    //     this.setState({ value: e.target.value });
    //     console.log(this.state.value);
    //     this.setState({
    //         selected: this.state.value
    //     })
    // }

    //function to get item _id when item is clicked on, then puts that value into state
    grabId(event) {
        this.setState({
            _id: event.currentTarget.dataset.valuename
        })
        console.log(event.currentTarget.dataset.valuename);
        console.log(this.state._id);
    }

    //function to search db for item name using state from value, then pass item data to itemview




    /*************** this will become function that gets fired with item is selected from
     * categories menu *******************
     */
    // fetchData() {
    //     const mongodb = stitchClient.getServiceClient(
    //         RemoteMongoClient.factory,
    //         "mongodb-atlas"
    //     );
    //     const items = mongodb.db("memorabilia").collection("items");

    //     stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(user => {
    //         items.find({ category: this.state.selected })
    //     });
    //     console.log(items);
    // }

    /*********************************************************************** */

    // put results fetching in CDM so it doesn't drain memory with continuous calls!
    componentDidMount() {
        stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(() => {
            const mongodb = stitchClient.getServiceClient(
                RemoteMongoClient.factory,
                "mongodb-atlas"
            );
            // Get a hook to the items collection
            const items = mongodb.db("memorabilia").collection("items");
            return items.find({}, { limit: 9 }).asArray()

        })
            .then(items => this.setState({ items: items }));
    }
    render() {
        const { items } = this.state;
        return (

            <div className="App">
                <div className="container-fluid">
                    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand"
                            href="/"><img src={Logo}
                                alt="logo"
                                width="80px" /></a>
                        <button className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse"
                            id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="http://kollectingkiss.tumblr.com/">
                                        <img src={Tumblr} alt="tumblr" width="24px" height="24px" /></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="http://twitter.com/KollectingKiss">
                                        <img src={Twitter} alt="twitter" width="24px" height="24px" /></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href=" http://kollectingkiss.blogspot.com/">
                                        <img src={Blogger} className="blogger-pic" alt="blogspot" width="24px" height="24px" /></a>
                                </li>
                                <li className="nav-item active dropdown">
                                    <p className="nav-link dropdown-toggle scrollable-menu"
                                        id="navbarDropdown" role="button" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">Categories</p>
                                    <div className="dropdown-menu pre-scrollable"
                                        aria-labelledby="navbarDropdown">
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
                                    type="submit" href={process.env.PUBLIC_URL + "/" + this.state.selected} onSubmit={this.fetchData}>Search</button>
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
                                <div>
                                    <BrowserRouter basename={process.env.PUBLIC_URL}>
                                        <Switch>
                                            <Route path="/contact" exact component={Contact} />
                                            <Route path="/" exact render={(props) => <Featured {...props}
                                                items={items}
                                                hi={this.state._id}
                                                onClick={this.grabId}
                                            />} />
                                            <Route path='/login' exact component={adminLogin} />
                                            <Route path={'/item_view/' + this.state._id} exact render={(props) => (<ItemView {...props}
                                                _id={this.state._id}
                                                itemName={this.state.itemName}
                                                year={this.state.year}
                                                itemManufacturer={this.state.itemManufacturer}
                                                description={this.state.description}
                                            />)}
                                            />
                                        </Switch>
                                    </BrowserRouter>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer>&#9400; 2007-{new Date().getFullYear()} Kollecting KISS | All rights reserved.</footer>
                <footer><a className="light" href={process.env.PUBLIC_URL + "/login"}>[Admin]</a></footer>

            </div>
        );
    }
}

export default App;
