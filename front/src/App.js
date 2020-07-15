import React, {useState, useEffect} from 'react';
import './App.scss';
import { Route, Switch, HashRouter, Redirect } from "react-router-dom";
import MainPage from "./Pages/Main";
import LoginPage from "./Pages/Login";
import RegistrationPage from "./Pages/Registration";
import UsersPage from "./Pages/Users";
import Profile from "./Pages/Profile";
import Navbar from "./components/Navbar";
import NotFound from "./Pages/Login";
import { httpAuth} from "./api/v1";

function App() {  
  const [loggedIn, setLoggedin] = useState(false);
  useEffect(() => {
       httpAuth().then(res => {
        if (res.response == 0){
          sessionStorage.removeItem('user_id');
          sessionStorage.removeItem('login');
          setLoggedin(false)  
        }   else setLoggedin(true);
        }  
      );       
    },[]);
  return (<>
    <Navbar />
    <div className="App">
      <HashRouter>
        <Switch>
            <Route exact={true} path="/" component={MainPage} />
            <Route exact={true} path="/login" component={LoginPage} />  
            <Route exact={true} path="/registration" component={RegistrationPage} />  
            <Route exact={true} path="/users" component={UsersPage} /> 
            <Route exact={true} path="/profile/:author_id" component={Profile} />     
            <Route exact={true} path="/profile" component={Profile}>
              {!loggedIn ? <Redirect to="/" /> : ""}
            </Route> 
            {<Route component={MainPage} />}
          </Switch>  
        </HashRouter> 
    </div> 
    </>
  );
}

export default App;
