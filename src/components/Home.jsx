//import React from "react";
import Hero from "./Hero";
import WhyUs from "./WhyUs";
import RegisterSteps from "./RegisterSteps";
import ReviewCarousel from "./Review";

export default function Home() {
  return (
    <main>
        <Hero />
        <WhyUs/>
        <RegisterSteps/>
        <ReviewCarousel/>
    </main>
  );
}
