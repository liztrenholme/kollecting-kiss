import React, { Component } from 'react';
import Logo from '../images/logo.jpg';
import Facebook from '../images/facebook.png';
import Twitter from '../images/twitter-48.png';
import Blogger from '../images/blogger-5-48.png';
import YouTube from '../images/youtube.png';
import Instagram from '../images/instagram.png';
import Radio from '../images/radio-tower-icon-64.png';
import './mem.css';
import PropTypes from 'prop-types';

class NavBar extends Component {
  render() {
    const { search, handleSearch, searchResults, allCategories } = this.props;
    return (
      <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
        <a className="navbar-brand"
          href={`${process.env.PUBLIC_URL}/`}><img src={Logo}
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
              <a className="nav-link" href={`${process.env.PUBLIC_URL}/`}>Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://www.facebook.com/pages/category/Reference-Website/Collecting-KISS-138452756205555/">
                <img src={Facebook} alt="facebook" width="30px" height="30px" style={{opacity: '0.6'}} /></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://twitter.com/KollectingKiss">
                <img src={Twitter} alt="twitter" width="24px" height="24px" /></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://kollectingkiss.blogspot.com/">
                <img src={Blogger} className="blogger-pic" alt="blogspot" width="24px" height="24px" /></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://www.youtube.com/user/KollectingKiss">
                <img src={YouTube} className="youtube-pic" alt="youtube" width="30px" height="24px" /></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://www.instagram.com/kollectingkiss/">
                <img src={Instagram} alt="instagram" width="55px" height="40px" style={{opacity: '0.6'}} /></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://www.unholyradio.com">
                <img src={Radio} alt="instagram" width="30px" height="30px" style={{opacity: '0.6'}} /></a>
            </li>
            <li 
              className="nav-item active dropdown" 
              style={{
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}>
              <p className="nav-link dropdown-toggle scrollable-menu"
                id="navbarDropdown" 
                role="button" 
                data-toggle="dropdown"
                aria-haspopup="true" 
                aria-expanded="false"
                style={{whiteSpace: 'nowrap'}}>Categories</p>
              <div className="dropdown-menu pre-scrollable"
                style={{textAlign: 'center', padding: '0.2em'}}
                aria-labelledby="navbarDropdown">
                <a href={`${process.env.PUBLIC_URL}/category/all`}>View All Categories</a><br />
                {allCategories && allCategories.length ? 
                  allCategories.map(category => <div key={category} ><a href={`${process.env.PUBLIC_URL}/category/${category}`}>{category ? category.replace(/([A-Z]+)/g, ' $1').trim().replace(category[0], category[0].toUpperCase()) : null}</a><br /></div>)
                  : null}
              </div>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/contact">Contact</a>
            </li>
            <li>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <input 
                  className="form-control mr-sm-2"
                  type="text"
                  onChange={handleSearch}
                  value={search}
                  placeholder="Type to search..."
                  aria-label="Search"
                  style={{marginTop: '0.5em', minWidth: '5em'}} />
                {searchResults && searchResults.length ? 
                  <div className="searchDropdown pre-scrollable"
                    style={{textAlign: 'center', padding: '0.2em'}}
                    aria-labelledby="navbarDropdown">
                    <ul>
                      {searchResults.map(i => {
                        return (<li key={i.grn}>
                          <a href={`${process.env.PUBLIC_URL}/item-view/${i.grn}`}>
                            <p style={{fontSize: '.7em'}}>{i.itemName}</p>
                          </a>
                        </li>);
                      }
                      )}
                    </ul>
                  </div> : null}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  selected: PropTypes.string,
  search: PropTypes.string,
  handleSearch: PropTypes.func,
  fetchData: PropTypes.func,
  searchResults: PropTypes.array,
  allCategories: PropTypes.array
};

export default NavBar;