"use client";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import { Quote } from "lucide-react";



type Testimonial = {
  name: string;
  title?: string;
  avatar?: string;
  text: string;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}
type ClientCarouselProps = {
  testimonials: Testimonial[];
};

export function ClientCarousel({ testimonials }: ClientCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 24,
        },
      },
    },
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 6000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div 
        ref={sliderRef} 
        className="keen-slider"
        role="region"
        aria-label="Client testimonials carousel"
        aria-live="polite"
      >
        {testimonials.map((t, idx) => (
          <div key={idx} className="keen-slider__slide flex" role="group" aria-label={`Testimonial ${idx + 1} of ${testimonials.length}`}>
            <div className="bg-white border border-gray-200 text-black rounded-2xl p-8 shadow-sm flex flex-col justify-between w-full">
              <Quote className="text-black h-8 w-8 mb-4" aria-hidden="true" />
              <p className="text-lg leading-relaxed mb-6">“{t.text}”</p>
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100">
                {t.avatar ? (
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="rounded-full object-contain"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-semibold text-sm">
                    {getInitials(t.name)}
                  </div>
                )}
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-600">{t.title}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 space-x-2" role="tablist" aria-label="Testimonial carousel navigation">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`w-3 h-3 rounded-full transition-colors ${
              idx === currentSlide ? "bg-black" : "bg-gray-300"
            }`}
            role="tab"
            aria-selected={idx === currentSlide}
            aria-label={`Go to testimonial slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
