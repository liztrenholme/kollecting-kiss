import React, { Component } from 'react';
import './mem.css';

class ItemView extends Component {
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