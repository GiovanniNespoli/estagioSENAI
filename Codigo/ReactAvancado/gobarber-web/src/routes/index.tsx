import React from "react";
import { Switch } from 'react-router-dom';
//Switch -> permite q mostre apenas uma rota por momento
//Route -> a rota 

import Route from "./Route";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/ForgotPassword";

const Routes: React.FC = () => (
    <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/forgotPassword" component={ForgotPassword} />
    </Switch>
);

export default Routes;
