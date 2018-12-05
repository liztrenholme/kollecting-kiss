import React, { Component } from 'react';
import './mem.css';

class Featured extends Component {
  constructor() {
    super();
    this.state = {
      featured: []
    };
  }

  // componentDidMount() {
  //   fetch('/color')
  //     .then(res => res.json())
  //     .then(hi => this.setState({ hi }, () => console.log('Hellos fetched...', hi)));
  // }

  render() {
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
            <table>
              <tbody>
                <tr>
                  {this.state.featured.map(hi =>
                    <td key={hi.id}>{hi.greeting}</td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </div>

        );
      }
    }
    
export default Featured;