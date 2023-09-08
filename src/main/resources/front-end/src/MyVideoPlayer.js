import React, { useRef } from 'react';
import { useState } from 'react';
import { Film, Fullscreen, FullscreenExit, PauseBtnFill, Pip, PlayBtnFill, Repeat, VolumeDownFill, VolumeMuteFill, VolumeOffFill, VolumeUpFill } from 'react-bootstrap-icons';
import { sprintf } from 'sprintf-js';
import { useFullScreenHandle } from "react-full-screen";
import { FullScreen as FullScreenPanel } from "react-full-screen";


export default function MyVideoPlayer() {

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isTheater, setIsTheater] = useState(false);
  const [isMini, setIsMini] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [willLoop, setWillLoop] = useState(false);
  const videoRef = useRef(null);
  const controlRef = useRef(null);
  let progressPercentage = 0;
  const handle = useFullScreenHandle();
  let mouseX = -1;

  let handleKeyEvent = function(event) {
    if(event.code == "KeyF"){
      toggleFullScreen();
    } else if (event.code == "KeyT"){
      toggleTheater();
    } else if(event.code == "KeyK" || event.code == "Space"){
        togglePlay();
    } else if (event.code == "KeyM"){
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    } else if (event.code == 'KeyL' || event.code == "ArrowRight"){
      videoRef.current.currentTime += 10;
      videoRef.current.currentTime = Math.min(videoRef.current.currentTime, videoRef.current.duration);
      console.log(videoRef.current.currentTime);
    } else if (event.code == 'KeyJ' || event.code == "ArrowLeft"){
      videoRef.current.currentTime -= 10;
      videoRef.current.currentTime = Math.max(videoRef.current.currentTime, 0);
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
    } else if (event.code == 'ArrowUp') {
      console.log(videoRef.current.volume);
      if(videoRef.current.volume + 0.1 > 1){
        videoRef.current.volume = 0.9;
      }
      videoRef.current.volume += 0.1;
      setVolume(videoRef.current.volume);
    }
    else if (event.code == 'ArrowDown') {
      console.log(videoRef.current.volume);
      if(videoRef.current.volume - 0.1 < 0){
        videoRef.current.volume = 0.1;
      }
      videoRef.current.volume -= 0.1;
      setVolume(videoRef.current.volume);
    }
   else {
      console.log(event.code);
    }
  }

  let handleMouse = function(event) {
    const rect = controlRef.current.getBoundingClientRect();
    console.log(rect);

    console.log( 100 * (event.clientX - rect.x) / rect.width);

    setCurrentTime((event.clientX - rect.x) / rect.width * videoRef.current.duration )
    videoRef.current.currentTime = (event.clientX - rect.x) / rect.width * videoRef.current.duration
  }

  let togglePlay = function() {
    if(isPlaying){
    videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  let toggleMute = function() {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }

  let toggleFullScreen = function() {
    if(!isFullScreen){
      handle.enter();
    } else {
      handle.exit();
    }
    setIsFullScreen(!isFullScreen);
    setIsMini(false);
    setIsTheater(false);
  }

  let toggleTheater = function() {
    if(!isFullScreen){
    } else {
      handle.exit();
    }
    setIsFullScreen(false);
    setIsMini(false);
    setIsTheater(!isTheater);
  }

  let toggleMini = function() {
    setIsFullScreen(false);
    setIsMini(true);
    setIsTheater(false);
  }

  let toggleLoop = function() {
    setWillLoop(!willLoop);
    videoRef.current.loop = !willLoop;
  }
  let formatStringAsTime = function(time) {
    if(time > 3600){
      return sprintf("%02d:%02d:%02d", time / 3600, (time % 3600) / 60, time % 60);
    } else if (time > 60){
      return sprintf("%02d:%02d", time / 60, time % 60);
    } 
    else {
      return sprintf("00:%02d", time);
    }
  }

  if(videoRef.current){
    videoRef.current.addEventListener("play", (event) => {setIsPlaying(true)} )
    videoRef.current.addEventListener("playing", (event) => {setIsPlaying(true)} )
    videoRef.current.addEventListener("pause", (event) => {setIsPlaying(false)} )
    videoRef.current.addEventListener("timeupdate", (event) => {setCurrentTime(videoRef.current.currentTime)} )
    progressPercentage = currentTime / videoRef.current.duration * 100;
  }

  return (
    <FullScreenPanel handle={handle}>
      <div className={'video-container' + (isTheater ? "-theater": "") + (isFullScreen ? "-full-screen": "")} onKeyDown={(event) => {handleKeyEvent(event)}} tabIndex={"0"}>
        <video src="http://localhost:8080/media/test.mp4" 
        playing={isPlaying.toString()}
        onClick={togglePlay} onKeyDown={(event) => {handleKeyEvent(event)}} tabIndex={"0"} ref={videoRef}></video>
        <div className={"video-controls-container" + (isTheater? "-theater": "")} ref={controlRef}>
          <div className='videoProgressBackground' onMouseUp={handleMouse}></div>
          <div className='videoProgress' style={{width: progressPercentage.toString() + "%" }}></div>
          <div className='progressPosition' style={{marginLeft: "calc(" + progressPercentage.toString() + "% - 7px)" } } ></div>
          <div className="controls">
            {!isPlaying && <PlayBtnFill onClick={togglePlay} className="play-pause-btn col-sm"></PlayBtnFill>}
            {isPlaying && <PauseBtnFill onClick={togglePlay} className="play-pause-btn col-sm"></PauseBtnFill>}
            {videoRef.current && isMuted && <VolumeMuteFill onClick={toggleMute} className="col-sm control-element"></VolumeMuteFill>}
            {videoRef.current && !isMuted && volume > 0.5 && <VolumeUpFill onClick={toggleMute} className="col-sm control-element"></VolumeUpFill>}
            {videoRef.current && !isMuted && 0 < volume && volume <= 0.5 && <VolumeDownFill onClick={toggleMute} className="col-sm control-element"></VolumeDownFill>}
            {videoRef.current && !isMuted && volume < 0.1 && <VolumeOffFill onClick={toggleMute} className="col-sm control-element"></VolumeOffFill>}
            {videoRef.current && (formatStringAsTime(currentTime) + "/" + formatStringAsTime(videoRef.current.duration))}
            {/* {!isFullScreen && <Pip onClick={toggleMini}></Pip>} */}
            <div className='infinite-middle'></div>
            {!willLoop && <Repeat onClick={toggleLoop}></Repeat>}
            {willLoop && <Repeat onClick={toggleLoop} style={{backgroundColor: "white"}}></Repeat>}
            {!isFullScreen && <Film onClick={toggleTheater}></Film>}
            {!isFullScreen && <Fullscreen onClick={toggleFullScreen} style={{float:"right", marginRight:"10px"}}></Fullscreen>}
            {isFullScreen && <FullscreenExit onClick={toggleFullScreen} style={{float:"right", marginRight:"10px"}}></FullscreenExit>}
          </div>
        </div>
      </div>
    </FullScreenPanel>
  );
}