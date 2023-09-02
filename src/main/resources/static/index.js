import { createRoot } from 'react-dom/client';



// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<h1>Hello, world</h1>);


let handlePlayPause = function(event) {
    if(event.key == 'k'){
        let video = document.getElementById("currentVid");
        console.log(video);
        if(video.paused){
            video.play();
        } else{
            video.pause();
        }
    }
};

document.addEventListener('keypress', handlePlayPause, false);
