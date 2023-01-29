import React, { useEffect, useState } from "react"; 
import CreateClickable from "./createClickable";
import Library from "./Library";
import NavBar from "./navBar";
import Options from "./Options";

 
const RightColumn = (props: any) => {

    const {allMaps, swapNewCity, currentMap, updateMapDictionary } = props;

    useEffect(()=>{
        console.log("change detected on right column",currentMap)
    },[currentMap])

    const switchActiveTab:React.FC = (tab: any):any => {
        switch(tab){
            case 'library':
                setActiveTab(<Library allMaps={allMaps} swapNewCity={swapNewCity} switchActiveTab={switchActiveTab}/>)
                break;
            case 'addClickable' :
                setActiveTab(<CreateClickable currentMap={currentMap} allMaps={allMaps} updateMapDictionary={updateMapDictionary} swapNewCity={swapNewCity} switchActiveTab={switchActiveTab}/>)
                break;  
            case 'options' :
                setActiveTab(<Options/>)
                break;    
        }   
    }
    const [activeTab, setActiveTab] = useState(<Library allMaps={allMaps} swapNewCity={swapNewCity} switchActiveTab={switchActiveTab}/>)


    return(
        <div className="rightColumn border centered column">
            <NavBar switchActiveTab={switchActiveTab}/>
            {activeTab}
        </div>
    )
}

export default RightColumn;