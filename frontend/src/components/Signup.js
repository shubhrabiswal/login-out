import React, {useState} from 'react';
import 'react-dom';
import {NavLink, useHistory} from 'react-router-dom';
import 'react-router';


const Signup = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        name:"",email:"",phone:"",work:"",password:"",cpassword:""//,role,""
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
    console.log(user);
    const PostData = async (e) => {
        e.preventDefault();

        const {name, email, phone, work, password, cpassword} = user;

        const res = await fetch("/signup",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name: name, 
                email: email, 
                phone: phone, 
                work: work, 
                password: password,
                cpassword: cpassword,
                // role:role
            })
        })
        console.log("res", res);
        const data = await res.json();
        console.log("data",data)
        if(res.status === 422 || !data){
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        }else{
            window.alert("Registration Successful");
            console.log("Registration Successful");

            history.push("/login");
        }

    }

    return (
        <>
            <div className = "container" >
            <div className="row row-cols-lg-8 row-cols-sm-2 row-cols-md-8  justify-content-center">
            <div className="dropdown">
                <form method="POST" className="signup-form" id = "signup-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" name = "name" id="name" autoComplete ="off"
                            value = {user.name}
                            onChange = {handleInputs}
                            placeholder="Name" 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" name = "email" id="email" autoComplete ="off"
                            value = {user.email}
                            onChange = {handleInputs}
                            placeholder="email@example.com" 
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>   
                        <input type="number" className="form-control" name = "phone" id="phone" autoComplete ="off"
                            value = {user.phoneno}
                            onChange = {handleInputs}
                            placeholder="" 
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="work">Work</label>
                        <input type="text" className="form-control" name = "work" id="work" autoComplete ="off"
                            value = {user.work}
                            onChange = {handleInputs}
                            placeholder="work" 
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
                    <div className="form-group">
                        <label htmlFor="cpassword">Confirm Password</label>
                        <input type="password" className="form-control" name = "cpassword" id="cpassword" autoComplete ="off"
                            value = {user.cpassword}
                            onChange = {handleInputs}
                            placeholder="Confirm Password" 
                            />
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <input type="role" className="form-control" name = "role" id="role" autoComplete ="off"
                            value = {user.role}
                            onChange = {handleInputs}
                            placeholder="Role" 
                            />
                    </div> */}
                    {/* <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="dropdownCheck2" />
                        <label className="form-check-label" for="dropdownCheck2">
                            Remember me
                        </label>
                    </div> */}
                    <button type="submit" className="btn btn-primary" name = "Signup" onClick={PostData}>
                        Sign up</button>
                </form>
                <div className="dropdown-divider"></div>
                {/* <p>Already registered?</p> */}
                {/* <button type="submit" className="btn btn-primary" href="/login">Log in</button> */}
                <a className="dropdown-item" href="/login">Already registered? Log in</a>
            </div>
            </div>
            </div>
        </>
    )
}

export default Signup
