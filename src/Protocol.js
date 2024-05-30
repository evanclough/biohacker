import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

export function loader({ params }) {
    return {protocolId: params.protocolId};
}

function Protocol({params, user, signOut}){

    const {protocolId} = useLoaderData();

    return (
        <div>
            {protocolId}
        </div>
    )
}

export default Protocol