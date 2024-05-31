
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";


import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Accordion  from "react-bootstrap/Accordion";

import MyProfile from "./MyProfile";

//display landing page, if logged in than users profile, otherwise other stuff
function Landing ({ params, user }){


    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {
        getMyProfileInfo();
    }, []);

    async function getMyProfileInfo(){
        document.title = "biohacker";
        if(user?.userId !== null){
            try {
                
                
                const {body}= await restOperation.response;
                const response = await body.json();
                console.log(response);
                
            } catch (e) {   
                console.log('get call failed: ', e);
            }
        }else{
            setIsLoggedIn(false);
        }
        
    }

    return (
        <div className = "landing-container">
            <h2>biohacker</h2>

            {isLoggedIn ? <>
                <h3>your profile</h3>
                <MyProfile details={details} error={error} isLoggedIn={isLoggedIn} loading={loading}/>
            </> : 
                <h2>not logged in - <NavLink to={"/login"}> log in or create an account</NavLink></h2>
            }
            
        </div>
    )
}

export default Landing;