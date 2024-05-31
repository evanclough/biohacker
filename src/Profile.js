import { useState, useEffect } from "react";
import { useLoaderData, NavLink } from "react-router-dom";


import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Accordion  from "react-bootstrap/Accordion";

export function loader({ params }) {
    return {userId: params.userId};
}


//display user profile if logged in, otherwise nothing
function Profile ({ params, user }){

    const {userId} = useLoaderData();

    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState({});

    const [error, setError] = useState("");

    useEffect(() => {
        getProfileInfo();
    }, []);

    async function getProfileInfo(){
        document.title = "biohacker";
        try {
            
            
            const {body}= await restOperation.response;
            const response = await body.json();
            console.log(response);
            
            setLoading(false);
        } catch (e) {   
            console.log('get call failed: ', e);
        }
    }

    return (
        <div>
            {
                loading ? 
                    <Spinner animation="border"/>
                :
                    (details ? 
                        <div className="profile-container">
                            <Card className = "profile-card">
                                <Card.Body>
                                    {error !== "" ? 
                                        <p>profile not found for userId {userId}</p>    
                                    :
                                    <>
                                        <h3>{details.name}</h3>
                                        <p>@{details.username}</p>
                                        {details.tags.length > 0 ? 
                                            <>
                                                Tags: {details.tags.map((tag, tagIndex) => (
                                                    tag + ( tagIndex === details.tags.length - 1 ? "" : ", ")
                                                ))}
                                            </>
                                        : 
                                            <>
                                                
                                            </>
                                        
                                        }
                                        <p><b>Verified Real Person:</b> {details.verified ? "Yes" : "No"}</p>
                                        <hr/>
                                        {(details.demographics.age !== -1 || details.demographics.weight !== -1 || details.demographics.height !== -1) && 
                                            <>
                                                <p><b>Shared Stats:</b> </p>
                                                {details.demographics.age !== -1 && <p><b>Age: </b> {details.demographics.age} </p>}
                                                {details.demographics.height !== -1 && <p><b>Height: </b> {details.demographics.height}cm </p>}
                                                {details.demographics.weight !== -1 && <p><b>Weight: </b> {details.demographics.weight}kg </p>}
                                            </>
                                        }
                                        {details.genetics.length > 0 && 
                                            <>
                                                <p><b>Shared SNPs:</b> </p>
                                                {details.demographics.genetics.map((snp, snpIndex) => (
                                                    <p key={snpIndex}><b>{snp.snp}:</b> {snp.bases.map((base, baseIndex) => ({base} + (baseIndex === 1 ? "" : " - ")))}{snp.variant !== "none" && ("Variant: " + snp.variant)}</p>
                                                ))}
                                            </>
                                        }
                                    </>
                                }
                                </Card.Body>
                            </Card>
                        </div>  
                        :
                        <></>
                    )
                    
            }
        </div>
    )
}

export default Profile;