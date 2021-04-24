import React, {useEffect, useState, createContext, useContext} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ListPage from "./pages/ListPage";
import HomePage from "./pages/HomePage";
import SignIn from "./components/SignIn"
import * as db from './firestore'
// import { auth } from "firebase";
import Loading from "./components/shared/Loading";
// import SignIn from "./components/SignIn";
import useAuth from "./hooks/useAuth";

export const UserContext = createContext();


function App() {

  const {user, loading} = useAuth();

  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(()=> {
  //   db.checkAuth(user => {
  //     setLoading(false);
  //     setUser(user);
  //   })


  // },[])




  if(loading) return <Loading/>
  return user ? <AuthApp user={user}/> : <UnAuthApp/>;
}

function AuthApp({user}) {
  return (
    <BrowserRouter>
    <Switch>
      <UserContext.Provider value={user}>  
          <Route path="/:listId" component={ListPage} />
          <Route exact path="/" component={HomePage} />
        </UserContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

function UnAuthApp() {
  return  <SignIn/>
}

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <UnAuthApp/> */}
  </React.StrictMode>,
  document.getElementById("root")
);
 