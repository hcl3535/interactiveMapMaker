import React, { useEffect, useState } from "react";
import { getAllUserWorlds, getWorldHistoryByUserId } from "./axios/axios";
import MapSelector from "./mapSelectors";
import { useNavigate } from "react-router-dom";

const HomePage = (props:any) => {

    const {user, worldHistory, setWorldHistory,setIsExpanded, setActiveTab} = props;

    let numberOfMapContainers = 5
    let mapContainers = []
    const navigate = useNavigate()
    

    useEffect(() => {

        const fetchData = async () => {
          if(!user) return
  
          setWorldHistory(await getWorldHistoryByUserId(user?.id))
          
        }
      
        fetchData()
      },[user])
      


    for (let i = 0; i < numberOfMapContainers;i++) {
      mapContainers.push(<MapSelector key={i} containerNumber={i} user={user} userWorlds={worldHistory} setIsExpanded={setIsExpanded} setActiveTab={setActiveTab}/>)
    }

    const goToAllMaps = () => {
      navigate('/allMaps')
    }

    return (
        <div className="homePage">
          <h1 className="centered">Recent Maps</h1>
          <div className="mapSelectorContainer">
            {mapContainers}
          </div>
          <h1 className="allMapsButton" onClick={goToAllMaps}>all Maps</h1>
        </div>
    )
}

export default HomePage