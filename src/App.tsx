import React, { useEffect, useState } from 'react';
import './App.css';
import MapSpace from './mapSpace.js';
import RightColumn from './rightColumn';
import ProfileInfo from './profileinfo';
import {getAllUserWorlds,getMe } from './axios/axios';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
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
  const [activeTab, setActiveTab] = useState('library')
  
  const [currentWorld, setCurrentWorld] = useState()
  const [currentMap, setCurrentMap] = useState()
  const [children, setChildren] = useState<any>()
  const [worldHistory, setWorldHistory] = useState([])
  const [editmode, setEditMode] = useState(false)
  const [newCityLocation, setNewCityLocation] = useState<any>(null)
  const [currentlyEditing, setCurrentlyEditing] = useState<any>(null)

  



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
      <ProfileInfo user={user} openOptions={openOptions} token={token} setNewCity={setNewCity} setActiveTab={setActiveTab} setEditMode={setEditMode}/>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} token={token}/>}/>
        <Route path="/register" element={<Register setToken={setToken}/>}/>
        <Route path="/map/:mapName" element={
          <div className='root'>
            <div className='App'>
              <MapSpace toggle={toggle} newCity={newCity} setNewCity={setNewCity} swapCurrentMap={swapCurrentMap} currentWorld={currentWorld} currentMap={currentMap} children={children} setCurrentMap={setCurrentMap} setChildren={setChildren} user={user} setCurrentWorld={setCurrentWorld} worldHistory={worldHistory} setWorldHistory={setWorldHistory} editMode={editmode} setEditMode={setEditMode} newCityLocation={newCityLocation} setNewCityLocation={setNewCityLocation} setCurrentlyEditing={setCurrentlyEditing} currentlyEditing={currentlyEditing}/>
              <div>
                {isExpanded ? <RightColumn swapNewCity={swapNewCity} setNewCity={setNewCity} currentMap={currentMap} setToken={setToken} token={token} setUser={setUser} user={user} swapCurrentMap={swapCurrentMap} setChildren={setChildren} children={children} currentWorld={currentWorld} setCurrentMap={setCurrentMap} setActiveTab={setActiveTab} activeTab={activeTab} setEditMode={setEditMode} editMode={editmode} newCityLocation={newCityLocation} currentlyEditing={currentlyEditing} setCurrentlyEditing={setCurrentlyEditing}/>  : null }
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
