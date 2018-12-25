import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Contact from '../components/contact';
import Featured from '../components/featured';
// import Search from '../components/search';
import adminLogin from '../components/adminLogin';

export default () => (
    <div>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route path="/contact" exact component={Contact} />
                <Route path="/" exact component={Featured} />
                {/* <Route path="?" component={Search} /> */}
                <Route path='/login' component={adminLogin} />
            </Switch>
        </BrowserRouter>
    </div>
);