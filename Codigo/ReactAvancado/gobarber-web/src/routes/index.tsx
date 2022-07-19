import React from "react";
import { Switch, Route } from 'react-router-dom';
//Switch -> permite q mostre apenas uma rota por momento
//Route -> a rota 

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";

const Routes: React.FC = () => (
    <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/signup" component={SignUp} />

        <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
);

export default Routes;
