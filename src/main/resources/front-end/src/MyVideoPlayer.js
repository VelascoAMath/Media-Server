import React, { Component, useRef } from 'react';
import { useState } from 'react';
import ReactPlayer from 'react-player';

export default function MyVideoPlayer() {

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  let handleKeyEvent = function(event) {
    if(event.code == "KeyK" || event.code == "Space"){
        togglePlay();
    } else if (event.code == "KeyM"){
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    } else if (event.code == 'KeyL' || event.code == "ArrowRight"){
      videoRef.current.currentTime += 10;
      console.log(videoRef.current.currentTime);
    } else if (event.code == 'KeyJ' || event.code == "ArrowLeft"){
      videoRef.current.currentTime -= 10;
      console.log(videoRef.current.currentTime);
    } else if (event.code == 'Digit1'){
      videoRef.current.currentTime = 0.1 * videoRef.current.duration;
    } else if (event.code == 'Digit2'){
      videoRef.current.currentTime = 0.2 * videoRef.current.duration;
    } else if (event.code == 'Digit3'){
      videoRef.current.currentTime = 0.3 * videoRef.current.duration;
    } else if (event.code == 'Digit4'){
      videoRef.current.currentTime = 0.4 * videoRef.current.duration;
    } else if (event.code == 'Digit5'){
      videoRef.current.currentTime = 0.5 * videoRef.current.duration;
    } else if (event.code == 'Digit6'){
      videoRef.current.currentTime = 0.6 * videoRef.current.duration;
    } else if (event.code == 'Digit7'){
      videoRef.current.currentTime = 0.7 * videoRef.current.duration;
    } else if (event.code == 'Digit8'){
      videoRef.current.currentTime = 0.8 * videoRef.current.duration;
    } else if (event.code == 'Digit9'){
      videoRef.current.currentTime = 0.9 * videoRef.current.duration;
    } else if (event.code == 'Digit0'){
      videoRef.current.currentTime = 0.0 * videoRef.current.duration;
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