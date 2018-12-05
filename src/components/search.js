import React, { Component } from 'react';
import './mem.css';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            hi: []
        };
    }

    componentDidMount() {
        fetch('/api/hi')
            .then(res => res.json())
            .then(hi => this.setState({ hi }, () => console.log('Hellos fetched...', hi)));
    }

    render() {
        return (
            <div className="search">
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-secondary my-2 my-sm-0" href={"/" + this} type="submit">Search</button>
                </form>
            </div>
        );
    }
}

export default Search;