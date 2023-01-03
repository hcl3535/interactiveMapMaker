import React, { useState } from "react";
 
const CreateClickable = () => {

    const [name, setName] = useState('')
    const [icon, setIcon] = useState()
    const [lat, setLat] = useState()
    const [lon, setLon] = useState()
    const [map, setMap] = useState()

    const createNewClickable = () => {
        console.log("clicked")
    }

    const handleName = (e: any) => {
        setName(e.target.value)
    }

    const handleLat = (e: any) => {
        setLat(e.target.value)
    }

    const handleLon = (e: any) => {
        setLon(e.target.value)
    }

    return(
        <div className="column">
            <h1 className="">Add a clickable!</h1>
            <h1 className="">Name</h1>
            <input type='text' onChange={handleName}></input>
            <h1>icon</h1>
            <input accept="image"></input>
            <h1>icon location</h1>
            <h3>lat</h3>
            <input type='number' onChange={handleLat}></input>
            <h3>lon</h3>
            <input type='number' onChange={handleLon}></input>
            <h1>map</h1>
            <input accept="image"></input>
            <h1>clickables</h1>
            <select id="cars" name="cars">
              <option value=""></option>
              <option value=""></option>
              <option value=""></option>
              <option value=""></option>
            </select>
            <button type='button' onClick={createNewClickable}></button>
        </div>
    )
}

export default CreateClickable;