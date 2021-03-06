import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './mem.css';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

class Featured extends Component {
  handleNoTake = (e) => e.preventDefault()
  render() {
    const { items, loading } = this.props;
    const itemsArr = Object.keys(items).map(i => items[i]);
    return (
      <div className="Featured">
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-10">
            <div className="row">
              <div className="main-blurb">
                <h4>Kollecting KISS is your ultimate resource guide for collecting KISS memorabilia since June 25th, 2007.</h4>
                <p className="disclaimer">(Please note that we are NOT a retail site. We are for informational purposes only!)</p>
                <p>{`Have you ever seen an item and wondered, "Where did that come from, and is it a fake or a licensed item?" 
                  That's where www.KollectingKISS.com comes in. We are building a database that will be made by you, the fans. 
                  Let's face it, Gene Simmons has been a monster in the marketing of the KISS brand the world over. There are 
                  always new merchandising ideas coming down the pipeline in the KISS community and if you are a collector, you 
                  want to know about them. We will strive to give you as much information as possible to let the die hard KISS 
                  collector know manufacturing data, prototype ideas, variants in products and much, much more. We welcome your 
                  ideas and submissions of cool and rare stuff from your collection. Email us and find out how to submit your 
                  pictures and information. Finally, collecting should be fun! Your latest rare find should be as exciting as your very first.`}</p>
                <p>{`We hope our resource guide will help you recognize official merchandise from knock offs and unauthorized memorabilia and help 
                  you recognize some of the the real gems in your collection.`}</p>
                <p>{`Searching for a particular item? Want to see what came out in 2010? Simply use our search feature at the top of 
                  the page and type in the item or year you want to see.`}</p>
              </div>
            </div>
          </div>
          <div className="col-md-1" />
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <iframe
              className='kiss-channel'
              src="https://www.youtube.com/embed/?listType=user_uploads&list=KollectingKiss" 
              title="Kollecting KISS on YouTube" />                  

          </div>
        </div>
        {loading ?
          (<div className="row">
            <div className="col-md-5" />
            <div className="col-md-2" style={{textAlign: 'center'}}>
              <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                // timeout={3000} //3 secs
              />
            </div>
            <div className="col-md-5" />
          </div>) : (
            <div className="featured-items">
              <h3>Featured Items</h3>
              <div className="row">
                <div className="col-md-12">
                  <div className="grid-container">
                    {itemsArr.map(item =>
                      <NavLink to={`/item-view/${item.grn}`} key={item.grn}>
                        <div className="grid-item">
                          <h4 className="listing-title">{item.itemName}</h4> 
                          <picture style={{height: '100px'}}>
                            <source 
                              onMouseDown={this.handleNoTake}
                              onContextMenu={this.handleNoTake}
                              srcSet={item.mainImage} 
                              type="image/webp" />
                            <img
                              onMouseDown={this.handleNoTake}
                              onContextMenu={this.handleNoTake}
                              src={item.mainImage.endsWith('.webp') 
                                ? item.mainImage.replace('.webp', '.png') : item.mainImage} 
                              alt="logo" 
                              height='100px'
                              className="featured-image" />
                          </picture>
                        </div>
                      </ NavLink>
                    )}
                  </div>
                </div>
              </div>
            </div>)}
      </div>
    );
  }
}

Featured.propTypes = {
  items: PropTypes.array,
  _id: PropTypes.string,
  itemName: PropTypes.string,
  imageURL: PropTypes.string,
  itemManufacturer: PropTypes.string,
  year: PropTypes.number,
  grabId: PropTypes.func,
  loading: PropTypes.bool
};

export default Featured;