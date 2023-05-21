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
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Login from './login';
import Register from './register';
import { getChildren } from './helper';
import HomePage from './homePage';
import AllMaps from './AllMaps';

function App() {

  const tokenFromStorage = localStorage.getItem('token');

  const [isExpanded, setIsExpanded] = useState(false)
  const [user, setUser] = useState()
  const [token, setToken] = useState(tokenFromStorage)
  const [newCity, setNewCity] = useState(null)
  const [activeTab, setActiveTab] = useState('worldEdit')
  
  const [currentWorld, setCurrentWorld] = useState()
  const [currentMap, setCurrentMap] = useState()
  const [children, setChildren] = useState<any>()
  const [worldHistory, setWorldHistory] = useState([])
  const [editmode, setEditMode] = useState(false)

  



  const toggle:React.FC = (toggle: any):any => {
    if(isExpanded) setIsExpanded(false)
    if(!isExpanded) setIsExpanded(true)
}

const openOptions:React.FC = ():any => {
  setIsExpanded(true)
  
}

useEffect(() => {
})




useEffect(() => {
  const getUserInfo = async () => {
    if(token){
      const userInfo = await getMe(token)
      setUser(userInfo)

      const worlds = await getAllUserWorlds(userInfo.id)
      setCurrentWorld(worlds[1])
      setCurrentMap(worlds[1])

      const children = await getChildren(worlds[1], userInfo)
      setChildren(children)
      
    }
  }

  getUserInfo()
},[token])

const swapNewCity:React.FC = (newCity: any):any => {
  setNewCity(newCity)
}

const swapCurrentMap:React.FC = (currentMap: any):any => {
  setCurrentMap(currentMap)
}

  return (
    <BrowserRouter>
      <ProfileInfo user={user} openOptions={openOptions} token={token}/>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} token={token}/>}/>
        <Route path="/register" element={<Register setToken={setToken}/>}/>
        <Route path="/map/:mapName" element={
          <div>
            <div className='App'>
              <MapSpace toggle={toggle} newCity={newCity} setNewCity={setNewCity} swapCurrentMap={swapCurrentMap} currentWorld={currentWorld} currentMap={currentMap} children={children} setCurrentMap={setCurrentMap} setChildren={setChildren} user={user} setCurrentWorld={setCurrentWorld} worldHistory={worldHistory} setWorldHistory={setWorldHistory} editMode={editmode} setEditMode={setEditMode}/>
              <div>
                {isExpanded ? <RightColumn swapNewCity={swapNewCity} currentMap={currentMap} setToken={setToken} token={token} setUser={setUser} user={user} swapCurrentMap={swapCurrentMap} setChildren={setChildren} children={children} currentWorld={currentWorld} setCurrentMap={setCurrentMap} setActiveTab={setActiveTab} activeTab={activeTab} setEditMode={setEditMode} editMode={editmode}/> : null}
              </div>
            </div>
          </div>
        }/>
        <Route path="/" element={<HomePage user={user} worldHistory={worldHistory} setWorldHistory={setWorldHistory} setIsExpanded={setIsExpanded} setActiveTab={setActiveTab}/>}/>
        <Route path="/allMaps" element={<AllMaps user={user} setActiveTab={setActiveTab} setIsExpanded={setIsExpanded}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
