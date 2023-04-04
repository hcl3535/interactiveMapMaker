import React, { Children, useEffect, useState } from "react"; 
import CreateClickable from "./createClickable";
import CreateIcon from "./createIcon";
import CreateWorld from "./createWorld";
import Library from "./Library";
import NavBar from "./navBar";
import Options from "./Options";
import WorldEdit from "./worldEdit";

 
const RightColumn = (props: any) => {

    const {allMaps, swapNewCity, currentMap, updateMapDictionary, setToken, token, setUser, user, swapCurrentMap,setChildren, currentWorld,children, setCurrentMap, setActiveTab,activeTab, setEditMode, editMode } = props;

    

    useEffect(()=>{ 
    
    },[currentMap])

    const switchActiveTab:React.FC = (tab: any):any => {
      setActiveTab(tab)  
    }


    return(
        <div className="rightColumn border centered column">
            <NavBar switchActiveTab={switchActiveTab}/>
            {activeTab === 'library' ? <Library allMaps={allMaps} swapNewCity={swapNewCity} switchActiveTab={switchActiveTab} user={user} /> : null}
            {activeTab === 'addClickable' ? <CreateClickable currentMap={currentMap} allMaps={allMaps} updateMapDictionary={updateMapDictionary} swapNewCity={swapNewCity} switchActiveTab={switchActiveTab} user={user} setChildren={setChildren} children={children} setCurrentMap={setCurrentMap}/> : null}
            {activeTab === 'options' ? <Options setToken={setToken} token={token} setUser={setUser}/> : null}
            {activeTab === 'createClickable' ? <CreateClickable/> : null}
            {activeTab === 'createIcon'? <CreateIcon user={user} switchActiveTab={switchActiveTab}/> : null}
            {activeTab === 'worldEdit'? <WorldEdit user={user} swapCurrentMap={swapCurrentMap} setChildren={setChildren} currentWorld={currentWorld} setEditMode={setEditMode} editMode={editMode}/> : null}
            {activeTab === 'createWorld'? <CreateWorld user={user} setActiveTab={setActiveTab} setChildren={setChildren} currentWorld={currentWorld}/> : null}
        </div>
    )
}

export default RightColumn;