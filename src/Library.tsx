import React, { useEffect, useState } from "react";
import { getEffectiveConstraintOfTypeParameter } from "typescript";
import { deleteIcon, getIconsByUserId} from "./axios/axios";

const Library = (props: any) => {

    const {allMaps, swapNewCity, switchActiveTab, user} = props;

    const [AllIcons, setAllIcons] = useState([])
    
    const addCity = (key: any) => {
      switchActiveTab('addClickable')
      let newCity = {
        iconimageurl: key.iconimageurl,
        iconx: 1,
        icony: 1
      }
      
      swapNewCity(newCity)
    }

    const deleteCity = async (key:any) => {
      
      await deleteIcon(key.id)
    }

    const switchToCreateClickable = () => {
      switchActiveTab('createIcon')
    }

    useEffect(() => {

    const fetchData = async () => {
      const icons = await getIconsByUserId(user.id)
      setAllIcons(icons)
    }

    fetchData()
    },[])

    return(
      <div className="libraryContainer">
           <button className="createClickableButton" onClick={switchToCreateClickable}>
            <h3 className="createIconWords">Create a Icon</h3>
           </button>
            <> {AllIcons.map(function(key:any, index:any) {
              return(
                <div key={index} className="flex library-item">
                  <button className="add-button-size add-button" onClick={() => addCity(key)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                  </svg>
                  </button>
                    <img src={key.iconimageurl} alt='N/A' className='thumbnail'></img>
                
                  <button className="add-button-size delete-button " onClick={() => deleteCity(key)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </button>
                  
                </div>
              )
            })}
            </>
        </div>
    )
}

export default Library;
