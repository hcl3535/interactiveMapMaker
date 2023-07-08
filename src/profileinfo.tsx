import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileInfo = (props:any) => {

    const {user, openOptions,token, setNewCity,setActiveTab, setEditMode} = props;

    const navigate = useNavigate()

    const switchToOptions = () => {
        openOptions()
    }

    useEffect(() => {

    },[token])

    const goHome = () => {
      setNewCity(null)
      setActiveTab('library')
      setEditMode(false)
      navigate(`/`)
    }

    const goToLogin = () => {
        navigate('/login')
    }

    const goToAllMaps = () => {
      navigate('/allMaps')
    }

    return(
        <div className="profileInfo">
            <h1 className="profileName" onClick={goHome}>home</h1>
          {user ?
          <div className="flex">
            <a href="#recentMaps">
              <h1 className="profileName">Recent Maps</h1>
            </a>
            <h1 className="profileName" onClick={goToAllMaps}>All Maps</h1>
            <h1 className="profileName">{user.username}</h1>
            <div className="profilePicBorder">
              <img 
                src={user.profileimageurl}
                alt=""
                className="profilePic"
                onClick={switchToOptions}
                />
            </div>
          </div>
          :
          <div>
          <h1 className="profileName" onClick={goToLogin}>login</h1>
          </div>
          }
        </div>

    )
}

export default ProfileInfo;