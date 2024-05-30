import Compound from "./Compound";
import Compounds from "./Compounds";
import Protocol from "./Protocol";
import Protocols from "./Protocols";
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
            default:
                return <></>
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