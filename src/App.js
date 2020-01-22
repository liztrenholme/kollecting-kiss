import React, { Component } from 'react';
import './components/mem.css';
import HeaderImg from './images/header.jpg';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Contact from './components/contact';
import Featured from './components/featured';
// import Search from '../components/search';
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
    category: '',
    results: [],
    _id: '',
    itemName: 'test',
    imageURL: '',
    year: 'test',
    itemManufacturer: 'test',
    description: 'test',
    items: '',
    selected: '',
    search: ''
  };
  
  handleSearch = (e) => {
    this.setState({ search: e.target.value });
  }

   

  //function to search db for item name using state from value, then pass item data to itemview
  /*** this will become function that gets fired with item is selected from categories menu *******
     */
    

  /*********************************************************************** */

  //function to get item _id when item is clicked on, then puts that value into state
   grabId = (event) => {
     this.setState({
       _id: event.currentTarget.dataset.key,
       itemName: event.currentTarget.dataset.valuename
     });
     //  let id = this.state.id;
     //  fetchData(id).then(console.log('data fetched'));
   }

   componentDidMount() {
     stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(() => {
       const mongodb = stitchClient.getServiceClient(
         RemoteMongoClient.factory,
         'mongodb-atlas'
       );
       // Get a hook to the items collection
       const items = mongodb.db('memorabilia').collection('items');
       return items.find({}, { limit: 9 }).asArray();

     })
       .then(items => this.setState({ items: items }));
   }
   render() {
     const { items } = this.state;
     return (
       <div className="App">
         <div className="container-fluid">
           <NavBar />
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
                         grabId={this.grabId}
                       />} />
                       <Route path='/login' exact component={adminLogin} />
                       <Route path={'/item-view/' + this.state._id} exact render={(props) => (<ItemView {...props}
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
         <footer><a className="light" href={process.env.PUBLIC_URL + '/login'}>[Admin]</a></footer>

       </div>
     );
   }
}

export default App;
