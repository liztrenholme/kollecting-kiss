import React, { Component } from 'react';
import './mem.css';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class SearchListViewItem extends Component {
  render() {
    const {item} = this.props;
    return (
      <NavLink 
        to={`/item-view/${item.grn}`}
        className="navlink-wrapper">
        <h2 className="list-view-header">{item.itemName}</h2>
        <div className="col-md-12 list-view-container">
          <img 
            src={item.mainImage} 
            alt={item.itemName} 
            className="list-view-thumbnail" />
          <div className="list-view-body list-view-description">
            <p>{item.description}</p>
          </div>
          <div className="list-view-body">
            <p>{item.itemManufacturer}</p>
            <p>{item.year}</p>
          </div>
        </div>
      </NavLink>
    );
  }
}

SearchListViewItem.propTypes = {
  item: PropTypes.object
};

export default SearchListViewItem;