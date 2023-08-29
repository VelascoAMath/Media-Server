import logo from './logo.svg';
import './App.css';

import React from 'react'
import MyVideoPlayer from './MyVideoPlayer';


function App() {


  
  // let videoPlayer = <ReactPlayer url='http://localhost:63342/Media-Server/src/main/resources/static/media/test.mp4' controls={true} playing={false} muted={true}/>;

  // let controlKey = function(e){
  //   if(e.code == "KeyK"){
  //     console.log(videoPlayer);
  //     videoPlayer.player.play();
  //   } else {
      
  //   }
  // }

  return (
    <div>
      <h1>Welcome to the Velasco Media Server</h1>
      <MyVideoPlayer src="http://localhost:63342/Media-Server/src/main/resources/static/media/test.mp4"></MyVideoPlayer>
    </div>
  );
}

export default App;
