import React from "react";

const CommunityMapTicker = (props:any) => {

    const {currentCommunityMapIndex,tickerIdx} = props;
    

    console.log('currentCommunityMapIndex', typeof currentCommunityMapIndex)
    console.log(typeof tickerIdx)

    let ticker

    if(currentCommunityMapIndex === tickerIdx){
        ticker = <div className="bigTicker"></div> 
    }else {
      ticker = <div className="ticker"></div> 
    }
    return (
      <>
        {ticker}
      </>
    )
}

export default CommunityMapTicker