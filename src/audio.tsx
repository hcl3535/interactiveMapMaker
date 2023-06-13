import React, { useEffect } from "react";

const Audio = (props:any) => {

    const {setNewCity} = props;

    useEffect(() => {
        setNewCity(null)
      },[])

    return(
        <h2>coming soon</h2>
    )
}

export default Audio;