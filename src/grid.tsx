import { match } from "assert";
import React, { useEffect, useState} from "react";
import { deleteCity, removeChild, updateCityIconLocation } from "./axios/axios";
import { getChildren } from "./helper";
import { concurrently } from "concurrently";

const Grid = (props:any) => {
    
    const {children, setChildren,user, switchMaps,newCity,setNewCity,editMode, setEditMode, newCityLocation, setNewCityLocation, currentMap, setCurrentlyEditing, currentlyEditing} = props

    const [grid, setGrid] = useState([])
    // const [newCityLocation, setNewCityLoaction] = useState<any>(null)
    const [rerender, setRerender] = useState(false)


    // creates grid on first load
    useEffect(() => {

    let grid:any = []
    
    for(let row = 1; row < 25; row++){
      for(let col = 1;col < 25; col++) {
        grid.push({location: [row,col]})
      }
    }
  
    setGrid(grid)
    },[])

    useEffect(() => {
      setRerender(false)
      },[rerender])


    async function changeMap (clickedItem: any) {
      if(!editMode){
      switchMaps(clickedItem)
      } else {
        
        setCurrentlyEditing(clickedItem)
      }
    }

    const dragOver = (e: any) => {
      e.preventDefault();
    }

    const onDrop = (e) => {
      e.preventDefault();
      setNewCityLocation(e.target)
    }

    const handleDragStart = (e) => {
      
      const img = e.target
      
      e.dataTransfer.setDragImage(img,10,10);
    }

    const handleDragEnd = async (city, e) => {
    
      if(editMode){

        setCurrentlyEditing(city)

        if(newCityLocation === 'delete'){

          await deleteCity(city)
          const map = await removeChild(currentMap,city)
        
          const children = await getChildren(map,user)
          setChildren(children)
          return
        } 
        if(newCityLocation.className === 'grid'){

          city.iconx = Number(newCityLocation.style.gridColumnEnd)
          city.icony = Number(newCityLocation.style.gridRowEnd)
          await updateCityIconLocation(city)
          setRerender(true)

        }
      }
    }

    const handleDragEndNewCity = async (newCity, e) => {

      if(newCityLocation.className === 'grid'){
      
      
      newCity.iconx = Number(newCityLocation.style.gridColumnEnd)
      newCity.icony = Number(newCityLocation.style.gridRowEnd)
      
      setNewCity(newCity)
      setRerender(true)
      
      }
    }


    
    return (
      <>
        <>
          {grid.map((element, index) => {
            const row = element.location[0];
            const col = element.location[1];

            if(newCity){
              if([newCity.iconx, newCity.icony].toString() === [row,col].toString()){
                return(<div
                  className="grid"
                  style={{ gridArea: `${col}/${row}/${col}/${row}` }}
                  key={index} 
                  onDrop={onDrop}
                  onDragOver={dragOver}
                >
                  <img
                    src={newCity.iconimageurl}
                    alt=''
                    className="editing newCity currentlyEditing"
                    style={{width:`15%`}}
                    onDragStart={(e) => handleDragStart(e)}
                    onDragEnd={ (e) => handleDragEndNewCity(newCity,e)}
                  >
                  </img>
                </div>)
              }
            }
            
            // Check if children is defined and an array
            if (children && Array.isArray(children)) {
              
              const matchedChild = children.find(
                (child) => child.iconx === row && child.icony === col
              );
      
              
              if (matchedChild) {
                console.log(matchedChild)
                if(editMode){
                  if(matchedChild.name === currentlyEditing?.name){
                    return (
                      <div
                        className="grid"
                        style={{ gridArea: `${col}/${row}/${col}/${row}` }}
                        key={index} 
                        onDrop={onDrop}
                        onDragOver={dragOver}
                      >
                        <img
                          src={matchedChild.icon.iconimageurl}
                          className="city editing currentlyEditing"
                          key={index}
                          style={{width:`${matchedChild.iconwidth}%`}}
                          onClick={ () => changeMap(matchedChild)}
                          onDragStart={(e) => handleDragStart(e)}
                          onDragEnd={ (e) => handleDragEnd(matchedChild,e)}
                        />
                      </div>
                    );
                  } else{
                  return (
                    <div
                      className="grid"
                      style={{ gridArea: `${col}/${row}/${col}/${row}` }}
                      key={index} 
                      onDrop={onDrop}
                      onDragOver={dragOver}
                    >
                      <img
                        src={matchedChild.icon.iconimageurl}
                        className="city editing"
                        key={index}
                        style={{width:`${matchedChild.iconwidth}%`}}
                        onClick={ () => changeMap(matchedChild)}
                        onDragStart={(e) => handleDragStart(e)}
                        onDragEnd={ (e) => handleDragEnd(matchedChild,e)}
                      />
                    </div>
                  );
                  }
                }else{
                  
                return (
                  <div
                    className="grid"
                    style={{ gridArea: `${col}/${row}/${col}/${row}` }}
                    key={index} 
                    onDrop={onDrop}
                    onDragOver={dragOver}
                  >
                    <img
                      src={matchedChild.icon.iconimageurl}
                      className="city"
                      key={index}
                      style={{width:`${matchedChild.iconwidth}%`}}
                      onClick={ () => changeMap(matchedChild)}
                      onDragEnd={ (e) => handleDragEnd(matchedChild,e)}
                    />
                  </div>
                );
                }
              }
            }
      
            return (
              <div
                className="grid"
                style={{ gridArea: `${col}/${row}/${col}/${row}` }}
                key={index}
                onDrop={onDrop}
                onDragOver={dragOver}
              ></div>
            );
          })}
        </>
        </>
      );
}

export default Grid