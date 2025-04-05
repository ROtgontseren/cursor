"use client"
import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([Navigation]);

const videos = [
  'https://www.youtube.com/embed/R3S58vN9GkU?enablejsapi=1',
  'https://www.youtube.com/embed/X_7P4YmkfY8?enablejsapi=1',
  'https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1',
  'https://www.youtube.com/embed/kXYiU_JCYtU?enablejsapi=1',
];

export default function VideoSwiper({ swiperRef }) {
  const iframeRefs = useRef([]);

  // Pause all videos
  const pauseAll = () => {
    iframeRefs.current.forEach((iframe) => {
      iframe?.contentWindow?.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        '*'
      );
    });
  };

  // When slide changes
  const handleSlideChange = (swiper) => {
    pauseAll();
    const currentIframe = iframeRefs.current[swiper.activeIndex];
    currentIframe?.contentWindow?.postMessage(
      '{"event":"command","func":"playVideo","args":""}',
      '*'
    );
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
      {videos.map((url, index) => (
        <SwiperSlide key={index}>
          <div className="w-full aspect-video">
            <iframe
              ref={(el) => (iframeRefs.current[index] = el)}
              className="w-full h-full"
              src={url}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={`video-${index}`}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}