import React, { useEffect, useState} from "react";
import {getCommunityMaps, getMapById, getMapByName, getWorldHistoryByUserId } from "./axios/axios";
import MapSelector from "./mapSelectors";
import { useNavigate } from "react-router-dom";
import CommunityMapTicker from "./communityTicker";
import CommunityMaps from "./communitymaps";

const HomePage = (props:any) => {

    const {user,setTutorialStep, worldHistory, setWorldHistory,setIsExpanded, setActiveTab,setTutorial} = props;

    const [communityMaps, setCommunityMaps] = useState([])
    const [currentCommunityMapIndex, setCurrentCommunityMapIndex] = useState(0)
    const [stopMapSwitching, setStopMapSwitching] = useState(false)

    let numberOfMapContainers = 5
    let mapContainers = []
    let tickers = []
    const navigate = useNavigate()
    

    useEffect(() => {

        const fetchData = async () => {
          if(!user) return
  
          setWorldHistory(await getWorldHistoryByUserId(user?.id))
          
        }
      
        fetchData()
      },[user])
      
    for (let i = 0; i < numberOfMapContainers;i++) {
      mapContainers.push(<MapSelector key={i} containerNumber={i} user={user} userWorlds={worldHistory} setIsExpanded={setIsExpanded} setActiveTab={setActiveTab} setTutorial={setTutorial} setTutorialStep={setTutorialStep}/>)
    }

    const goToAllMaps = () => {
      navigate('/allMaps')
    }

    return (
        <div className="homePage" id="homepage">
          <div>
          <CommunityMaps/>
          <h1 className="centered" id="recentMaps">Recent Maps</h1>
          <div className="mapSelectorContainer">
            {mapContainers}
          </div>
          </div>
        </div>
    )
}

export default HomePage