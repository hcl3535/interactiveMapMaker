import React, { useEffect, useState } from "react";
import { getAllUserWorlds } from "./axios/axios";
import MapSelector from "./mapSelectors";

const AllMaps = (props:any) => {

    const {user, setIsExpanded, setActiveTab} = props;

    const [userWorlds, setUserWorlds] = useState([]);

    useEffect( () => {

        const fetchData = async () => {
            console.log(user?.id)
            setUserWorlds(await getAllUserWorlds(user?.id))
        }

        fetchData()
    },[user])

    return(
        <div className="homePage">
            <h1>All Maps</h1>
            <div className="mapSelectorContainer">
        {userWorlds?
        userWorlds.map((value:any, key:any) => {return(
            <MapSelector key={key} user={user} setIsExpanded={setIsExpanded} setActiveTab={setActiveTab} userWorlds={userWorlds} containerNumber={key + 1}/>
        )}):
        <></>}
          </div>
        </div>
    )
}

export default AllMaps