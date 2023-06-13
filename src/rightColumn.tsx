import React, {useEffect} from "react"; 
import CreateClickable from "./createClickable";
import CreateIcon from "./createIcon";
import CreateWorld from "./createWorld";
import Library from "./Library";
import NavBar from "./navBar";
import Options from "./Options";
import WorldEdit from "./worldEdit";
import Audio from "./audio";

 
const RightColumn = (props: any) => {

    const {allMaps,setLoading,newCityWidth, swapNewCity, setNewCity, currentMap, updateMapDictionary, setToken, token, setUser, user, swapCurrentMap,setChildren, currentWorld,children, setCurrentMap, setActiveTab,activeTab, setEditMode, editMode, newCityLocation,currentlyEditing, setCurrentlyEditing,setNewCityWidth } = props;

    

    useEffect(()=>{ 
    
    },[currentMap])

    const switchActiveTab:React.FC = (tab: any):any => {
      setEditMode(false)
      setActiveTab(tab)  
    }


    return(
        <div className="rightColumn centered column">
            <NavBar switchActiveTab={switchActiveTab}/>
            {activeTab === 'library' ? <Library allMaps={allMaps} swapNewCity={swapNewCity} switchActiveTab={switchActiveTab} user={user} /> : null}
            {activeTab === 'addClickable' ? <CreateClickable currentMap={currentMap} allMaps={allMaps} updateMapDictionary={updateMapDictionary} swapNewCity={swapNewCity} switchActiveTab={switchActiveTab} user={user} setChildren={setChildren} children={children} setCurrentMap={setCurrentMap} newCityLocation={newCityLocation} setNewCity={setNewCity} currentlyEditing={currentlyEditing} setCurrentlyEditing={setCurrentlyEditing} setLoading={setLoading} setNewCityWidth={setNewCityWidth} newCityWidth={newCityWidth}/> : null}
            {activeTab === 'options' ? <Options setToken={setToken} token={token} setUser={setUser} setNewCity={setNewCity}/> : null}
            {activeTab === 'createIcon'? <CreateIcon user={user} switchActiveTab={switchActiveTab} setLoading={setLoading}/> : null}
            {activeTab === 'worldEdit'? <WorldEdit user={user} swapCurrentMap={swapCurrentMap} setChildren={setChildren} currentWorld={currentWorld} setEditMode={setEditMode} editMode={editMode} currentlyEditing={currentlyEditing} setCurrentlyEditing={setCurrentlyEditing} setNewCity={setNewCity}/> : null}
            {activeTab === 'createWorld'? <CreateWorld user={user} setActiveTab={setActiveTab} setChildren={setChildren} currentWorld={currentWorld}/> : null}
            {activeTab === 'audio' ? <Audio setNewCity={setNewCity}/> : null}
        </div>
    )
}

export default RightColumn;