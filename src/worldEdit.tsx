import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUserWorlds, getMapByName } from "./axios/axios";
import { getChildren } from "./helper";

const WorldEdit = (props:any) => {

    const {user, swapCurrentMap,setChildren, currentWorld} = props;

    const [userWorlds, setUserWorlds] = useState<any>()

    const navigate = useNavigate()

    console.log(currentWorld)

    useEffect(() => {

        const fetchData = async () => {
          setUserWorlds(await getAllUserWorlds(user.id))
        }
      
        fetchData()
      },[])


    async function changeWorld(e:any) {
        const map = await getMapByName(e.target.value, user.id)
        navigate(`/map/${map.name}`)
        swapCurrentMap(map)
        console.log(map)
        console.log(user.id)
        const children = await getChildren(map, user)
        setChildren(children)
    }  

    return(
        <div>
          <label>current world</label>
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