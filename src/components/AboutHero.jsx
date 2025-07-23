import React from "react";
import AboutHeroImage from "../assets/images/AboutHeroImage.jpg"; // replace with your actual image

export default function AboutHero() {
  return (
    <div
      className="relative h-[60vh] bg-cover bg-center p-60"
      style={{ backgroundImage: `url(${AboutHeroImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#475B06] opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-[#f7c948] px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About<br /> Tujenge </h1>
        <p className="max-w-xl text-lg md:text-xl mt-10">
          Learn how we're transforming collective saving and investing for communities.
        </p>
      </div>
    </div>
  );
}
