import React, { useState } from "react";
import { uploadIcon } from "./axios/axios";

const CreateIcon = (props:any) => {

    const {user, switchActiveTab} = props;

    const [icon, setIcon] = useState<any>('')
    const [file, setFile] = useState<any>()

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
        const formData = new FormData();
        formData.append('image',file)
        formData.append('userId', user.id)
        await uploadIcon(formData)
        switchActiveTab('library')
      }

    return (
        <form onSubmit={createNewIcon}>
          <h1>create a Icon</h1>
          <img className="preview" id='preview' src={icon} alt=""></img>
          <input 
            type='file'
            id="image-input" 
            accept="image/png, image/jpg" 
            ref={imageInput => makeRef(imageInput)}
            ></input>
          <button type='submit'></button>
        </form>
    )
}

export default CreateIcon;