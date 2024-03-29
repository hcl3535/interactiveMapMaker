import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileInfo = (props:any) => {

    const {user, openOptions,token, setNewCity,setActiveTab, setEditMode, setIsExpanded, setTutorialStep,setTutorial} = props;

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
      setTutorial(false)
      setTutorialStep(0)
      navigate(`/`)
    }

    const goToLogin = () => {
      setTutorial(false)
      setTutorialStep(0)
        navigate('/login')
    }

    const goToAllMaps = () => {
      setTutorial(false)
      setTutorialStep(0)
      navigate('/allMaps')
    }

    const createNewWorld = () => {
      navigate(`/map/0`)
      setIsExpanded(true)
      setTutorialStep(0)
      setTutorial(true)
      setActiveTab('createWorld')
    }

    return(
        <div className="profileInfo">
            <h1 className="profileName website-name" onClick={goHome}>Realm Forge</h1>
            {/* <h1 className="profileName" onClick={goHome}>Home</h1> */}
          {user ?
          <div className="flex">
            <a href="#recentMaps">
              <h1 className="profileName">Recent Maps</h1>
            </a>
            <h1 className="profileName" onClick={goToAllMaps}>All Maps</h1>
            <h1 className="profileName" onClick={createNewWorld}>Create Map</h1>
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