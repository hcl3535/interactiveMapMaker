import React, { useEffect } from "react";
import { getEffectiveConstraintOfTypeParameter } from "typescript";

const Library = (props: any) => {

    const {allMaps, swapNewCity, switchActiveTab} = props;
    
    const addCity = (e: any) => {
      switchActiveTab('addClickable')
      let newCity = e.target.parentNode.children[2].innerHTML
      swapNewCity(allMaps[newCity])
    }


    return(
        <div>
           <> {Object.keys(allMaps).map(function(key, index) {
              return(
                <div key={index} className="flex library-item">
                  <button className="add-button-size" onClick={addCity}></button>
                  <img src={allMaps[key].icon} alt='N/A' className='thumbnail'></img>
                  <h1 className="vertical-centered">{key}</h1>
                </div>
              )
            })}
            </>
        </div>
    )
}

export default Library;

function componentDidMount() {
  throw new Error("Function not implemented.");
}
