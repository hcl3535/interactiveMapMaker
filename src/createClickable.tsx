import React, { useEffect, useState } from "react";

 
const CreateClickable = (props: any) => {

    const {currentMap, allMaps, updateMapDictionary, swapNewCity, switchActiveTab, user} = props;

    const [name, setName] = useState('')
    const [map, setMap] = useState<any>('')

    useEffect(()=>{
        console.log("change detected on create clickable", currentMap)
    },[currentMap])

    const createNewClickable = () => {
        console.log('createClickable',currentMap)
        const dragable:any = document.querySelector('.editing')
        let y = (Number(dragable.style.top.slice(0, -1)))
        let x = (Number(dragable.style.left.slice(0, -1)))
        
        const toAdd = {
            initialmap: false, 
            name: name, 
            mapurl: map, 
            icon: dragable.src, 
            iconx: x, 
            icony: y, 
            children:[], 
            userid: user.id
        }
        console.log(toAdd)
        // updateMapDictionary(toAdd, name)
        // dragable.classList.remove('editing')
        // let currentClickables = currentMap.clickables()
        // currentClickables.push(toAdd)
        // currentMap.clickables = function(){
        //     return currentClickables
        // }
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