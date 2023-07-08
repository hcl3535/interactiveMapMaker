import React from "react";

const CommunityMapTicker = (props:any) => {

    const {currentCommunityMapIndex,tickerIdx} = props;

    let ticker

    if(currentCommunityMapIndex === tickerIdx){
        ticker = <div className="bigTicker" key={tickerIdx}></div> 
    }else {
      ticker = <div className="ticker" key={tickerIdx}></div> 
    }
    return (
      <>
        {ticker}
      </>
    )
}

export default CommunityMapTicker