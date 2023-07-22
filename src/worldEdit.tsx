import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeCitySize, getAllUserWorlds, getMapByName, updateIfMapIsShared } from "./axios/axios";
import { getChildren } from "./helper";

const WorldEdit = (props:any) => {

    const {user,setNewCity,setMessage,currentMap, swapCurrentMap,setChildren, currentWorld, setEditMode, editMode,currentlyEditing, setCurrentlyEditing, tutorialStep, setTutorialStep } = props;

    const [userWorlds, setUserWorlds] = useState<any>()
    const [sharing, setSharing] = useState(currentWorld.communitymap)

    const navigate = useNavigate()

    useEffect(() => {

        const fetchData = async () => {
          setUserWorlds(await getAllUserWorlds(user.id))
          setEditMode(false)
        }
      
        setNewCity(null)
        setCurrentlyEditing(null)
        if(user){
          fetchData()
        }
      },[])


    async function changeWorld(e:any) {
        const map = await getMapByName(e.target.value, user.id)
        navigate(`/map/${map.name}`)
        swapCurrentMap(map)
        
        const children = await getChildren(map)
        setChildren(children)
    }  

    const toggleEditMode = (e:any) => {
      setEditMode(e.target.checked)
      if(tutorialStep === 11 || tutorialStep === 12){
        setTutorialStep(tutorialStep + 1)
      }
    }

    const toggleMapSharing = async (e:any) => {
      setSharing(e.target.checked)
      await updateIfMapIsShared(e.target.checked, currentWorld.id)
    }

    const decreeseIconSize = async () => {
      const currentEditingElement = document.querySelector<HTMLElement>('.currentlyEditing')!;
      let width: any = currentEditingElement.style.width
      console.log(currentEditingElement)
      width = width.slice(0,-1)
      width = Number(width)
      width--
      currentEditingElement.style.width = `${width}%`
      
      await changeCitySize(currentlyEditing, width)

      const copy = currentlyEditing
      copy.iconwidth = width
      setCurrentlyEditing(copy)
    }

    const increeseIconSize = async () => {
      const currentEditingElement = document.querySelector<HTMLElement>('.currentlyEditing')!;
      let width: any = currentEditingElement.style.width
      width = width.slice(0,-1)
      width = Number(width)
      width++
      currentEditingElement.style.width = `${width}%`
      
      await changeCitySize(currentlyEditing, width)

      const copy = currentlyEditing
      copy.iconwidth = width
      setCurrentlyEditing(copy)
    }


    const deleteWorld = async () => {
      setMessage('Are you sure you want to delete this world? This is permanate and will delete all the clickables on it.')
    }

    return(
        <div className="worldEdit">
          <h1 className="centered currentWorld">World Edit</h1>
          {user?.id === currentMap.userid ?
          <div className="editmodeContainer">
          <div className="worldSelectAndEditMode">
            <div className="world-select">
              {user?.id === currentMap.userid ?
              <div>
              <h2 className="centered">current world</h2>
              <select className="select-box" name="worlds" value={currentWorld.name} onChange={changeWorld}>
              <> {userWorlds?.map(function(map:any,index:any) {
                return (
                    <option value={map.name} key={index}>{map.name}</option>
                )
              })}
              </>
              </select>
              </div>
              : null  }
            </div>
          
          <div className="editmode">
          <div>
          <div >
            <h2 className="centered">edit mode</h2>
            <label className="switch centered">
              <input type="checkbox" className="centered" onClick={toggleEditMode}/>
              <span className="slider round centered"></span>
            </label>
            
            <h2 className="centered">share map</h2>
            <label className="switch centered">
              <input type="checkbox" className="centered" onChange={toggleMapSharing} checked={sharing}/>
              <span className="slider round centered"></span>
            </label>
            </div>
            
          </div>
          </div>
           </div>
           
          <div className="deleteWorldButtonContainer">
            <button className="deleteWorldButton" type='submit' onClick={deleteWorld}>
              <div className="border">
                <h2>Delete World</h2>
              </div>
            </button>
          </div>
          </div>
          :null }
          {editMode ?
          currentlyEditing ?
          <div>
            <h2>currenty editing</h2>
            <div className="preview-window flex vertical-centered">
              <img className="preview" src={currentlyEditing.icon.iconimageurl} alt=""></img>
            </div>
            <h2>change size</h2>
            <div onClick={decreeseIconSize}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
              </svg>
            </div>
            <div onClick={increeseIconSize}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
              </svg>
            </div>
          </div>
            : <div className="preview-window flex vertical-centered">
                <h2 className="">no city selected</h2>
            </div>
          :
          null}
          
        </div>
    )
}

export default WorldEdit;