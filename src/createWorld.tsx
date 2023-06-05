import { NetworkManager } from "aws-sdk";
import React, { Children, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMap, getIconById } from "./axios/axios";

 
const CreateWorld = (props: any) => {

    const {currentMap, allMaps, updateMapDictionary, swapNewCity, switchActiveTab, user, setChildren,children, setCurrentMap,setActiveTab} = props;

    const [name, setName] = useState('')
    const [map, setMap] = useState<any>('')
    const [file, setFile] = useState<any>()

    const navigate = useNavigate()

    const createNewClickable = async () => {
        
        const toAdd = {
            initialmap: true, 
            name: name,
            icon: null, 
            iconx: null, 
            icony: null, 
            children:[], 
            userid: user.id
        }

        const formData = new FormData();
        formData.append('image',file)
        formData.append('fileProps',JSON.stringify(toAdd))
        
        const newMap = await createMap(formData, user.id)
    
        setActiveTab('library')
        navigate(`/map/${name}`)

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
        <div className="">
            <h1 className="">Create a World!</h1>
            <h1 className="">Name</h1>
            <input type='text' onChange={handleName}></input>
            <h1>map</h1>
            {map ?
              <img className="preview" src={map} alt=""></img>
              : <div className="preview-window flex vertical-centered">
                  <h2 className="">upload image</h2>
              </div>
            }
            <input className="upload-button" type='file' id="image-input" accept="image/png, image/jpg" ref={imageInput => makeRef(imageInput)}></input>
            <button type='submit' onClick={createNewClickable}>submit</button>
        </div>
    )
}

export default CreateWorld;