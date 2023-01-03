import React, { useState } from "react";
import Map from "./map";
import mapImg from "./Photos/worldMap.png"
import city from './Photos/city1Icon.png'
import newMap from './Photos/city1map.jpg'
import city2 from './Photos/city2Icon.png'
import cityMap2 from './Photos/city2Map.jpg'
import shop from './Photos/shopIcon.png'
import shopMap from './Photos/shopMap.png'



export const MapSpace = (props: any) => {

    const {toggle, newCity} = props
    
    let allMaps = {
        worldMap: {
            icon: null,
            iconLocation: [0,0],
            map: mapImg,
            clickables: function(){
                return [allMaps.city1, allMaps.city2]
            }
        },
        city1: {
            icon: city,
            iconLocation: [31,60],
            map: newMap,
            clickables: function() {
                return [allMaps.shop]
            }
        },
        city2: {
            icon: city2,
            iconLocation: [60,60],
            map: cityMap2,
            clickables: function() {
                return []
            }
        },
        shop: {
            icon: shop,
            iconLocation: [60,60],
            map: shopMap,
            clickables: function() {
                return []
            }
        },
    }

    const [currentMap, setCurrentMap] = useState(allMaps.worldMap)
    const [history, setHistory] = useState([allMaps.worldMap])
    

    

    const switchMaps:React.FC = (clicked: any, fromHistory: boolean):any => {

        let tempHistory = history
        tempHistory.push(currentMap)
        console.log(tempHistory)
        setHistory(tempHistory)
          
        setCurrentMap(clicked)
    }

    const handleBackButton = () => {
        if(history.length > 1){
        let tempHistory = history
        setCurrentMap(tempHistory[tempHistory.length-1])
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
          <Map currentMap={currentMap} switchMaps={switchMaps} newCity={newCity}/>
        </div> 
    )
}

export default MapSpace