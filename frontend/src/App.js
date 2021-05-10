import React from 'react';
import {Route} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Signup from "./components/Signup";
import Login from "./components/Login";

const App = () => {
  return (
    <>
      <Navbar />
      <Route exact path = "/">
        <Home />
      </Route>
      
      <Route exact path = "/about">
        <About />
      </Route>

      <Route path = "/contact">
        <Contact />
      </Route>

      <Route path = "/signup">
        <Signup />
      </Route>

      <Route path = "/login"> 
        <Login />
      </Route>

    </>
  );
}

export default App;
