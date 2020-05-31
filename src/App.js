import React, { Component } from 'react';
import {
  // Stitch,
  RemoteMongoClient,
  AnonymousCredential,
  // BSON
} from 'mongodb-stitch-browser-sdk';
import './components/mem.css';
import HeaderImg from './images/kissbanner.jpg';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Contact from './components/contact';
import Featured from './components/featured';
import SearchListView from './components/searchListView';
import AdminLogin from './components/adminLogin';
import ItemView from './components/itemView';
import stitchClient from './components/stitch';
// import { fetchData } from './components/modules/index';
import NavBar from './components/navbar';
import KISSMuseum from './images/museum.jpg';
import KISSOnlineShop from './images/KISS-SHOPTOUR-BANNER_2_1800x.jpg';
import KulickBanner from './images/Kulick_Merch_Banner.jpg';

class App extends Component {
  state = {
    items: [],
    loading: true,
    error: '',
    searchResults: [],
    allCategories: []
  };

  componentDidMount() {
    stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(() => {
      const mongodb = stitchClient.getServiceClient(
        RemoteMongoClient.factory,
        'mongodb-atlas'
      );
      const items = mongodb.db('memorabilia').collection('items');
      // return items.find({}, { limit: 9 }).asArray(); // return first 9 items in db
      return items.aggregate([{ $sample: { size: 9 } }]).asArray(); // return a random set of 9 from the db
    })
      .then(items => this.setState({ items: items, loading: false }))
      .catch(e => this.setState({loading: false, error: e}));
    this.getAllCategories();
  }
     
  getAllCategories = () => {
    const categories = [];
    stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(() => {
      const mongodb = stitchClient.getServiceClient(
        RemoteMongoClient.factory,
        'mongodb-atlas'
      );
      const items = mongodb.db('memorabilia').collection('items');
      return items.find({}).asArray();

    })
      .then(items => {
        items.forEach(i => categories.push(i.categories));
        const allCategories = [...new Set(categories.flat().filter(i => i !== ''))].sort();
        this.setState({ allCategories, loading: false });
      })
      .catch(e => this.setState({loading: false, error: e}));
  }
  handleSearch = (e) => {
    const search = e.target.value;
    this.setState({ search });
    // $or Matches documents where the value of a field matches any of the specified expressions.
    if (search !== '') {
      stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(() => {
        const mongodb = stitchClient.getServiceClient(
          RemoteMongoClient.factory,
          'mongodb-atlas'
        );
        const items = mongodb.db('memorabilia').collection('items');
        return items.find({
          '$or': [
            { 'categories': {$regex: `.+${search}`, $options:'i'} },
            { 'year': search },
            { 'itemName': {$regex: `.+${search}`, $options:'i'} },
            { 'itemManufacturer': {$regex: `.+${search}`, $options:'i'} },
            { 'description': {$regex: `.+${search}`, $options:'i'} }
          ]
        }).asArray();

      })
        .then(items => this.setState({searchResults: items}))
        .catch(e => this.setState({loading: false, error: e}));
    } else {
      this.setState({searchResults: []});
    }
  }
  render() {
    const { items, loading, searchResults, allCategories } = this.state;
    return (
      <div className="App">
        <div className="container-fluid">
          <NavBar
            allCategories={allCategories}
            handleChooseCategory={this.handleChooseCategory}
            handleSearch={this.handleSearch}
            searchResults={searchResults} />
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
                      <Route path={`${process.env.PUBLIC_URL}/contact`} exact component={Contact} />
                      <Route 
                        path={`${process.env.PUBLIC_URL}/`}
                        exact 
                        render={(props) => <Featured {...props} items={items} loading={loading}/>} />
                      <Route
                        path={`${process.env.PUBLIC_URL}/login`} 
                        exact
                        render={(props) => <AdminLogin {...props} allCategories={allCategories}/>} />
                      <Route path={`${process.env.PUBLIC_URL}/item-view/`} component={ItemView} />
                      <Route path={`${process.env.PUBLIC_URL}/category/`} component={SearchListView} />
                    </Switch>
                  </BrowserRouter>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <a href="https://www.brucekulick.com/shop/">
                  <img 
                    src={KulickBanner} 
                    alt='Kulick Online Shop'
                    width="50%" />
                </a>
              </div>
            </div>
            <div className="row" style={{marginTop: '2em', marginBottom: '2em'}}>
              <div className="col-md-7">
                <a href="https://www.kissmuseum.com">
                  <img 
                    src={KISSMuseum} 
                    alt='KISS Museum Online Shop'
                    width="80%" />
                </a>
              </div>
              <div className="col-md-5">
                <a href="https://shopkissonline.com">
                  <img 
                    src={KISSOnlineShop} 
                    alt='KISS Online'
                    width="80%" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <footer>&#9400; 2007-{new Date().getFullYear()} Kollecting KISS | All rights reserved.</footer>
        <footer><a className="light" href={process.env.PUBLIC_URL + '/login'}>[Admin]</a></footer>

      </div>
    );
  }
}

export default App;
