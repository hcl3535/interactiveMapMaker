import React, { useState } from "react";

const NavBar = (props:any) => {
 
    const {switchActiveTab} = props;


    const switchToLibrary = () => {
      switchActiveTab("library")
    }

    const switchToAddClickable = () => {
      switchActiveTab("addClickable")
    }

    const switchToOptions = () => {
      switchActiveTab("options")
    }

    const switchToBlank = () => {
    }

    return(
        <div className="navBar">
            <div className="border" onClick={switchToLibrary}></div>
            <div className="border" onClick={switchToAddClickable}></div>
            <div className="border" onClick={switchToBlank}></div>
            <div className="border" onClick={switchToOptions}></div>
        </div>
    )
}


export default NavBar;