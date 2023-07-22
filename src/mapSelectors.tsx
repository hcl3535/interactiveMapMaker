import { useNavigate } from "react-router-dom";
import banner from "./Photos/banner.png"


const MapSelector = (props:any) => {

    const {containerNumber, user, userWorlds, setIsExpanded, setActiveTab,setTutorial, setTutorialStep} = props;
    
    const navigate = useNavigate()

    let world:any = undefined

    
    const createNewWorld = () => {
      navigate(`/map/untitled`)
      setIsExpanded(true)
      setTutorialStep(0)
      setTutorial(true)
      setActiveTab('createWorld')
    }
    
    const goToClickedWorld = () => {
      navigate(`/map/${world.id}`)
    }
    
    const goToLogin = () => {
      navigate(`/login`)
    }

    if(user){
      if(userWorlds){
      world = userWorlds[containerNumber - 1]
    }
    }

    if(!user){
        return(
            <div className="mapSelector" onClick={goToLogin}>
              <h1>login to create a world</h1>
            </div>
          ) 
    }

    // if(containerNumber === 0){
    //   return(
    //     <div className="mapSelector" onClick={createNewWorld}>
    //       <h1 className="worldName">create New Map</h1>
    //     </div>
    //   )
    // }

    if(!world) return <></>

    return(
      <div className="mapSelectorHolder">
        <div className="mapSelector" onClick={goToClickedWorld}>
          <img src={world?.mapurl} alt=''></img>
          <div className="bannerContainer">
          </div>
          </div>
            <h1 className="worldName">{world?.name}</h1>
            <img src={banner} alt="" className="banner"></img>
        </div>  
    )
}

export default MapSelector