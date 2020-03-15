import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Route, Switch, HashRouter } from "react-router-dom";
import MainPage from "./Pages/Main";
import LoginPage from "./Pages/Login";
import RegistrationPage from "./Pages/Registration";
import UsersPage from "./Pages/Users";
import NotFound from "./Pages/Login";

function App() {  
  return (
    <HashRouter>
      <Switch>
          <Route exact={true} path="/" component={MainPage} />
          <Route exact={true} path="/login" component={LoginPage} />  
          <Route exact={true} path="/registration" component={RegistrationPage} />  
          <Route exact={true} path="/users" component={UsersPage} />     
          {<Route component={MainPage} />}
        </Switch>  
      </HashRouter>  
  );
}

export default App;
