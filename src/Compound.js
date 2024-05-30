import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

export function loader({ params }) {
    return {compoundId: params.compoundId};
}

//display compound
function Compound ({ params, user }){

    const {compoundId} = useLoaderData();

    const [details, setDetails] = useState({});

    useEffect(() => {console.log(params)}, []);

    return (
        <div>{compoundId}</div>
    )
}

export default Compound;