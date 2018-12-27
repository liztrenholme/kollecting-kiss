import React, { Component } from 'react';
import './mem.css';
import stitchClient from './stitch';

const {
  RemoteMongoClient,
  AnonymousCredential
} = require('mongodb-stitch-browser-sdk');

class Featured extends Component {
  constructor() {
    super();
    this.state = {
      items: ''
    };
  }

  // put results fetching in CDM so it doesn't drain memory with continuous calls!
  componentDidMount() {
    stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(() => {
      // console.log(`Logged in as anonymous user with id: ${user.id}`);
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
    const itemsArr = Object.keys(items).map(i => items[i]);
    return (
      <div className="Featured">
        <div className="row">
          <div className="col-md-1">
          </div>
          <div className="col-md-10">
            <div className="row">
              <div className="main-blurb">
                <h4>Kollecting KISS is your ultimate resource guide for collecting KISS memorabilia since June 2007.</h4>
                <p className="disclaimer">(Please note that we are NOT a retail site. We are for informational purposes only!)</p>
                <p>Have you ever seen an item and wondered, "Where did that come from, and is it a fake or a licensed item?" That's where www.KollectingKISS.com comes in. We are building a database that will be made by you, the fans. Let's face it, Gene Simmons has been a monster in the marketing of the KISS brand the world over. There are always new merchandising ideas coming down the pipeline in the KISS community and if you are a collector, you want to know about them. We will strive to give you as much information as possible to let the die hard KISS collector know manufacturing data, prototype ideas, variants in products and much, much more. We welcome your ideas and submissions of cool and rare stuff from your collection. Email us and find out how to submit your pictures and information. Finally, collecting should be fun! Your latest rare find should be as exciting as your very first.</p>
                <p>We hope our resource guide will help you recognize official merchandise from knock offs and unauthorized memorabilia and help you recognize some of the the real gems in your collection.</p>
                <p>Searching for a particular item? Want to see what came out in 2010? Simply use our search feature at the top of the page and type in the item or year you want to see.</p>
              </div>
            </div>
            <div className="col-md-1">
            </div>
          </div>
          <div className="featured-items">
            <h3>Featured Items</h3>
            <div className="row">
              <div className="col-md-12">
              <div className="grid-container">
                  {itemsArr.map(item =>
                    <div className="grid-item" key={item._id}><h4 className="listing-title">{item.itemName}</h4> <p className="listing-description">{item.description}</p>
                      <img className="featured-image" src={item.imageURL[0]} alt={item.itemName} height="100px" /></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Featured;