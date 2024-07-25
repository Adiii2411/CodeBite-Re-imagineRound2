import React, { useRef, useState } from "react";
import "./global.css";

const MusicPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="music">
      <audio ref={audioRef} src={src} loop />
      <div className={`image-container ${isPlaying ? "playing" : "paused"}`}>
        <img src={isPlaying ? "/medias/Waves.png" : "/medias/WavesOff.png"} alt="background" />
      </div>
      <button onClick={handlePlayPause}>
        <p>{isPlaying ? "Pause" : "Play"}</p>
        {/* <img
          src={isPlaying ? "/medias/pause.svg" : "/medias/play.svg"}
          alt={isPlaying ? "Pause" : "Play"}
        /> */}
        <p> {isPlaying ? "Sound" : "Sound"}</p>
      </button>
    </div>
  );
};

export default MusicPlayer;
