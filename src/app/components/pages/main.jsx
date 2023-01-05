import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import classes from "./main.module.css";
import routes from "./routes";
import ProtectedRoute from "./protectedRoute";
import protectedRoutes from "./protectedRoutes";

const Main = () => {
    return (
        <div className={classes.mainContentBlock}>
            <Switch>
                {routes.map((prop, key) => (
                    <Route
                        path={prop.path}
                        component={prop.component}
                        exact={prop.exact}
                        key={key}
                    />
                ))}
                {protectedRoutes.map((prop, key) => (
                    <ProtectedRoute
                        key={key}
                        path={prop.path}
                        component={prop.component}
                    />
                ))}
                <Redirect to="/rooms" />
            </Switch>
        </div>
    );
};

export default Main;
