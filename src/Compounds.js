import { useState, useEffect } from "react";
import { get, post } from "aws-amplify/api";

import Spinner from 'react-bootstrap/Spinner';


//search compounds
function Compounds({params, user}) {

    const [compounds, setCompounds] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getCompounds();
    })

    async function getCompounds(){
        try {
            const restOperation = get({
                apiName: "compounds",
                path:"/getCompounds"
            });
          
            const {body}= await restOperation.response;
            const response = await body.json();
            setCompounds(response);
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
                    <div>
                        {compounds.map(compound => 
                            <div> 
                                {compound.toString()}
                            </div>
                        )}
                    </div>
            }

            browse compounds
        </div>
    )
}

export default Compounds;