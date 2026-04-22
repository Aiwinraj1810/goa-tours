"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface VideoBlockProps {
  src: string;
  fallback?: string;
  alt?: string;
}

export default function VideoBlock({ src, fallback, alt = "" }: VideoBlockProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  if (fallback) {
    return (
      <section className="relative w-full h-screen overflow-hidden">
        <Image src={fallback} alt={alt} fill className="object-cover" />
      </section>
    );
  }

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-start justify-end text-left text-white px-10 pb-8 md:px-16 md:pb-10">
        <p className="text-xs uppercase tracking-widest text-white/70 mb-2">
          Discover Goa
        </p>
        <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-2">
          Where Every Moment Feels Like Paradise
        </h2>
        <p className="text-sm text-white/80 max-w-xl">
          From sun-soaked beaches to timeless heritage trails — Real Goa
          Holidays crafts journeys that go beyond the ordinary.
        </p>
      </div>
    </section>
  );
}
