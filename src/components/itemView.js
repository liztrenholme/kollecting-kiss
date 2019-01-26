import React, { Component } from 'react';
import './mem.css';
import stitchClient from '../components/stitch';

const {
    RemoteMongoClient,
    AnonymousCredential
} = require('mongodb-stitch-browser-sdk');

class ItemView extends Component {

    componentDidMount() {
        stitchClient.auth.loginWithCredential(new AnonymousCredential()).then(() => {
            const mongodb = stitchClient.getServiceClient(
                RemoteMongoClient.factory,
                "mongodb-atlas"
            );
            // Get a hook to the items collection
            const items = mongodb.db("memorabilia").collection("items");
            return items.find({ "_id": this.props._id }).asArray()

        })
            .then(items =>
                console.log(items)
            //     item => this.setState({
            //     itemName: item.itemName,
            //     year: item.year,
            //     imageURL: item.imageURL,
            //     itemManufacturer: item.itemManufacturer,
            //     description: item.description

            // })
            );
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-8 featured-items">
                        <div className="row">
                            <div className="col-md-12">
                                <h4>Item view here {this.props.itemName}</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <img src={this.props.imageURL} alt={this.props.itemName} />
                                <p>{this.props.year}</p>
                                <p>{this.props.itemManufacturer}</p>
                            </div>
                            <div className="col-md-8">
                                <p>{this.props.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                    </div>
                </div>
            </div>
        );
    }
}

export default ItemView;