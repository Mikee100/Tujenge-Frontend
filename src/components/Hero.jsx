import { Link } from "react-router-dom";
import HeroImage from "../assets/images/HeroImage.jpg"; // Change to your image path

export default function Hero() {
  return (
    <section className="relative bg-[#475B06] text-white overflow-hidden">
      {/* Wavy White SVG */}
      <svg className="absolute bottom-[-10px] left-0 w-full z-0" viewBox="0 0 1440 150" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#ffffff"
          fillOpacity="1"
          d="M0,64L60,85.3C120,107,240,149,360,144C480,139,600,85,720,64C840,43,960,53,1080,74.7C1200,96,1320,128,1380,144L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-4">
  
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Empower Your Future with <span className="text-[#FFD700]">Tujenge</span>
          </h1>
          <p className="text-lg text-gray-200">
            Tujenge is Kenya's platform for collective financial empowerment. We make saving
            and investing simple, social, and secure for all — from your chama to your community.
          </p>
          <div className="flex space-x-4">
            <Link
              to="/save/how-it-works"
              className="bg-[#FFD700] text-[#475B06] font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="border border-white text-white px-6 py-3 rounded hover:bg-white hover:text-[#475B06] transition"
            >
              Learn More
            </Link>
          </div>
        </div>

       
        <div className="flex justify-center lg:justify-end">
          <img
            src={HeroImage}
            alt="Hero visual"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
