import React, {useState } from "react";
import {createMap, getIconById } from "./axios/axios";

 
const CreateClickable = (props: any) => {

    const {currentMap,setNewCityWidth, newCityWidth,setLoading, setNewCity,swapNewCity, switchActiveTab, user, setChildren,children,newCityLocation, currentlyEditing, setCurrentlyEditing, tutorialStep, setTutorialStep} = props;

    const [name, setName] = useState('')
    const [map, setMap] = useState<any>('')
    const [file, setFile] = useState<any>()
    const [width, setWidth] = useState(10)
    const [message, setMessage] = useState('')
    const [tooBig, setTooBig] = useState(false)

    const createNewClickable = async () => {
      
      if(!name || !map){
        setMessage('you must fill out all feilds')
        return
      }
      if(tooBig){
        console.log(tooBig)
        return
      }
    
      console.log('hello')

        const dragable:any = document.querySelector('.editing')
        let y = Number(newCityLocation.style.gridRowEnd)
        let x = Number(newCityLocation.style.gridColumnEnd)
        
        
        const toAdd = {
            initialmap: false, 
            name: name,
            icon: dragable.src, 
            iconx: x, 
            icony: y, 
            children:[], 
            userid: user.id,
            iconwidth: newCityWidth
        }
 
        const formData = new FormData();
        formData.append('image',file)
        formData.append('fileProps',JSON.stringify(toAdd))
        formData.append('currentMap',JSON.stringify(currentMap))

        console.log('should start loading')
        setLoading(true)
        const newMap = await createMap(formData, user.id)
        
        newMap.icon = await getIconById(newMap.icon)
        
        let newChildren = children;
        newChildren.push(newMap)
        setChildren(newChildren)
        
        dragable.classList.remove('editing')
        swapNewCity(null)
        switchActiveTab('library')
        setLoading(false)
        setNewCityWidth(10)
        if(tutorialStep === 5){
          setTutorialStep(tutorialStep + 1)
        }
    }

    const handleName = (e: any) => {
        setName(e.target.value)
    }

    const makeRef = (imageInput: HTMLInputElement | null) => {
      imageInput?.addEventListener('change',function () {
        const reader:any = new FileReader();
        reader.addEventListener('load', () => {
            setMap(reader.result)
        })
        if(imageInput?.files?.[0].size > 15000000){
          setMessage('file size must be smaller than 15mb')
          setTooBig(true)
        } else{
          setMessage('')
          setTooBig(false)
        }
        setFile(imageInput?.files?.[0])
        console.log(imageInput?.files?.[0].size)
        reader.readAsDataURL(imageInput?.files?.[0])

        
      })
      
    }

    const cancelCreateClickable = () => {
        setNewCity(null)
        switchActiveTab('library')
    }

    const decreeseIconSize = async () => {
        const currentEditingElement = document.querySelector<HTMLElement>('.currentlyEditing')!;
        let width: any = currentEditingElement.style.width
        width = width.slice(0,-1)
        width = Number(width)
        width--
        currentEditingElement.style.width = `${width}%`
        // setWidth(width)
        setNewCityWidth(width)
      }
  
      const increeseIconSize = async () => {
        const currentEditingElement = document.querySelector<HTMLElement>('.currentlyEditing')!;
        let width: any = currentEditingElement.style.width
        width = width.slice(0,-1)
        width = Number(width)
        width++
        currentEditingElement.style.width = `${width}%`
        // setWidth(width)
        setNewCityWidth(width)
      }
    

    return(
        <div className="column createClickable_container">
            <h1 className="">Add a clickable!</h1>
            <h1 className="">Name</h1>
            <input type='text' onChange={handleName}></input>
            <h1 className="">map</h1>
            {map ?
              <img className="preview" src={map} alt=""></img>
              : <div className="preview-window flex vertical-centered">
                  <h2 className="">upload image</h2>
              </div>
            }
            <input className="upload-button" type='file' id="image-input" accept="image/png, image/jpg" ref={imageInput => makeRef(imageInput)}></input>
            {/* <div onClick={decreeseIconSize}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
              </svg>
            </div>
            <div onClick={increeseIconSize}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
              </svg>
            </div> */}
            <h2 className="centered">
              {message}
            </h2>
            <button className="upload-button" type='submit' onClick={createNewClickable}>
                <div className="border">
                  <h2>submit</h2>
                </div>
            </button>
            <button className="upload-button" onClick={cancelCreateClickable}>
                <div className="border">
                    <h2>cancel</h2>
                </div>
            </button>
        </div>
    )
}

export default CreateClickable;