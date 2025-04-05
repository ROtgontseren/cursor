'use client';

import { useRef, useState } from 'react';
import VideoSwiper from './swiper';

export default function Home() {
  const swiperRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showLocationVideo, setShowLocationVideo] = useState(false);

  const handleVideoSelection = (videoId) => {
    setSelectedVideo(videoId);
    setShowLocationVideo(false);
    swiperRef.current?.slideTo(videoId - 1);
  };

  const handleLocationVideoClick = () => {
    setShowLocationVideo(true);
    setSelectedVideo(null);
  };

  const handlePauseAllVideos = () => {
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach((video) => {
      video.pause();
    });
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <iframe
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        src="https://www.youtube.com/embed/R3S58vN9GkU?autoplay=1&mute=1&loop=1&playlist=R3S58vN9GkU&controls=0&showinfo=0&modestbranding=1&rel=0"
        title="YouTube video background"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
      ></iframe>

      <div className="z-10 flex justify-center items-end h-screen w-screen">
        <div className="absolute top-[42%] right-[10%] z-10 w-full flex flex-col items-center">
          <nav className="flex justify-center items-center gap-2 mt-4">
            <div className="dropdown dropdown-top">
              <label tabIndex={0} className="btn">A1 - A15</label>
              <ul tabIndex={0} className="dropdown-content menu text-center bg-white mb-2 rounded-box z-10 w-72 h-40 p-2 shadow-sm overflow-y-auto">
                {[...Array(15).keys()].map((i) => (
                  <li key={`A${i + 1}`}>
                    <a onClick={() => handleVideoSelection(i + 1)}>A{i + 1}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="dropdown dropdown-top">
              <label tabIndex={0} className="btn">B1 - B6</label>
              <ul tabIndex={0} className="dropdown-content menu text-center mb-2 bg-white rounded-box z-10 w-24 p-2 shadow-sm">
                {[...Array(6).keys()].map((i) => (
                  <li key={`B${i + 1}`}>
                    <a onClick={() => handleVideoSelection(i + 16)}>B{i + 1}</a>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="btn"
              onClick={handleLocationVideoClick}
            >
              Байршил
            </button>
          </nav>

          <section className="mt-10 mb-10 h-[40vh] w-[60vh] flex justify-center items-center">
            <div className="w-full max-w-5xl h-full rounded-3xl overflow-hidden">
              {showLocationVideo ? (
                <div className="relative w-full h-full">
                  <video
                    className="w-full h-full"
                    src="/videos/location/location.mp4"
                    controls
                    autoPlay
                    muted
                    loop
                  />
                </div>
              ) : selectedVideo !== null ? (
                <div className="relative w-full h-full">
                  <VideoSwiper swiperRef={swiperRef} selectedVideo={selectedVideo} />
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <p></p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
