
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMap} from "./axios/axios";

 
const CreateWorld = (props: any) => {

    const {user,setActiveTab, tutorialStep, setTutorialStep} = props;

    const [name, setName] = useState('')
    const [map, setMap] = useState<any>('')
    const [file, setFile] = useState<any>()
    const [message, setMessage] = useState('')
    const [tooBig, setTooBig] = useState(false)

    const navigate = useNavigate()

    const createNewClickable = async () => {

        if(!name || !map){
            setMessage('you must fill out all feilds')
            return
          }
          if(tooBig){
            console.log(tooBig)
            return
          }
        
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
        navigate(`/map/${newMap.id}`)
        if(tutorialStep === 1) setTutorialStep(tutorialStep + 1)

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
        reader.readAsDataURL(imageInput?.files?.[0])

        
      })
      
    }
    

    return(
        <div className="createWorld">
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
            <h2 className="centered">
              {message}
            </h2>
            <button type='submit' onClick={createNewClickable}>submit</button>
        </div>
    )
}

export default CreateWorld;