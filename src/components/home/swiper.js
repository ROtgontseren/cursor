"use client";

import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const videos = [
  "/videos/a/a1.mp4",
  "/videos/a/a2.mp4",
  "/videos/a/a3.mp4",
  "/videos/a/a4.mp4",
  "/videos/a/a5.mp4",
  "/videos/a/a6.mp4",
  "/videos/a/a7.mp4",
  "/videos/a/a8.mp4",
  "/videos/a/a9.mp4",
  "/videos/a/a10.mp4",
  "/videos/a/a11.mp4",
  "/videos/a/a12.mp4",
  "/videos/a/a13.mp4",
  "/videos/a/a14.mp4",
  "/videos/a/a15.mp4"
];

const Bvideos = [
  "/videos/b/b1.mp4",
  "/videos/b/b2.mp4",
  "/videos/b/b3.mp4",
  "/videos/b/b4.mp4",
  "/videos/b/b5.mp4",
  "/videos/b/b6.mp4",
];

const locationVideo = [
  "/videos/location/location.mp4",
];

const allVideos = [...videos, ...Bvideos, ...locationVideo];

export default function VideoSwiper({ swiperRef, selectedVideo }) {
  const videoRefs = useRef([]);

  useEffect(() => {
    if (selectedVideo !== null && swiperRef.current) {
      swiperRef.current.slideTo(selectedVideo - 1); // Adjust slide based on selected video
    }
  }, [selectedVideo, swiperRef]);

  const handleSlideChange = (swiper) => {
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach((vid) => vid.pause()); // Pause all videos
    const activeSlide = swiper.slides[swiper.activeIndex];
    const videoEl = activeSlide.querySelector('video');
    videoEl?.play(); // Play the active video
  };

  return (
    <Swiper
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      onSlideChange={handleSlideChange}
      spaceBetween={30}
      slidesPerView={1}
    >
      {allVideos.map((url, index) => (
        <SwiperSlide key={index}>
          <div className="w-full aspect-video">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="w-full h-full"
              src={url}
              controls
              autoPlay
              muted
              loop
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
