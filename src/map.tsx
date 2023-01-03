import React, { useState } from "react";

import city from './Photos/download__2_-removebg-preview (1).png'
import newMap from './Photos/9a395773c4b7be60643e352523f40596.jpg'

const Map: any = (props: any) => {

    const {currentMap, switchMaps, newCity } = props;

    const [currentlyEditing, setCurrentlyEditing] = useState(newCity)

    const container = document.querySelectorAll<HTMLElement>('.container')
    
    async function changeMap (clickedItem: any) {
      switchMaps(clickedItem)
    }

    const handleDragEnd = (e: any) => {
      const dragable:any = document.querySelector('.editing')
      dragable.classList.add('absolute')
      console.log(container[0].offsetWidth)
      let x = (100 * e.clientX) / container[0].offsetWidth
      console.log(x)
      let y = (100 * e.clientY / container[0].offsetHeight)
      console.log(y)
      dragable.style.left = `${x}%`
      dragable.style.top = `${y}%`
      container[0].appendChild(dragable)
    }



    return(
        <div className="container">
          <img 
            src={currentMap.map} 
            alt=""
            className="centered map "
          />
          <>{currentMap.clickables ? (
            currentMap.clickables().map((value: any, index: number) =>{
              return (<img 
                src={value.icon} 
                key={index}
                alt=""
                className='city'
                style={{top: `${value.iconLocation[1]}%`, left: `${value.iconLocation[0]}%`} }
                onClick={ () => changeMap(value)}
              />)
            })) : (null)
          }
          </>
          <>
          {
            newCity !== null ?
                <img
                  src={newCity.icon}
                  alt=''
                  className="editing"
                  onDragEnd={handleDragEnd}
                  >
                </img> :
                null
          }  
          </>
        </div>
    )
}

export default Map;