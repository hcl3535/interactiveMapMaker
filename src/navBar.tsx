import React, { useState } from "react";
import { getAllUsers } from "./axios/axios";

const NavBar = (props:any) => {
 
    const {switchActiveTab} = props;


    const switchToLibrary = () => {
      switchActiveTab("library")
    }

    const switchToOptions = () => {
      switchActiveTab("options")
    }

    const switchToWorldEdit = async () => {
      switchActiveTab('worldEdit')
    }

    const switchToBlank = async () => {

    }

    return(
        <div className="navBar">
            <div className="border" onClick={switchToWorldEdit}></div>
            <div className="border" onClick={switchToLibrary}></div>
            <div className="border" onClick={switchToBlank}></div>
            <div className="border" onClick={switchToOptions}></div>
        </div>
    )
}


export default NavBar;