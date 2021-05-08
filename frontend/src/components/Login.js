import React, {useState} from 'react';
import 'react-dom';
import {NavLink, useHistory} from 'react-router-dom';
import 'react-router';

const Login = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        email:"",password:""
    });

    let name,value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        console.log(value);
        console.log(name);

        setUser({ ...user, [name]:value})   //// will take the name from line 15
    }
    // console.log(user);
    const PostData = async (e) => {
        e.preventDefault();

        const {email, password} = user;
        console.log(email)
        console.log(password)

        const res = await fetch("/login",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email: email, 
                password: password
            })
        })
        console.log("res", res);
        const data = await res.json();
        console.log("data",data)
        if(res.status === 422 || !data){
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        }else{
            window.alert("Login Successful");
            console.log("Login Successful");

            history.push("/about");
        }

    }
    return (
        <div>
            <div className = "container" >
            <div className="row row-cols-lg-8 row-cols-sm-2 row-cols-md-8  justify-content-center">
            <div className="dropdown">
                <form method="POST" className="signin-form" id="signin-form" >
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" name = "email" id="email" autoComplete ="off"
                            value = {user.email}
                            onChange = {handleInputs}
                            placeholder="email@example.com" 
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name = "password" id="password" autoComplete ="off"
                            value = {user.password}
                            onChange = {handleInputs}
                            placeholder="Password" 
                            />
                    </div>
                    {/* <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="dropdownCheck2" />
                        <label className="form-check-label" for="dropdownCheck2">
                            Remember me
                        </label>
                    </div> */}
                    <button type="submit" className="btn btn-primary" name = "Login" onClick={PostData}>
                        Log in</button>
                </form>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/signup">New around here? Sign up</a>
                {/* <a className="dropdown-item" >Forgot password?</a> */}
            </div>
            </div>
            </div>
        </div>
    )
}

export default Login
