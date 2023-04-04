import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUserWorlds, getMapByName } from "./axios/axios";
import { getChildren } from "./helper";

const WorldEdit = (props:any) => {

    const {user, swapCurrentMap,setChildren, currentWorld, setEditMode, editMode } = props;

    const [userWorlds, setUserWorlds] = useState<any>()

    const navigate = useNavigate()

    useEffect(() => {

        const fetchData = async () => {
          setUserWorlds(await getAllUserWorlds(user.id))
          setEditMode(false)
        }
      
        fetchData()
      },[])


    async function changeWorld(e:any) {
        const map = await getMapByName(e.target.value, user.id)
        navigate(`/map/${map.name}`)
        swapCurrentMap(map)
        
        const children = await getChildren(map, user)
        setChildren(children)
    }  

    const toggleEditMode = (e:any) => {
      setEditMode(e.target.checked)
    }

    return(
        <div>
          <div className="editmode">
            <h3>edit mode</h3>
            <label className="switch centered">
              <input type="checkbox" onClick={toggleEditMode}/>
              <span className="slider round"></span>
            </label>
          </div>
          <label className="centered">current world</label>
          <select name="worlds" value={currentWorld.name} onChange={changeWorld}>
            <> {userWorlds?.map(function(map:any,index:any) {
                return (
                    <option value={map.name} key={index}>{map.name}</option>
                )
            })}
            </>
          </select>
        </div>
    )
}

export default WorldEdit;