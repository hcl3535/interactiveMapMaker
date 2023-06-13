import React, { useState } from "react";
import { uploadIcon } from "./axios/axios";

const CreateIcon = (props:any) => {

    const {user, switchActiveTab,setLoading} = props;

    const [icon, setIcon] = useState<any>('')
    const [file, setFile] = useState<any>()
    const [message, setMessage] = useState('')

    const makeRef = (imageInput: HTMLInputElement | null) => {
        imageInput?.addEventListener('change',function () {
          const reader:any = new FileReader();
          reader.addEventListener('load', () => {
              
              setIcon(reader.result)
          })
          setFile(imageInput?.files?.[0])
          reader.readAsDataURL(imageInput?.files?.[0])
          
        })
        
      }

      const createNewIcon = async (event:any) => {
        event.preventDefault()

        if(!icon){
          setMessage('you must fill out all feilds')
          return
        }

        const formData = new FormData();
        formData.append('image',file)
        formData.append('userId', user.id)
        
        setLoading(true)
        await uploadIcon(formData)
        
        switchActiveTab('library')
        setLoading(false)
      }

      const cancelCreatIcon = () => {
        switchActiveTab('library')
      }

    return (
        <form onSubmit={createNewIcon}>
          <h1>create a Icon</h1>
          {icon ?
              <img className="preview" src={icon} alt=""></img>
              : <div className="preview-window flex vertical-centered">
                  <h2 className="">upload image</h2>
              </div>
            }
          <input 
            type='file'
            id="image-input" 
            accept="image/png, image/jpg" 
            ref={imageInput => makeRef(imageInput)}
          ></input>
          <h2>
            {message}
          </h2>
          <button className="upload-button" type='submit'>
            <div className="border">
              <h2>submit</h2>
            </div>
          </button>
          <button className="upload-button" type='submit' onClick={cancelCreatIcon}>
            <div className="border">
              <h2>cancel</h2>
            </div>
          </button>
        </form>
    )
}

export default CreateIcon;