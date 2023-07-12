import React, { useEffect } from "react";

const Audio = (props:any) => {

    const {setNewCity} = props;

    useEffect(() => {
        setNewCity(null)
      },[])

    return(
        <div className="audio">
          <h2>coming soon</h2>
        </div>
    )
}

export default Audio;