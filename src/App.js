import React, { Component } from 'react';
import './components/mem.css';
import HeaderImg from './images/kissbanner.jpg';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Contact from './components/contact';
import Featured from './components/featured';
import SearchListView from './components/searchListView';
import adminLogin from './components/adminLogin';
import ItemView from './components/itemView';
import stitchClient from './components/stitch';
// import { fetchData } from './components/modules/index';
import NavBar from './components/navbar';

const {
  RemoteMongoClient,
  AnonymousCredential
} = require('mongodb-stitch-browser-sdk');


class App extends Component {
  state = {
    items: [],
    loading: true,
    error: ''
  };

  componentDidMount() {
    stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(() => {
      const mongodb = stitchClient.getServiceClient(
        RemoteMongoClient.factory,
        'mongodb-atlas'
      );
      const items = mongodb.db('memorabilia').collection('items');
      return items.find({}, { limit: 9 }).asArray();

    })
      .then(items => this.setState({ items: items, loading: false }))
      .catch(e => this.setState({loading: false, error: e}));
  }
     
  handleSearch = (e) => {
    this.setState({ search: e.target.value });
    // $or Matches documents where the value of a field matches any of the specified expressions.
    //     EXAMPLE
    // The following query matches documents where either quantity is greater than zero or 
    // there are no more than five documents in the reviews array.
    // {
    //   "$or": [
    //     { "quantity": { "$gt": 0 } },
    //     { "reviews": { "$size": { "$lte": 5 } } }
    //   ]
    // }
  }
  render() {
    const { items, loading } = this.state;
    return (
      <div className="App">
        <div className="container-fluid">
          <NavBar handleChooseCategory={this.handleChooseCategory} />
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
                      <Route 
                        path="/" 
                        exact 
                        render={(props) => <Featured {...props} items={items} loading={loading}/>} />
                      <Route path='/login' exact component={adminLogin} />
                      <Route path='/item-view/' component={ItemView} />
                      <Route path='/category/' component={SearchListView} />
                    </Switch>
                  </BrowserRouter>
                </div>
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
