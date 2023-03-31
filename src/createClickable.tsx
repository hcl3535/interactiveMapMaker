import { NetworkManager } from "aws-sdk";
import React, { Children, useEffect, useState } from "react";
import { createMap, getIconById } from "./axios/axios";

 
const CreateClickable = (props: any) => {

    const {currentMap, allMaps, updateMapDictionary, swapNewCity, switchActiveTab, user, setChildren,children, setCurrentMap} = props;

    const [name, setName] = useState('')
    const [map, setMap] = useState<any>('')
    const [file, setFile] = useState<any>()

    const createNewClickable = async () => {

        const dragable:any = document.querySelector('.editing')
        let y = (Number(dragable.style.top.slice(0, -1)))
        let x = (Number(dragable.style.left.slice(0, -1)))
        
        
        const toAdd = {
            initialmap: false, 
            name: name,
            icon: dragable.src, 
            iconx: x, 
            icony: y, 
            children:[], 
            userid: user.id
        }
 
        console.log(currentMap)
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
    

    return(
        <div className="column">
            <h1 className="">Add a clickable!</h1>
            <h1 className="">Name</h1>
            <input type='text' onChange={handleName}></input>
            <h1>map</h1>
            <img className="preview" src={map}></img>
            <input type='file' id="image-input" accept="image/png, image/jpg" ref={imageInput => makeRef(imageInput)}></input>
            <button type='submit' onClick={createNewClickable}></button>
        </div>
    )
}

export default CreateClickable;