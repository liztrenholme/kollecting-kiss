import React, { Component } from 'react';
import './mem.css';
import stitchClient from '../components/stitch';
import PropTypes from 'prop-types';
import {
  AnonymousCredential,
  RemoteMongoClient,
} from 'mongodb-stitch-browser-sdk';
import SearchListViewItem from './searchListViewItem';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
 
class SearchListView extends Component {
state = {
  items: [],
  errorMessage: '',
  loading: true
}
componentDidMount() {
  const categoryName = window.location.pathname.split('/')[2];
  let query = {};
  if (categoryName !== 'all') {
    query = { 'categories': categoryName };
  }
  stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(() => {
    const mongodb = stitchClient.getServiceClient(
      RemoteMongoClient.factory,
      'mongodb-atlas'
    );
    const items = mongodb.db('memorabilia').collection('items');
    return items.find(query).asArray();
  })
    .then(items => {
      if (items && items.length) {
        this.setState({
          items: items,
          loading: false
        });
      } else {
        this.setState({loading: false});
      }
    }
    ).catch(err => {
      // eslint-disable-next-line no-console
      console.log(err);
      this.setState({errorMessage: err, loading: false});
    });
}

render() {
  const {items, loading} = this.state;
  const sortedByYear = items.sort((a, b) => b.year - a.year);
  return (
    <div>
      {loading ?
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          // timeout={3000} //3 secs
        /> : (
          <div className="row">
            <div className="col-md-1">
            </div>
            <div className="col-md-10 featured-items">
              <div className="row">
                <div className="col-md-12">
                  <h3>Category Search</h3>
                </div>
              </div>
              {sortedByYear && sortedByYear.length ?
                sortedByYear.map(item => (
                  <div className="row" key={item.grn}>
                    <SearchListViewItem item={item} />
                  </div>
                )) : <div>No results.</div>}
            </div>
            <div className="col-md-1">
            </div>
          </div>)}
    </div>
  );
}
}

SearchListView.propTypes = {
  description: PropTypes.string,
  _id: PropTypes.string,
  itemName: PropTypes.string,
  mainImage: PropTypes.string,
  itemManufacturer: PropTypes.string,
  year: PropTypes.number,
};

export default SearchListView;