import React, { useEffect } from "react";

const ProfileInfo = (props:any) => {

    const {user, openOptions,token} = props;

    const switchToOptions = () => {
        openOptions()
    }

    useEffect(() => {

    },[token])

    return(
        
        user ?
        <div className="profileInfo">
            <h1 className="profileName">{user.username}</h1>
            <div className="profilePicBorder">
              <img 
                src={user.profileimageurl}
                className="profilePic"
                onClick={switchToOptions}
                />
            </div>
        </div>
        :
        <div className="profileInfo"/>
    )
}

export default ProfileInfo;