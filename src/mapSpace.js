import React, { useEffect, useState } from "react";
import Map from "./map";
import mapImg from "./Photos/worldMap.png"
import city from './Photos/city1Icon.png'
import newMap from './Photos/city1map.jpg'
import city2 from './Photos/city2Icon.png'
import cityMap2 from './Photos/city2Map.jpg'
import shop from './Photos/shopIcon.png'
import shopMap from './Photos/shopMap.png'
import { getChildren } from "./helper";
import { useParams } from "react-router-dom";
import { getMapByName } from "./axios/axios";



export const MapSpace = (props) => { 

    const {toggle, newCity, swapCurrentMap, mapDictionary, currentWorld, currentMap, children, setCurrentMap,setChildren,user,setCurrentWorld} = props
    
    const [history, setHistory] = useState([currentWorld])
    const {mapName} = useParams();
    
    useEffect(() => {

      const fetchData = async () => {
        if(mapName && user.id){
        const map = await getMapByName(mapName, user.id)
        setCurrentWorld(map)
        setCurrentMap(map)
        const children = await getChildren(map, user)
        setChildren(children)
        }
      }
    
      fetchData()
    },[user, mapName])
    

    const switchMaps= async (clicked, fromHistory) => {

        let tempHistory = history
        tempHistory.push(currentMap)
        setHistory(tempHistory)
        console.log(clicked)
        setCurrentMap(clicked)
        
        const children = await getChildren(clicked, user)
        console.log(children)
        setChildren(children)
        
    }

    const handleBackButton = async () => {
        if(history.length > 1){
        let tempHistory = history

        const map = await getMapByName(tempHistory[tempHistory.length-1].name, user.id)
        
        setCurrentMap(map)

        const newchildren = await getChildren(map, user)

        setChildren(newchildren)
        tempHistory.pop()
        setHistory(tempHistory)
        }
    }

    const handleExpander = () => {
        toggle()
    }

    
    
    return(
        <div className="mapSpace-size border">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-return-left back-arrow" viewBox="0 0 16 16" onClick={handleBackButton}>
            <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list expander" viewBox="0 0 16 16" onClick={handleExpander}>
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg>
          <Map currentMap={currentMap} switchMaps={switchMaps} newCity={newCity} mapDictionary={mapDictionary} currentWorld={currentWorld} children={children}/>
        </div> 
    )
}

export default MapSpace