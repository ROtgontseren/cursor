'use client';

import { useRef, useState } from 'react';
import VideoSwiper from './swiper';

export default function Home() {
  const swiperRef = useRef(null);
  const [play, setPlay] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null); // State to track the selected video
  const [showAddress, setShowAddress] = useState(false); // State to track address visibility

  const handleVideoSelection = (videoId) => {
    setSelectedVideo(videoId); // Set the selected video
    setPlay(true); // Set play to true when a video is selected
    setShowAddress(false); // Hide the address when a video is selected
    swiperRef.current?.slideTo(videoId - 1); // Navigate to the corresponding slide
  };

  const handleLocationClick = () => {
    setPlay(false); // Stop video playback
    setShowAddress(true); // Show the address section
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

      <div className="relative z-10 flex items-end justify-center h-full w-full pb-20 pr-60">
        {/* Centered Container */}
        <div className="text-white text-center">
          {/* Navigation Buttons */}
          <nav className="mb-8">
            <div className="dropdown dropdown-top mb-4">
              <label tabIndex={0} className="btn btn-sm m-1">A1 - A15</label>
              <ul tabIndex="0" className="dropdown-content menu bg-base-100 text-black text-center rounded-box z-1 w-72 h-40 p-2 shadow-sm">
                {[...Array(15).keys()].map((i) => (
                  <li key={`A${i + 1}`}>
                    <a onClick={() => handleVideoSelection(i + 1)}>A{i + 1}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dropdown dropdown-top mb-4">
              <label tabIndex={0} className="btn btn-sm m-1">B1 - B6</label>
              <ul tabIndex="0" className="dropdown-content menu bg-base-100 text-black text-center rounded-box z-1 w-24 p-2 shadow-sm">
                {[...Array(6).keys()].map((i) => (
                  <li key={`B${i + 1}`}>
                    <a onClick={() => handleVideoSelection(i + 16)}>B{i + 1}</a>
                  </li>
                ))}
              </ul>
            </div>

            <button className="btn btn-sm mb-4" onClick={handleLocationClick}>Байршил</button>
          </nav>

          {!showAddress && <section>
            <div className="w-full mx-auto rounded-xl overflow-hidden p-4">
              {!play ? (
                <div className="text-center text-gray-300 py-10">🎬 Видео сонгоно уу</div>
              ) : (
                <div className="relative w-96 h-48">
                  <VideoSwiper swiperRef={swiperRef} />
                </div>
              )}
            </div>
          </section>}

          {showAddress && (
            <div className="mt-10 text-lg w-96 h-52 bg-black opacity-60 text-white p-4 rounded shadow">
              📍 Байршлын мэдээлэл энд орно...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
