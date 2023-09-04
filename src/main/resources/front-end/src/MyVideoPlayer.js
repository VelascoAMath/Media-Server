import React, { Component, useRef } from 'react';
import { useState } from 'react';
import { Fullscreen, FullscreenExit, Hexagon, HexagonFill, PauseBtnFill, PlayBtnFill, RecordFill, VolumeDownFill, VolumeMuteFill, VolumeOffFill, VolumeUpFill } from 'react-bootstrap-icons';
import { sprintf } from 'sprintf-js';

export default function MyVideoPlayer() {

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef(null);
  let progressPercentage = 0;

  let handleKeyEvent = function(event) {
    if(event.code == "KeyK" || event.code == "Space"){
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

  let togglePlay = function() {
    if(isPlaying){
    videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  let toggleMute = function() {
    setIsMuted(!isMuted);
  }

  let toggleFullScreen = function() {
    setIsFullScreen(!isFullScreen);
  }

  let formatStringAsTime = function(time) {
    console.log(time);
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
    <div className='video-container' onKeyDown={(event) => {handleKeyEvent(event)}} tabIndex={"0"}>
      <div className="video-controls-container">
        <div className='videoProgress' style={{width: progressPercentage.toString() + "%" }}></div>
        <div className='progressPosition' ><Hexagon style={{paddingLeft: progressPercentage.toString() + "%" }} ></Hexagon></div>
        <div className="controls">
          {!isPlaying && <PlayBtnFill onClick={togglePlay} className="play-pause-btn col-sm"></PlayBtnFill>}
          {isPlaying && <PauseBtnFill onClick={togglePlay} className="play-pause-btn col-sm"></PauseBtnFill>}
          {videoRef.current && isMuted && <VolumeMuteFill onClick={toggleMute} className="col-sm control-element"></VolumeMuteFill>}
          {videoRef.current && !isMuted && volume > 0.5 && <VolumeUpFill onClick={toggleMute} className="col-sm control-element"></VolumeUpFill>}
          {videoRef.current && !isMuted && 0 < volume && volume <= 0.5 && <VolumeDownFill onClick={toggleMute} className="col-sm control-element"></VolumeDownFill>}
          {videoRef.current && !isMuted && volume < 0.1 && <VolumeOffFill onClick={toggleMute} className="col-sm control-element"></VolumeOffFill>}
          {videoRef.current && (formatStringAsTime(currentTime) + "/" + formatStringAsTime(videoRef.current.duration))}
          {!isFullScreen && <Fullscreen onClick={toggleFullScreen} style={{float:"right", marginRight:"10px"}}></Fullscreen>}
          {isFullScreen && <FullscreenExit onClick={toggleFullScreen} style={{float:"right", marginRight:"10px"}}></FullscreenExit>}
        </div>
      </div>
      <video src="http://localhost:8080/media/test.mp4" 
      playing={isPlaying.toString()}
      onClick={togglePlay} onKeyDown={(event) => {handleKeyEvent(event)}} tabIndex={"0"} ref={videoRef}></video>
    </div>
  );
}