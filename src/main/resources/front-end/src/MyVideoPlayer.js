import React, { Component, useRef } from 'react';
import { useState } from 'react';
import ReactPlayer from 'react-player';

export default function MyVideoPlayer() {

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  let handleKeyEvent = function(event) {
    if(event.code == "KeyK"){
        togglePlay();
    } else if (event.code == "KeyM"){
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
     else {
      console.log(event.code);
    }
  }

  let togglePlay = function() {
    if(isPlaying){
    videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }


  return (
    <video src="http://localhost:63342/Media-Server/src/main/resources/static/media/test.mp4" 
    controls={false} playing={isPlaying? "true": "false"}
     onClick={togglePlay} onKeyDown={(event) => {handleKeyEvent(event)}} tabIndex={"0"} ref={videoRef}></video>
  );
}