import { useState, useRef } from 'react';
import { Play, Volume2 } from 'lucide-react';

const FullScreenVideoSection = ({ videoUrl, posterImage }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
        setIsMuted(false); // Unmute when user clicks play
        videoRef.current.muted = false;
      }
    }
  };

  const handleVideoClick = () => {
    togglePlay();
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setIsMuted(true);
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  return (
    <div className="w-full relative">
      <video
        ref={videoRef}
        className="w-full h-auto object-cover cursor-pointer"
        autoPlay
        muted={isMuted}
        loop={false}
        playsInline
        poster={posterImage}
        onEnded={handleVideoEnded}
        onClick={handleVideoClick}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Play/Sound Control Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <button
          onClick={togglePlay}
          className="pointer-events-auto bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 rounded-full p-6 group"
        >
          {!isPlaying ? (
            <Play 
              size={48} 
              className="text-white ml-1 group-hover:scale-110 transition-transform duration-200" 
              fill="white"
            />
          ) : (
            <Volume2 
              size={48} 
              className="text-white group-hover:scale-110 transition-transform duration-200" 
            />
          )}
        </button>
      </div>
      
      {/* Optional: Video info overlay */}
      {!isPlaying && (
        <div className="absolute bottom-8 left-8 text-white">
          <p className="text-sm font-medium opacity-80">
            Click to play with sound
          </p>
        </div>
      )}
    </div>
  );
};

export default FullScreenVideoSection;