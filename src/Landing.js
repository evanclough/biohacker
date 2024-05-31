
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { get } from "aws-amplify/api";


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
                const restOperation = get({
                    apiName: "users",
                    path:"/getUser",
                    options: {
                        queryParams: {
                            id: user.userId
                        }
                    }
                });
                
                const {body}= await restOperation.response;
                const response = await body.json();
                console.log(response);
                if(response.Item){
                    //fix ugly aws object format
                    setDetails({
                        id: response.Item.id.S,
                        name: response.Item.name.S,
                        username: response.Item.username.S,
                        tags: response.Item.tags.L.map(t => t.S),
                        verified: response.Item.verified.BOOL,
                        demographics: {
                            weight: response.Item.demographics.M?.weight?.N ?? -1,
                            height: response.Item.demographics.M?.height?.N ?? -1,
                            age: response.Item.demographics.M?.age?.N ?? -1
                        },
                        genetics: response.Item.genetics ? response.Item.genetics.L.map(g => {
                            return {
                                snp: g.M.snp.S,
                                bases: g.M.bases.L.map(b => b.S),
                                variant: g.M.variant.S
                            }
                        }) : []
                    });

                    setLoading(false);
                    setIsLoggedIn(true);
                }else {
                    setError("Profile not found");
                    setLoading(false);
                }
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