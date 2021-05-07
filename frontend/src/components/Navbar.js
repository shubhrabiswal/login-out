import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {NavLink} from "react-router-dom";
import logo from "../images/logo.jpg"    ///import images here

const Navbar = () => {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink class="navbar-brand" to="#">
                    <img src ={logo} alt="logo" />
                </NavLink>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active">
                            <NavLink className="nav-link" to="/">Home <span class="sr-only">(current)</span></NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink className="nav-link" to="/signup">Signup</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink className="nav-link" to="/login">Login</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                    {/* <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form> */}
                </div>
            </nav>
        </>
    )
}

export default Navbar;
