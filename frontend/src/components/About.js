import React,{useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

const About = () => {
    const history  = useHistory();
    // const [userData, setUserData] = useState();

    const callAboutPage = async () => {
        try{
            console.log("control is here")
            const res = await fetch("/about", {
                method:"GET",
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                credentials:"include"
            });
            console.log("here")
            console.log("res   ",res)
            const data = await res.json();
            // console.log(data);
            // setUserData(data);

            if(!res.status === 200){
                const error = new Error (res.error);
                throw error;
            }
            
        }catch(err){
            console.log("err",err);
            history.push("/login") 
        }
    }
    
    useEffect(() => {  
        callAboutPage();
    },[]);

    
    return (
        <div>
            <p> WELCOME </p>
            <h1> About page hrer</h1>
        </div>
    )  
}

export default About
