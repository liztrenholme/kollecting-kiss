import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Contact from '../components/contact';
import Featured from '../components/featured';
// import Search from '../components/search';
import Admin from '../components/admin';
import adminLogin from '../components/adminLogin';

export default () => (
    <div>
        <BrowserRouter>
            <Switch>
                <Route path="/contact" exact component={Contact} />
                <Route path="/" exact component={Featured} />
                {/* <Route path="?" component={Search} /> */}
                <Route path="/admin" component={Admin} />
                <Route path='/login' component={adminLogin} />
            </Switch>
        </BrowserRouter>
    </div>
);