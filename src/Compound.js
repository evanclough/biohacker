import { useState, useEffect } from "react";
import { useLoaderData, NavLink } from "react-router-dom";
import { get } from "aws-amplify/api";


import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Accordion  from "react-bootstrap/Accordion";

export function loader({ params }) {
    return {compoundId: params.compoundId};
}

//display compound
function Compound ({ params, user }){

    const {compoundId} = useLoaderData();


    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState({});

    useEffect(() => {
        getCompoundInfo();
    }, []);

    async function getCompoundInfo(){
        try {
            const restOperation = get({
                apiName: "compounds",
                path:"/getCompound",

                options: {
                    queryParams: {
                    id: compoundId
                    }
                }
            });
          
            const {body}= await restOperation.response;
            const response = await body.json();
            setDetails(response.Item);
            document.title = response.Item.name;
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
                    <div className="compound-container">
                            <Card className="compound-card">
                                <Card.Body className="compound-card-body">
                                    <h3>{details.name}</h3>
                                    <p><b>Summary: </b> {details.description.summary}</p>
                                    Tags: {details.tags.map((tag, tagIndex) => (
                                        <NavLink 
                                            to={"/tags/" + tag} 
                                            className="lnk" 
                                            key={tagIndex}
                                        >
                                            {tag +( tagIndex === details.tags.length - 1 ? "" : ", ")} 
                                        </NavLink>
                                    
                                    ))}
                                    {details.brandNames.length > 0 && 
                                        <>
                                            Brand Name{details.brandNames.length > 1 ? "s" : ""}: {details.brandNames.map((bn, bnIndex) => (
                                               <>{bn}{bnIndex === details.brandNames.length - 1 ? "" : ", "}</>
                                            ))}
                                        </>
                                    }
                                    {details.parents.length > 0 && 
                                        <>
                                            Parent Compound{details.parents.length > 1 ? "s" : ""}: {details.parents.map((parent, parentIndex) => (
                                                <><NavLink className="lnk" key={parentIndex} to={"/compounds/" + parent.id}>{parent.name}</NavLink>{parentIndex === details.parents.length - 1 ? "" : ", "}</>
                                            ))}
                                        </>
                                    }
                                    {details.children.length > 0 && 
                                        <>
                                            Children Compound{details.children.length > 1 ? "s" : ""}: {details.children.map((child, childIndex) => (
                                                <><NavLink className="lnk" key={childIndex} to={"/compounds/" + child.id}>{child.name}</NavLink>{childIndex === details.children.length - 1 ? "" : ", "}</>
                                            ))}
                                        </>
                                    }
                                    <hr/>
                                    <h4>Actions:</h4>
                                    {details.actions.length > 0 && 
                                        <Accordion >
                                            {details.actions.map((action, actionIndex) => (
                                                <Accordion.Item eventKey = {actionIndex} key={actionIndex}>
                                                    <Accordion.Header> 
                                                        {action.action} 
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <p>
                                                            {action.description}
                                                        </p>
                                                        <p>
                                                            Citations: {action.citations.map((cit, citIndex) => (
                                                                <>
                                                                    <a className="lnk" href={cit}>
                                                                        {"[" + citIndex + "]"}
                                                                    </a>
                                                                </>
                                                            ))}
                                                        </p>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            ))}
                                        </Accordion>
                                    }
                                    <hr/>
                                    <h4>Contraindications:</h4>
                                    {details.contraindications.length > 0 && 
                                        <Accordion >
                                            {details.contraindications.map((c, cIndex) => (
                                                <Accordion.Item eventKey = {cIndex} key={cIndex}>
                                                    <Accordion.Header> 
                                                        {c.name} 
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <p>
                                                            {c.description}
                                                        </p>
                                                        <p>
                                                            Citations: {c.citations.map((cit, citIndex) => (
                                                                <>
                                                                    <a className="lnk" href={cit}>
                                                                        {"[" + citIndex + "]"}
                                                                    </a>
                                                                </>
                                                            ))}
                                                        </p>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            ))}
                                        </Accordion>
                                    }
                                    <hr/>
                                    <h4>Genetic Factors:</h4>
                                    {details.genetics.length > 0 && 
                                        <Accordion >
                                            {details.genetics.map((g, gIndex) => (
                                                <Accordion.Item eventKey = {gIndex} key={gIndex}>
                                                    <Accordion.Header> 
                                                        {g.snp} 
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <p>
                                                            <b>{g.effects.name}:</b> {g.effects.description}
                                                        </p>
                                                        <p>
                                                            Citations: {g.effects.citations.map((cit, citIndex) => (
                                                                <>
                                                                    <a className="lnk" href={cit}>
                                                                        {"[" + citIndex + "]"}
                                                                    </a>
                                                                </>
                                                            ))}
                                                        </p>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            ))}
                                        </Accordion>
                                    }

                                </Card.Body>
                            </Card>
                    </div>
            }
        </div>
    )
}

export default Compound;