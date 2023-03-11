import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import Map from './map';
import './App.css';
import MapSpace from './mapSpace.js';
import LeftColumn from './leftColumn';
import RightColumn from './rightColumn';
import mapImg from "./Photos/worldMap.png"
import city from './Photos/city1Icon.png'
import newMap from './Photos/city1map.jpg'
import city2 from './Photos/city2Icon.png'
import cityMap2 from './Photos/city2Map.jpg'
import shop from './Photos/shopIcon.png'
import shopMap from './Photos/shopMap.png'
import ProfileInfo from './profileinfo';
import { getAllUsers, getAllUserWorlds, getIconById, getMapByName, getMe } from './axios/axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login';
import Register from './register';
import { getChildren } from './helper';

function App() {

  let icons:any = {
    1: city,
    2: city2,
    3: shop
  }

  let allMaps:any = {
    worldMap: {
        icon: null,
        iconLocation: [0,0],
        map: mapImg,
        clickables: function(){
            return [allMaps.city1, allMaps.city2]
        }
    },
    city1: {
        icon: icons[1],
        iconLocation: [31,60],
        map: newMap,
        clickables: function() {
            return [allMaps.shop]
        }
    },
    city2: {
        icon: icons[2],
        iconLocation: [60,60],
        map: cityMap2,
        clickables: function() {
            return []
        }
    },
    shop: {
        icon: icons[3],
        iconLocation: [60,60],
        map: shopMap,
        clickables: function() {
            return []
        }
    },
  }

  const tokenFromStorage = localStorage.getItem('token');

  const [isExpanded, setIsExpanded] = useState(false)
  const [user, setUser] = useState()
  const [token, setToken] = useState(tokenFromStorage)
  const [newCity, setNewCity] = useState(null)
  const [mapDictionary, setMapDictionary] = useState(allMaps)
  
  const [currentWorld, setCurrentWorld] = useState()
  const [currentMap, setCurrentMap] = useState()
  const [children, setChildren] = useState<any>()



  const toggle:React.FC = (toggle: any):any => {
    if(isExpanded) setIsExpanded(false)
    if(!isExpanded) setIsExpanded(true)
}

const openOptions:React.FC = ():any => {
  setIsExpanded(true)
  
}




useEffect(() => {
  const getUserInfo = async () => {
    if(token){
      const userInfo = await getMe(token)
      setUser(userInfo)

      const worlds = await getAllUserWorlds(userInfo.id)
      setCurrentWorld(worlds[0])
      setCurrentMap(worlds[0])

      const children = await getChildren(worlds[0], userInfo)
    
      setChildren(children)
      
    }
  }

  getUserInfo()
},[token])

useEffect(() => {

  const fetchData = async () => {

  }

  fetchData()
},[])

const swapNewCity:React.FC = (newCity: any):any => {
  setNewCity(newCity)
}

const swapCurrentMap:React.FC = (currentMap: any):any => {
  setCurrentMap(currentMap)
  console.log(currentMap)
}

const updateMapDictionary:React.FC = (toAdd:any,name:any):any => {
  allMaps[name] = toAdd;
  setMapDictionary(allMaps)
}

  return (
    <BrowserRouter>
      <ProfileInfo user={user} openOptions={openOptions} token={token}/>
      <Routes>
        <Route path='/' element={
          <div>
            <div className='App'>
              <MapSpace toggle={toggle} newCity={newCity} swapCurrentMap={swapCurrentMap} mapDictionary={mapDictionary} currentWorld={currentWorld} currentMap={currentMap} children={children} setCurrentMap={setCurrentMap} setChildren={setChildren} user={user}/>
              <div>
                {isExpanded ? <RightColumn allMaps={mapDictionary} swapNewCity={swapNewCity} currentMap={currentMap} updateMapDictionary={updateMapDictionary} setToken={setToken} token={token} setUser={setUser} user={user} swapCurrentMap={swapCurrentMap}/> : null}
              </div>
            </div>
          </div>
        }/>
        <Route path="/login" element={<Login setToken={setToken} token={token}/>}/>
        <Route path="/register" element={<Register setToken={setToken}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
