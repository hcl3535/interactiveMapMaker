import React, { useEffect, useState } from "react";
import { updateCityIconLocation, updateUserWorldHistory } from "./axios/axios";
import { waitFor } from "@testing-library/react";
import Grid from "./grid";

const Map: any = (props: any) => {

    const {currentMap, switchMaps, newCity, setNewCity, currentWorld ,children, setChildren, worldHistory, setWorldHistory, user, editMode, setEditMode , newCityLocation, setNewCityLocation, setCurrentlyEditing, currentlyEditing} = props;

    const [grid, setGrid] = useState([])
    // const [newCityLocation, setNewCityLoaction] = useState({})
    
    const container = document.querySelectorAll<HTMLElement>('.container')
    const map = document.querySelectorAll<HTMLElement>('.map')
    const editables = document.querySelectorAll<HTMLElement>('.editing')

    // changing world history
      
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


    return(
      <div className="containers-container">
        <div className="container">
          <img 
            src={currentMap?.mapurl} 
            alt=""
            className="map"
          />
          <Grid children={children} setChildren={setChildren} switchMaps={switchMaps} newCity={newCity} setNewCity={setNewCity} editMode={editMode} setEditMode={setEditMode} newCityLocation={newCityLocation} setNewCityLocation={setNewCityLocation} currentMap={currentMap} user={user} setCurrentlyEditing={setCurrentlyEditing} currentlyEditing={currentlyEditing}/>
        </div>
      </div>
    )
}

export default Map;