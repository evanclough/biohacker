import { useState, useEffect } from "react";
import { get } from "aws-amplify/api";

import { NavLink } from "react-router-dom";

import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Button from "react-bootstrap/Button";

//search compounds
function Compounds({params, user}) {

    const [compounds, setCompounds] = useState([]);
    const [loading, setLoading] = useState(true);


    //TODO: being called twice
    useEffect(() => {
        document.title = "compounds"
        getCompounds();
    }, [])

    async function getCompounds(){
        try {
            const restOperation = get({
                apiName: "compounds",
                path:"/getCompounds"
            });
          
            const {body}= await restOperation.response;
            const response = await body.json();
            setCompounds(response.Items);
            setLoading(false);
        } catch (e) {
          console.log('get call failed: ', e);
        }
    }

    return (
        <div>
            {
                loading ? 
                    <Spinner className="mx-auto mt-4" animation="border"/>
                :
                    <div className="compounds-container">
                        {compounds.map((compound, index) => (
                            <Card className="compound-card" key={index}>
                                <Card.Body className="compound-card-body">
                                    <h3><NavLink className = "lnk" to={"/compounds/" + compound.id}>{compound.name}</NavLink></h3>
                                    Tags: {compound.tags.map((tag, tagIndex) => (
                                        <NavLink 
                                            to={"/tags/" + tag} 
                                            className="lnk" 
                                            key={tagIndex}
                                        >
                                            {tag +( tagIndex === compound.tags.length - 1 ? "" : ", ")} 
                                        </NavLink>
                                    ))}
                
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
            }
        </div>
    )
}

export default Compounds;