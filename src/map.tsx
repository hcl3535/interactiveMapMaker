import React, { useEffect, useState } from "react";
import { updateCityIconLocation, updateUserWorldHistory } from "./axios/axios";
import { waitFor } from "@testing-library/react";

const Map: any = (props: any) => {

    const {currentMap, switchMaps, newCity, setNewCity, currentWorld ,children, worldHistory, setWorldHistory, user, editMode, setEditMode} = props;

    const [grid, setGrid] = useState([])
    const [newCityLocation, setNewCityLoaction] = useState({})
    
    const container = document.querySelectorAll<HTMLElement>('.container')
    const map = document.querySelectorAll<HTMLElement>('.map')
    const editables = document.querySelectorAll<HTMLElement>('.editing')

    
    
    //creates and adds grid on first load
    useEffect(() => {

    let grid:any = []
    
    for(let row = 1; row < 25; row++){
      for(let col = 1;col < 25; col++) {
        const newDiv = document.createElement('div')
        newDiv.classList.add('grid')
        newDiv.style.gridArea = `${col}/${row}/${col}/${row}`;
        const container = document.querySelectorAll<HTMLElement>('.container')
        container[0]?.appendChild(newDiv)
        grid.push({position: [row,col], reference: newDiv})
      }
    }
  
    setGrid(grid)
    },[])

    //destroys current citys then creates and places new ones
    useEffect(() => {

      if(children){
        grid.forEach((cell, i) => {
          if(cell.reference.children.length > 0){
            cell.reference.removeChild(cell.reference.children[0])
          }
        })
        
        for(const child of children){
          const location = [child.iconx, child.icony]
  
          let city = document.createElement('img')
          if(!editMode){
            city.src = child.icon.iconimageurl
            city.classList.add('city')
            city.onclick = (e) => changeMap(child,e)
          } else {
            city.src = child.icon.iconimageurl
            city.classList.add('city')
            city.classList.add('editing')
            city.ondragend = (e) => handleDragEnd(child, e)
            city.ondragstart = (e) => handleDragStart(child, e)
          }
          
          for(const cell of grid){
            if(cell.position.toString() === location.toString()){
              cell.reference.appendChild(city)
            }
          }
        }
      }
    },[children,editMode])
    
    async function changeMap (clickedItem: any, e:any) {
      console.log(clickedItem)
        switchMaps(clickedItem)
    }

    const dragOver = (e: any) => {
      e.preventDefault();
    }

    const dragDrop = (e: any) => {
      e.preventDefault();
      console.log(e.target)
      setNewCityLoaction(e.target)
    }

    

    //adds eventlisteners for drop points
    const handleDragStart = (child, e) => {
      for(const cell of grid){
        cell.reference.addEventListener('dragover', dragOver)
        cell.reference.addEventListener('drop', dragDrop)
      }
    }


    const getnewCityLocation = () => {
      console.log(newCityLocation)
      return newCityLocation
    }

    //removes events for drop points
    const handleDragEnd = (city:any,e: any) => {

      // const dragable = e.target
      const newCityLocation = getnewCityLocation()
      console.log(newCityLocation)

      for(const cell of grid){
        cell.reference.removeEventListener('dragover', dragOver)
        cell.reference.removeEventListener('drop', dragDrop)
      }

      for(const cell of grid){
        if(cell.reference === newCityLocation){
          console.log(cell)
          console.log(city)
          let newCity = document.createElement('img')
          newCity.src = city
          newCity.classList.add('city')
          newCity.classList.add('editing')
          cell.reference.appendChild(newCity)
          newCity.ondragend = (e) => handleDragEnd(null, e)
          newCity.ondragstart = (e) => handleDragStart(null, e)
          setNewCity(null)
        }
      }

  
      

      // dragable.classList.add('absolute')

      // let x = (100 * e.clientX ) / map[0].clientWidth
      // let y = (100 * e.clientY) / map[0].clientHeight
    
      // dragable.style.left = `${x}%`
      // dragable.style.top = `${y}%`
      // container[0].appendChild(dragable)

      // if(editMode){
      //   city.iconx = x
      //   city.icony = y
      //   updateCityIconLocation(city)
      // }
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
          {
            newCity !== null ?
                <img
                  src={newCity}
                  alt=''
                  className="editing"
                  onDragStart={(e) => handleDragStart(null,e)}
                  onDragEnd={(e) => handleDragEnd(newCity, e)}
                  onDragOver={(e) => dragOver(e)}
                  >
                </img> :
                null
          }  
          </>
        </div>
    )
}

export default Map;