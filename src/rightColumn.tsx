import React, { useEffect, useState } from "react"; 
import CreateClickable from "./createClickable";
import Library from "./Library";
import NavBar from "./navBar";
import Options from "./Options";

 
const RightColumn = (props: any) => {

    const {allMaps, swapNewCity, currentMap, updateMapDictionary } = props;

    const [activeTab, setActiveTab] = useState('library')
    useEffect(()=>{
        console.log("change detected on right column",currentMap)
    },[currentMap])

    const switchActiveTab:React.FC = (tab: any):any => {
      setActiveTab(tab)  
    }


    return(
        <div className="rightColumn border centered column">
            <NavBar switchActiveTab={switchActiveTab}/>
            {activeTab === 'library' ? <Library allMaps={allMaps} swapNewCity={swapNewCity} switchActiveTab={switchActiveTab}/> : null}
            {activeTab === 'addClickable' ? <CreateClickable currentMap={currentMap} allMaps={allMaps} updateMapDictionary={updateMapDictionary} swapNewCity={swapNewCity} switchActiveTab={switchActiveTab}/> : null}
            {activeTab === 'options' ? <Options/> : null}
            {activeTab === 'createClickable' ? <CreateClickable/> : null}
        </div>
    )
}

export default RightColumn;