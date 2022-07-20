import React from "react";
import {
    RouteProps as ReactDOMRouterProps,
    Route as ReactDOMRoute,
    Redirect
} from "react-router-dom";

import { useAuth } from "../hooks/auth";

//Via estender as propriedades do ReactDOMRouter
interface RouteProps extends ReactDOMRouterProps {
    isPrivate?: boolean,
    component: React.ComponentType;
};


// isPrivate -> Valor inicial == false / se n estiver presente o valor será automaticamente false
//...reste -> todas as propriedades que passamos dentro 
const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
    //Se tiver dados do usuario quer dizer q ele está autenticado 
    const { user } = useAuth();

    return (
        //render -> muda a logistica de mostrar o componente em tela
        <ReactDOMRoute
            {...rest}
            render={({ location }) => {
                /**
                 * rota privada / autenticado 
                 * true         / true == OK
                 * true         / false == Redirecionar para o login
                 * false        / true == Redirecionar para o dashboard
                 * false        / false == OK
                 */
                return isPrivate === !!user ? (
                    <Component />
                ) : (
                    <Redirect to={{
                        pathname: isPrivate ? '/' : '/dashboard',
                        state: { from: location }
                    }} />
                )
            }} />
    )
};

export default Route;