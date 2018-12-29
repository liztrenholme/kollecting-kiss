import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Contact from '../components/contact';
import Featured from '../components/featured';
// import Search from '../components/search';
import adminLogin from '../components/adminLogin';
import ItemView from '../components/itemView';

export default () => (
    <div>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route path="/contact" exact component={Contact} />
                <Route path="/" exact render={(props) => <Featured {...props} hi={props.hi} />} />
                <Route path='/login' exact component={adminLogin} />
                <Route path='/item_view' render={(props) => <ItemView {...props} hi={"hello world"} />} />
            </Switch>
        </BrowserRouter>
    </div>
);