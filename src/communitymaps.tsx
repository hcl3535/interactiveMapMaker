import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCommunityMaps, getUserById } from "./axios/axios";
import CommunityMapTicker from "./communityTicker";
import scrollPaper from './Photos/scroll-paper-clip-art-png-favpng-BXdFwnWdSVKHYrXpvU1bPLpN3-removebg-preview.png'

const CommunityMaps = (props: any) => {

    const [communityMaps, setCommunityMaps] = useState([])
    const [currentCommunityMapIndex, setCurrentCommunityMapIndex] = useState(0)
    const [stopMapSwitching, setStopMapSwitching] = useState(false)

    let tickers = []
    const navigate = useNavigate()
    

      useEffect(() => {

        const fetchData = async () => {

          const maps = await getCommunityMaps();

          maps.map(async (map) => {
            const user = await getUserById(map.userid)
            map.owner = user.username
          })
          
          setCommunityMaps(maps)
        }
        
        fetchData()

      },[])

      useEffect(() => {
  
        const intreval = setInterval(() =>{
          if(currentCommunityMapIndex === communityMaps.length - 1){
            setCurrentCommunityMapIndex(0)
            return
          }
          
          setCurrentCommunityMapIndex(currentCommunityMapIndex + 1)
        }, 7000)

        const fadeIntreval = setInterval(() =>{
         const map = document.getElementById("communityMap")
         map.classList.add('communityMapFade')
          setTimeout(() => {
            map.classList.remove('communityMapFade')
          },1000)
        }, 6500)

        return() => {
          clearInterval(fadeIntreval)
          clearInterval(intreval)
        }

      },[currentCommunityMapIndex])


    const background = document.getElementById("root")
    if(background){
      background.style.backgroundImage = `url(${communityMaps[currentCommunityMapIndex]?.mapurl})`
    }
      

    const goToAllMaps = () => {
      navigate('/allMaps')
    }

    const goToClickedWorld = (map) => {
      navigate(`/map/${map.name}`)
    }

    const incrementComunityMapIndex = () => {
      console.log('here')

      if(currentCommunityMapIndex === communityMaps.length -1){
        setCurrentCommunityMapIndex(0)
        return
      }

      setCurrentCommunityMapIndex(currentCommunityMapIndex + 1)
    }

    const decrementComunityMapIndex = () => {
    
      if(currentCommunityMapIndex === 0){
        setCurrentCommunityMapIndex(communityMaps.length - 1)
        return
      }

      setCurrentCommunityMapIndex(currentCommunityMapIndex - 1)
    }

    for(const idx in communityMaps){
      tickers.push(<CommunityMapTicker currentCommunityMapIndex={currentCommunityMapIndex} tickerIdx={Number(idx)} />)
    }

    return (
        <>
            {communityMaps[currentCommunityMapIndex] ?
            <div className="communityMapsContainerContainer" id="communityMapsContainerContainer">
            <div className="communityMapsContainer flex">
            <div className="communityMapHolder">
              <img
                id="communityMap"
                className="communityMap"
                src={communityMaps[currentCommunityMapIndex].mapurl}
                onClick={() => {goToClickedWorld(communityMaps[currentCommunityMapIndex])}}
                onMouseEnter={() => {setStopMapSwitching(true)}}
                onMouseLeave={() => {setStopMapSwitching(false)}}
              />
              <div className="tickerBox">
                {tickers}
              </div>
            </div>
              <button className="communityMapButton" >
            <div className="" onClick={incrementComunityMapIndex}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
              </svg>
            </div>
          </button>
          <div className="communityMapInfo">
            <img src={scrollPaper} className="communit"></img>
            <div className="communityMapLabel">
              <h1>
                Community Map
              </h1>
            </div>  
            <span>
              <h1>
                World: 
              </h1>
              <h1>
              &nbsp; {communityMaps[currentCommunityMapIndex].name}
              </h1>
            </span>
            <span>
              <h1>
                Creater:
              </h1>
              <h1>
              &nbsp;  {communityMaps[currentCommunityMapIndex].owner}
              </h1>
            </span>
          </div> 
              </div>
              </div>
              :null
            }
          </>
    )
}

export default CommunityMaps