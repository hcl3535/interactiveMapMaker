import React from "react";
import { useNavigate } from "react-router-dom";
import scroll from './Photos/scroll-paper-clip-art-png-favpng-BXdFwnWdSVKHYrXpvU1bPLpN3-removebg-preview.png'
import { deleteCity, deleteWorld } from "./helper";

const Message = (props:any) => {

    const {message,children,allIcons,setAllIcons,setChildren,iconToDelete,setMessage,setLoading,setRerender,currentWorld} = props;

    const navigate = useNavigate()

    const handleYesClick = async() => {
      if(iconToDelete){
        await deleteCity(iconToDelete)
        setLoading(false)
        setMessage('')
        console.log(iconToDelete)
        console.log(allIcons)

        const newIcons = allIcons.filter(icon => icon.iconimageurl !== iconToDelete.iconimageurl);
        setAllIcons(newIcons)

        const newChildren = children.filter(child => child.icon.iconimageurl !== iconToDelete.iconimageurl);
        setChildren(newChildren)
        
      }
      if(message === 'Are you sure you want to delete this world? This is permanate and will delete all the clickables on it.'){
        await deleteWorld(currentWorld)
        setMessage('')
        navigate('/')
      }
    }

    const handleNoClick = () => {
        setLoading(false)
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