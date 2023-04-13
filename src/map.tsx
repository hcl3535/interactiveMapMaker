import React, { useEffect, useState } from "react";
import { updateCityIconLocation, updateUserWorldHistory } from "./axios/axios";

const Map: any = (props: any) => {

    const {currentMap, switchMaps, newCity, currentWorld ,children, worldHistory, setWorldHistory, user, editMode, setEditMode} = props;

    const [currentlyEditing, setCurrentlyEditing] = useState(newCity)
    

    const container = document.querySelectorAll<HTMLElement>('.container')
    const map = document.querySelectorAll<HTMLElement>('.map')
    const editables = document.querySelectorAll<HTMLElement>('.editing')
    editables.forEach((city) => {
      city.classList.remove('editing')
    })
    
    async function changeMap (clickedItem: any, e:any) {
        switchMaps(clickedItem)
    }

    const handleDragEnd = (city:any,e: any) => {

      const dragable = e.target
      
      dragable.classList.add('absolute')
      console.log(e)

      let x = e.clientX
      let y = e.clientY
      
      
      

  
      
      
      

      console.log(x,y)
      dragable.style.left = `${x}px`
      dragable.style.top = `${y}px`
      container[0].appendChild(dragable)

      if(editMode){
        city.iconx = x
        city.icony = y
        updateCityIconLocation(city)
      }
    }

    //changing world history
    
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
    
    return(
        <div className="container">
          <img 
            src={currentMap?.mapurl} 
            alt=""
            className="map"
          />
          <>
          </>
          <>{children ? (
            children.map((value: any, index: number) => {
              if(!editMode){
              return (<img 
                src={value.icon.iconimageurl} 
                key={index}
                alt=""
                className='city' 
                style={{top: `${value.icony}%`, left: `${value.iconx}%`} }
                onClick={ (e) => changeMap(value, e)}
              />)
              }else{
                return (<img 
                  src={value.icon.iconimageurl} 
                  key={index}
                  alt=""
                  className='city editing' 
                  style={{top: `${value.icony}%`, left: `${value.iconx}%`} }
                  onDragEnd={(e) => handleDragEnd(value, e)}
                />)
              }
            })) : (null)
          }
          </>
          <>
          {
            newCity !== null ?
                <img
                  src={newCity}
                  alt=''
                  className="editing"
                  onDragEnd={(e) => handleDragEnd(null, e)}
                  >
                </img> :
                null
          }  
          </>
        </div>
    )
}

export default Map;