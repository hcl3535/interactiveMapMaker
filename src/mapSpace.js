import React, { useEffect, useState } from "react";
import { getChildren} from "./helper";
import { useParams } from "react-router-dom";
import { getMapByName, getMapByNameTest } from "./axios/axios";
import Map from "./map";
import Loading from "./loading";
import Tutorial from "./tutorial";
import Message from "./Message";



export const MapSpace = (props) => { 

    const {toggle,loading,tutorial, iconToDelete,setTutorial, tutorialStep, setTutorialStep, newCity,newCityWidth, setNewCity,mapDictionary, currentWorld, currentMap, children, setCurrentMap,setChildren,user,setCurrentWorld, worldHistory, setWorldHistory, editMode, setEditMode, newCityLocation, setNewCityLocation, setCurrentlyEditing, currentlyEditing, message, setMessage} = props
    
    const [history, setHistory] = useState([currentWorld])
    const [isOwner, setIsOwner] = useState(false)
    const {mapName} = useParams();

    
    useEffect(() => {

      const fetchData = async () => {
        

        // if(mapName && user){
        // const map = await getMapByName(mapName, user.id)
        // setCurrentWorld(map)
        // setCurrentMap(map)
        // const children = await getChildren(map)
        // setChildren(children)
        // } else{
          const map = await getMapByNameTest(mapName)
          setCurrentWorld(map)
          setCurrentMap(map)
          const children = await getChildren(map)
          setChildren(children)
        // }
      }
    
      fetchData()
    },[user, mapName])
    

    const switchMaps = async (clicked, fromHistory) => {

        let tempHistory = history
        tempHistory.push(currentMap)
        setHistory(tempHistory)
        setCurrentMap(clicked)
        
        const children = await getChildren(clicked)
        setChildren(children)
        
    }

    const handleBackButton = async () => {
        if(history.length > 1){
        let tempHistory = history

        // const map = await getMapByName(tempHistory[tempHistory.length-1].name, user.id)
        const map = await getMapByNameTest(tempHistory[tempHistory.length-1].name)
        setCurrentMap(map)

        const newchildren = await getChildren(map, user)

        setChildren(newchildren)
        tempHistory.pop()
        setHistory(tempHistory)
        if(tutorialStep === 8){
          setTutorialStep(tutorialStep + 1)
        }
        }
    }

    const handleExpander = () => {
        toggle()
        if(tutorialStep === 9){
          setTutorialStep(tutorialStep + 1)
        }
    }
    
    const handleDragOver = (e) => {
      e.preventDefault()
    }

    const handleDrop = () => {
      setNewCityLocation("delete")
    }

    
    
    return(
        <div className="mapSpace-size">
          {loading ?
            <Loading/>
            : null
          }
          {message ?
            <Message message={message} iconToDelete={iconToDelete} setMessage={setMessage}/>
            : null
          }
          {
            tutorial ?
            <Tutorial setTutorial={setTutorial} tutorialStep={tutorialStep} setTutorialStep={setTutorialStep}/>
            : null
          }
          <div className="fadeingBetweenMaps"/>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-return-left back-arrow" viewBox="0 0 16 16" onClick={handleBackButton}>
            <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list expander" viewBox="0 0 16 16" onClick={handleExpander}>
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg>
          <Map currentMap={currentMap} switchMaps={switchMaps} newCity={newCity} setNewCity={setNewCity} mapDictionary={mapDictionary} currentWorld={currentWorld} children={children} worldHistory={worldHistory} setWorldHistory={setWorldHistory} user={user} editMode={editMode} setEditMode={setEditMode} newCityLocation={newCityLocation} setNewCityLocation={setNewCityLocation} setChildren={setChildren} setCurrentlyEditing={setCurrentlyEditing} currentlyEditing={currentlyEditing} newCityWidth={newCityWidth} tutorialStep={tutorialStep} setTutorialStep={setTutorialStep}/>
          {editMode ? 
          <div className="city-delete" onDrop={handleDrop} onDragOver={handleDragOver}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16" >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
            </svg> 
          </div>
            : null
          }
        </div> 
    )
}

export default MapSpace