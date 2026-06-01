"use client";

import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Share Innovative Startup Ideas",
    description:
      "Connect with entrepreneurs and inspire the next generation of startups.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop",
  },

  {
    id: 2,
    title: "Discover Trending Business Concepts",
    description:
      "Explore exciting startup opportunities from creative innovators.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1470&auto=format&fit=crop",
  },

  {
    id: 3,
    title: "Get Feedback From The Community",
    description:
      "Validate your startup ideas through comments and discussions.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[75vh] overflow-hidden">
      
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            current === index
              ? "opacity-100 z-10"
              : "opacity-0 z-0"
          }`}
        >
          
          {/* Background Image */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Content */}
          <div className="relative z-20 flex h-full items-center">
            
            <div className="container mx-auto px-4">
              
              <div className="max-w-3xl">
                
                <h1 className="text-4xl font-extrabold leading-tight text-white md:text-7xl">
                  {slide.title}
                </h1>

                <p className="mt-6 max-w-2xl text-lg text-slate-200 md:text-xl">
                  {slide.description}
                </p>

                <div className="mt-8">
                  <Link href="/ideas">
                    <Button
                      size="lg"
                      className="h-14 rounded-full bg-blue-600 px-10 text-lg font-bold text-white hover:bg-blue-700"
                    >
                      Explore Ideas
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition ${
              current === index
                ? "bg-white"
                : "bg-white/40"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Banner;