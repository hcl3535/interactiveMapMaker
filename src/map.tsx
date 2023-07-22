import React, {useState } from "react";
import { updateUserWorldHistory } from "./axios/axios";
import Grid from "./grid";

const Map: any = (props: any) => {

    const {currentMap, newCityWidth, switchMaps, newCity, setNewCity, currentWorld ,children, setChildren,setWorldHistory, worldHistory,user, editMode, setEditMode , newCityLocation, setNewCityLocation, setCurrentlyEditing, currentlyEditing, tutorialStep, setTutorialStep,rerender} = props;

    // changing world history
    if(user?.id === currentMap?.userid){
      if(worldHistory){
      
    let historyIds = worldHistory.map((value:any) => {return value.id})
  
    if(historyIds[0] === currentWorld?.id || !currentWorld){
  
    } else {
     let temphistory = worldHistory
     temphistory = temphistory.map((value:any) => {
      return value.name
    })
    if(temphistory.includes(currentWorld.name)) {
       temphistory = temphistory.filter((name: any) => name !== currentWorld.name)
      }
     temphistory.unshift(currentWorld.name)
     if(temphistory.length > 10) temphistory.pop()

     updateUserWorldHistory(user.id, temphistory)
    }
  }
} 


    return(
      <div className="containers-container">
        <div className="container">
          <img 
            src={currentMap?.mapurl} 
            alt=""
            className="map"
          />
          <Grid children={children} setChildren={setChildren} switchMaps={switchMaps} newCity={newCity} setNewCity={setNewCity} editMode={editMode} setEditMode={setEditMode} newCityLocation={newCityLocation} setNewCityLocation={setNewCityLocation} currentMap={currentMap} user={user} setCurrentlyEditing={setCurrentlyEditing} currentlyEditing={currentlyEditing} newCityWidth={newCityWidth} tutorialStep={tutorialStep} setTutorialStep={setTutorialStep}/>
        </div>
      </div>
    )
}

export default Map;