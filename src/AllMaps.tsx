import React, { useEffect, useState } from "react";
import { getAllUserWorlds } from "./axios/axios";
import MapSelector from "./mapSelectors";
import recentMapBackground from "./Photos/recent map bac kground.png"

const AllMaps = (props:any) => {

    const {user, setIsExpanded, setActiveTab} = props;

    const [userWorlds, setUserWorlds] = useState([]);

    let mapContainers = [];

    useEffect( () => {

        const fetchData = async () => {
            setUserWorlds(await getAllUserWorlds(user?.id))
        }

        fetchData()
    },[user])

    if(userWorlds[0]){
    userWorlds.forEach((world, idx) => {
        mapContainers.push(<MapSelector key={idx} containerNumber={idx + 1} user={user} userWorlds={userWorlds} setIsExpanded={setIsExpanded} setActiveTab={setActiveTab} />)
    })
}

    return(
        <div className="allMaps">
            <div className="mapSelectorContainer">
            <h1 className="centered" id="recentMaps">All Maps</h1>
            <img
              src={recentMapBackground}
              alt=""
              className="allMapBackground"
              />
            <div className="mapSelectorCartHolderAllMap">
            {mapContainers}
            </div>
          </div>
        </div>
    )
}

export default AllMaps