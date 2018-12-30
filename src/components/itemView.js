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
                        <h4>Item view here {this.props._id}</h4>
                    </div>
                    <div className="col-md-2">
                    </div>
                </div>
            </div>
        );
    }
}

export default ItemView;