import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import Logo from '../images/logo.jpg';
import Facebook from '../images/facebook.png';
import Twitter from '../images/twitter-48.png';
import Blogger from '../images/blogger-5-48.png';
import './mem.css';
import PropTypes from 'prop-types'; 

class NavBar extends Component {

  render() {
    const { search, handleSearch, selected, fetchData } = this.props;
    return (
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
              <a className="nav-link" href="https://www.facebook.com/pages/category/Reference-Website/Collecting-KISS-138452756205555/">
                <img src={Facebook} alt="facebook" width="30px" height="30px" /></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://twitter.com/KollectingKiss">
                <img src={Twitter} alt="twitter" width="24px" height="24px" /></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://kollectingkiss.blogspot.com/">
                <img src={Blogger} className="blogger-pic" alt="blogspot" width="24px" height="24px" /></a>
            </li>
            <li className="nav-item active dropdown">
              <p className="nav-link dropdown-toggle scrollable-menu"
                id="navbarDropdown" 
                role="button" 
                data-toggle="dropdown"
                aria-haspopup="true" 
                aria-expanded="false"
                style={{whiteSpace: 'nowrap'}}>Categories</p>
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
              onChange={handleSearch}
              value={search}
              placeholder="Search"
              aria-label="Search" />
            <button className="btn btn-outline-secondary" id="main-search"
              type="submit" href={process.env.PUBLIC_URL + '/' + selected} onSubmit={fetchData}>Search</button>
          </form>
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  selected: PropTypes.string,
  search: PropTypes.string,
  handleSearch: PropTypes.func,
  fetchData: PropTypes.func
};

export default NavBar;