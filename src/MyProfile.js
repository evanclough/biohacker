import { useState, useEffect } from "react";
import { useLoaderData, NavLink, isRouteErrorResponse } from "react-router-dom";


import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Accordion  from "react-bootstrap/Accordion";

//display a logged in users profile
function MyProfile ({ details, error, isLoggedIn, loading }){

    return (
        <div>
            {
                loading ? 
                    <Spinner animation="border"/>
                :
                    (isLoggedIn ? 
                        <div className="profile-container">
                             <Card className = "profile-card">
                                <Card.Body>
                                    {error !== "" ? 
                                        <p>error loading your profile</p>    
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
                        <>Not logged in</>
                    )
                    
            }
        </div>
    )
}

export default MyProfile;