import React from "react";
import scroll from './Photos/scroll-paper-clip-art-png-favpng-BXdFwnWdSVKHYrXpvU1bPLpN3-removebg-preview.png'
import { deleteCity } from "./helper";

const Message = (props:any) => {

    const {message,iconToDelete,setMessage} = props;

    const handleYesClick = () => {
      if(iconToDelete){
        deleteCity(iconToDelete)
        setMessage('')
      }
    }

    const handleNoClick = () => {
      setMessage('')
    }
  return(
    <div className="message">
        <img src={scroll} className="messageImg"/>
        <h1 className="messageMessage">{message}</h1>
        <div className="messageButtons">
        <button className="upload-button" type='submit' onClick={handleYesClick}>
            <div className="border">
              <h2>Yes</h2>
            </div>
          </button>
          <button className="upload-button" type='submit' onClick={handleNoClick}>
            <div className="border">
              <h2>NO</h2>
            </div>
          </button>
          </div>
    </div>
  )
}

export default Message