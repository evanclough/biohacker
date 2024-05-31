import Compound from "./Compound";
import Compounds from "./Compounds";
import Protocol from "./Protocol";
import Protocols from "./Protocols";
import Users from "./Users";
import Profile from "./Profile";
import Landing from "./Landing";
import Header from "./Header";

function Biohacker({user, signOut, params}) {


    function renderTab(){
        switch(params.tab){
            case "compound":
                return <Compound params={params} user={user}/>
            case "compounds":
                return <Compounds params={params} user={user}/>
            case "protocol":
                return <Protocol params={params} user={user}/>
            case "protocols":
                return <Protocols params={params} user={user}/>
            case "users":
                return <Users params={params} user={user}/>
            case "user": 
                return <Profile params={params} user={user}/>
            case "landing":
                return <Landing params={params} user={user} />
            default:
                return <Landing params={params} user={user} />
        }
    }

    return (
        <>
            <Header user={user} signOut={signOut}/>
            {renderTab()}
        </>
    )
}

export default Biohacker;