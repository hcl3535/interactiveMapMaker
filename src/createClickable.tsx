import { NetworkManager } from "aws-sdk";
import React, { Children, useEffect, useState } from "react";
import { changeCitySize, createMap, getIconById } from "./axios/axios";

 
const CreateClickable = (props: any) => {

    const {currentMap, setNewCity, allMaps, updateMapDictionary, swapNewCity, switchActiveTab, user, setChildren,children, setCurrentMap, newCityLocation, currentlyEditing, setCurrentlyEditing} = props;

    const [name, setName] = useState('')
    const [map, setMap] = useState<any>('')
    const [file, setFile] = useState<any>()
    const [width, setWidth] = useState(10)

    const createNewClickable = async () => {

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
            iconwidth: width
        }
 
        const formData = new FormData();
        formData.append('image',file)
        formData.append('fileProps',JSON.stringify(toAdd))
        formData.append('currentMap',JSON.stringify(currentMap))

        const newMap = await createMap(formData, user.id)

        newMap.icon = await getIconById(newMap.icon)

        let newChildren = children;
        newChildren.push(newMap)
        setChildren(newChildren)

        dragable.classList.remove('editing')
        swapNewCity(null)
        switchActiveTab('library')

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
        
        setFile(imageInput?.files?.[0])
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
        console.log(currentEditingElement)
        width = width.slice(0,-1)
        width = Number(width)
        width--
        currentEditingElement.style.width = `${width}%`
        setWidth(width)

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
        setWidth(width)

        const copy = currentlyEditing
        copy.iconwidth = width
        setCurrentlyEditing(copy)
      }
    

    return(
        <div className="column">
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