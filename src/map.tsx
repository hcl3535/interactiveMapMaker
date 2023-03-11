import React, { useEffect, useState } from "react";

const Map: any = (props: any) => {

    const {currentMap, switchMaps, newCity, mapDictionary, currentWorld ,children} = props;
    console.log(currentMap)

    const [currentlyEditing, setCurrentlyEditing] = useState(newCity)

    useEffect(() => {
      
    },[children])
    

    const container = document.querySelectorAll<HTMLElement>('.container')
    
    async function changeMap (clickedItem: any) {
      switchMaps(clickedItem)
    }

    const handleDragEnd = (e: any) => {
      const dragable:any = document.querySelector('.editing')
      dragable.classList.add('absolute')
      let x = (100 * e.clientX) / container[0].offsetWidth
      let y = (100 * e.clientY / container[0].offsetHeight)
      dragable.style.left = `${x}%`
      dragable.style.top = `${y}%`
      container[0].appendChild(dragable)
    }

    return(
        <div className="container">
          <img 
            src={currentMap?.mapurl} 
            alt=""
            className="centered map "
          />
          <>
          </>
          <>{children ? (
            children.map((value: any, index: number) => {
              return (<img 
                src={value.icon.iconimageurl} 
                key={index}
                alt=""
                className='city'
                style={{top: `${value.icony}%`, left: `${value.iconx}%`} }
                onClick={ () => changeMap(value)}
              />)
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