import './App.css';
import { useState } from 'react';
import VideoPlayer from './Components/VideoPlayer';

function App() {
  const [videoId, setVideoId] = useState(null);

  function playVideo(e, videoId) {
    e.preventDefault();
    setVideoId(videoId);
  }

  return (
    <div className="App">
      <div>
      {videoId && <VideoPlayer videoId={videoId} />}
      </div>
      <div className="button-container">
        <button onClick={(e) => playVideo(e, 'video1')}>Play Video 1</button>
        <button onClick={(e) => playVideo(e, 'video2')}>Play Video 2</button>
        <button onClick={(e) => playVideo(e, 'video3')}>Play Video 3</button>
      </div>
    </div>
  );
}

export default App;
