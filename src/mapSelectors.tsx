import { useNavigate } from "react-router-dom";


const MapSelector = (props:any) => {

    const {containerNumber, user, userWorlds, setIsExpanded, setActiveTab} = props;
    
    const navigate = useNavigate()

    let world:any = undefined

    
    const createNewWorld = () => {
      navigate(`/map/untitled`)
      setIsExpanded(true)
      setActiveTab('createWorld')
    }
    
    const goToClickedWorld = () => {
      navigate(`/map/${world.name}`)
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

    if(containerNumber === 0){
      return(
        <div className="mapSelector" onClick={createNewWorld}>
          <h1>create New Map</h1>
        </div>
      )
    }

    if(!world) return <></>

    return(
        <div className="mapSelector" onClick={goToClickedWorld}>
          <h1 className="worldName">{world?.name}</h1>
          <img src={world?.mapurl} alt=''></img>
        </div>
    )
}

export default MapSelector