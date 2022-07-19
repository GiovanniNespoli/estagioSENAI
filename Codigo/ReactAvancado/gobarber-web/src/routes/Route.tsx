import React from "react";
import { RouteProps as ReactRouterProps } from "react-router-dom";

interface RouteProps {
    
};

import { useAuth } from "../hooks/auth";

const Route: React.FC = () => {
    const { user } = useAuth();
};

export default Route;