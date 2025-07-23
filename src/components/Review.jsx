import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Amina from "../assets/images/Amina.jpg";
import Daniel from "../assets/images/Daniel.jpg";
import Grace from "../assets/images/Grace.jpg";
import Jane from "../assets/images/Jane.jpg";

const testimonials = [
  {
    name: "Jane Mwangi",
    role: "Chama Chairlady",
    image: Jane,
    quote:
      "Tujenge helped our chama go digital. Saving has never been easier or more transparent!",
  },
  {
    name: "Daniel Otieno",
    role: "Treasurer",
    image: Daniel,
    quote:
      "We used to handle everything manually. Tujenge changed that and brought real accountability.",
  },
  {
    name: "Grace Wambui",
    role: "Member",
    image: Grace,
    quote:
      "I love being able to track my savings and contributions directly from my phone.",
  },
];

export default function ReviewCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % testimonials.length);

  const { name, role, image, quote } = testimonials[current];

  return (
    <div className="bg-white py-16 px-4 md:px-12 lg:px-24 text-center">
      <h2 className="text-3xl font-bold text-[#475B06] mb-10">
        What Our Users Say
      </h2>

      <div className="relative max-w-xl mx-auto bg-gray-100 p-8 rounded-lg shadow-md transition duration-300 ease-in-out">
        
        <div className="flex flex-col items-center mb-4">
          <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-full border-2 border-yellow-500 mb-2"
          />
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">{role}</p>
        </div>

        
        <p className="text-lg italic text-gray-700 mt-4">
          “{quote}”
        </p>

        
        <div className="absolute top-1/2 -translate-y-1/2 left-4">
          <button onClick={prevSlide} className="text-gray-600 hover:text-[#475B06]">
            <FaArrowLeft />
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-4">
          <button onClick={nextSlide} className="text-gray-600 hover:text-[#475B06]">
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
