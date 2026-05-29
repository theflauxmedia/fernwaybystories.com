"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const VIDEO_SRC = "/bgvd.mp4";
const POSTER_SRC = "/ambience/1.webp";

export default function HeroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useVideo, setUseVideo] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setUseVideo(!reduced.matches);
    update();
    reduced.addEventListener("change", update);
    return () => reduced.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!useVideo || !video) return;

    const play = () => {
      video.play().catch(() => setUseVideo(false));
    };

    play();
    video.addEventListener("loadeddata", play);
    return () => video.removeEventListener("loadeddata", play);
  }, [useVideo]);

  return (
    <>
      {useVideo ? (
        <video
          ref={videoRef}
          className="hero-bg-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER_SRC}
          aria-hidden="true"
          onError={() => setUseVideo(false)}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      ) : null}
      <Image
        src={POSTER_SRC}
        alt=""
        fill
        priority
        className={`hero-bg-fallback object-cover${useVideo ? " hero-bg-fallback--hidden" : ""}`}
        sizes="100vw"
      />
    </>
  );
}
