import React, { useEffect, useState} from "react";
import {getCommunityMaps, getMapById, getMapByName, getWorldHistoryByUserId } from "./axios/axios";
import MapSelector from "./mapSelectors";
import { useNavigate } from "react-router-dom";
import CommunityMapTicker from "./communityTicker";

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

      useEffect(() => {

        const fetchData = async () => {

          const maps = await getCommunityMaps();
          
          setCommunityMaps(maps)
        }
      
        fetchData()
      },[])

      useEffect(() => {
  
        const intreval = setInterval(() =>{
          if(currentCommunityMapIndex === communityMaps.length - 1){
            setCurrentCommunityMapIndex(0)
            return
          }
          setCurrentCommunityMapIndex(currentCommunityMapIndex + 1)
        }, 5000)

        return() => clearInterval(intreval)

      },[currentCommunityMapIndex])
      


    for (let i = 0; i < numberOfMapContainers;i++) {
      mapContainers.push(<MapSelector key={i} containerNumber={i} user={user} userWorlds={worldHistory} setIsExpanded={setIsExpanded} setActiveTab={setActiveTab} setTutorial={setTutorial} setTutorialStep={setTutorialStep}/>)
    }

    const goToAllMaps = () => {
      navigate('/allMaps')
    }

    const goToClickedWorld = (map) => {
      navigate(`/map/${map.name}`)
    }

    const incrementComunityMapIndex = () => {

      if(currentCommunityMapIndex === communityMaps.length -1){
        setCurrentCommunityMapIndex(0)
        return
      }

      setCurrentCommunityMapIndex(currentCommunityMapIndex + 1)
    }

    const decrementComunityMapIndex = () => {
    
      if(currentCommunityMapIndex === 0){
        setCurrentCommunityMapIndex(communityMaps.length - 1)
        return
      }

      setCurrentCommunityMapIndex(currentCommunityMapIndex - 1)
    }

    for(const idx in communityMaps){
      tickers.push(<CommunityMapTicker currentCommunityMapIndex={currentCommunityMapIndex} tickerIdx={Number(idx)}/>)
    }

    return (
        <div className="homePage">
          {communityMaps[currentCommunityMapIndex] ?
          <div>
            <h1 className="centered">Community Maps</h1> 
            <div className="communityMapsContainer flex">
            <button className="communityMapButton" type='submit' onClick={decrementComunityMapIndex}>
              <div className="">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
              </div>
            </button>
            <div className="communityMapHolder">
              <img
                className="communityMap"
                src={communityMaps[currentCommunityMapIndex].mapurl}
                onClick={() => {goToClickedWorld(communityMaps[currentCommunityMapIndex])}}
                onMouseEnter={() => {setStopMapSwitching(true)}}
                onMouseLeave={() => {setStopMapSwitching(false)}}
              />
              <div className="tickerBox">
                {tickers}
              </div>
            </div>
              <button className="communityMapButton" type='submit' onClick={incrementComunityMapIndex}>
            <div className="">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
              </svg>
            </div>
          </button>
              </div>
          </div>
          : null
          }
          <h1 className="centered">Recent Maps</h1>
          <div className="mapSelectorContainer">
            {mapContainers}
          </div>
          {user ?
          <h1 className="allMapsButton" onClick={goToAllMaps}>all Maps</h1>
          : null
          }
        </div>
    )
}

export default HomePage