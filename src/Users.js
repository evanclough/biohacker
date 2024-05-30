import React, { useState, useEffect } from "react";
import { get } from "aws-amplify/api";

import { NavLink } from "react-router-dom";

import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

function Users({params, user}) {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "users";
        getUsers();
    }, []);

    async function getUsers(){
        try {
            const restOperation = get({
                apiName: "users",
                path:"/getUsers"
            });
          
            const {body}= await restOperation.response;
            const response = await body.json();
            setUsers(response.Items);
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
                        {users.map((user, index) => (
                            <Card className="compound-card" key={index}>
                                <Card.Body className="compound-card-body">
                                    <h3><NavLink className = "lnk" to={"/users/" + user.id}>{user.username}</NavLink></h3>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
            }
        </div>
    )

}

export default Users;