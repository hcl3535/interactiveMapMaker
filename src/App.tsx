import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import Map from './map';
import './App.css';
import MapSpace from './mapSpace';
import LeftColumn from './leftColumn';
import RightColumn from './rightColumn';
import mapImg from "./Photos/worldMap.png"
import city from './Photos/city1Icon.png'
import newMap from './Photos/city1map.jpg'
import city2 from './Photos/city2Icon.png'
import cityMap2 from './Photos/city2Map.jpg'
import shop from './Photos/shopIcon.png'
import shopMap from './Photos/shopMap.png'

function App() {

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
  const [isExpanded, setIsExpanded] = useState(false)
  const [newCity, setNewCity] = useState(null)


  const toggle:React.FC = (toggle: any):any => {
    if(isExpanded) setIsExpanded(false)
    if(!isExpanded) setIsExpanded(true)
}

const swapNewCity:React.FC = (newCity: any):any => {
  setNewCity(newCity)
}

  return (
    <div className="App">
      <MapSpace toggle={toggle} newCity={newCity}/>
      <div>
      {isExpanded ? <RightColumn allMaps={allMaps} swapNewCity={swapNewCity}/> : null}
      </div>
    </div>
  );
}

export default App;
