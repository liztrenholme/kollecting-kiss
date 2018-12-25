import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Contact from '../components/contact';
import Featured from '../components/featured';
// import Search from '../components/search';
import adminLogin from '../components/adminLogin';

export default () => (
    <div>
        <BrowserRouter basename={'kollecting-kiss'}>
            <Switch>
                <Route path={process.env.PUBLIC_URL + "/contact"} exact component={Contact} />
                <Route path={process.env.PUBLIC_URL + "/"} exact component={Featured} />
                {/* <Route path="?" component={Search} /> */}
                <Route path={process.env.PUBLIC_URL + '/login'} component={adminLogin} />
            </Switch>
        </BrowserRouter>
    </div>
);