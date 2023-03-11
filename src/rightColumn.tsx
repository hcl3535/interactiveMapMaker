import React, { useEffect, useState } from "react"; 
import CreateClickable from "./createClickable";
import CreateIcon from "./createIcon";
import Library from "./Library";
import NavBar from "./navBar";
import Options from "./Options";
import WorldEdit from "./worldEdit";

 
const RightColumn = (props: any) => {

    const {allMaps, swapNewCity, currentMap, updateMapDictionary, setToken, token, setUser, user, swapCurrentMap } = props;

    const [activeTab, setActiveTab] = useState('library')

    useEffect(()=>{ 
    
    },[currentMap])

    const switchActiveTab:React.FC = (tab: any):any => {
      setActiveTab(tab)  
    }


    return(
        <div className="rightColumn border centered column">
            <NavBar switchActiveTab={switchActiveTab}/>
            {activeTab === 'library' ? <Library allMaps={allMaps} swapNewCity={swapNewCity} switchActiveTab={switchActiveTab} user={user} /> : null}
            {activeTab === 'addClickable' ? <CreateClickable currentMap={currentMap} allMaps={allMaps} updateMapDictionary={updateMapDictionary} swapNewCity={swapNewCity} switchActiveTab={switchActiveTab} user={user}/> : null}
            {activeTab === 'options' ? <Options setToken={setToken} token={token} setUser={setUser}/> : null}
            {activeTab === 'createClickable' ? <CreateClickable/> : null}
            {activeTab === 'createIcon'? <CreateIcon user={user} switchActiveTab={switchActiveTab}/> : null}
            {activeTab === 'worldEdit'? <WorldEdit user={user} swapCurrentMap={swapCurrentMap}/> : null}
        </div>
    )
}

export default RightColumn;