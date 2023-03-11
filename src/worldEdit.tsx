import React, { useEffect, useState } from "react";
import { getAllUserWorlds } from "./axios/axios";

const WorldEdit = (props:any) => {

    const {user, swapCurrentMap} = props;

    const [userWorlds, setUserWorlds] = useState<any>()

    useEffect(() => {

        const fetchData = async () => {
          setUserWorlds(await getAllUserWorlds(user.id))
        }
      
        fetchData()
      },[])


    function changeWorld(e:any) {
        // console.log(e.target.value)
        // swapCurrentMap(e.target.value)
    }  

    return(
        <div>
          <label>current world</label>
          <select name="worlds" onChange={changeWorld}>
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