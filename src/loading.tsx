import React from "react";
import scroll from './Photos/scroll-paper-clip-art-png-favpng-BXdFwnWdSVKHYrXpvU1bPLpN3-removebg-preview.png'

const Loading = () => {
    return(
    <div className="message">
        <img src={scroll} className="messageImg"/>
        <h1 className="messageMessage">loading</h1>
    </div>
    )
}

export default Loading;