import React from "react";
import SuccessHero from "../assets//images/AboutHeroImage.jpg"; // replace with your hero image
//import storyImg1 from "../assets/images/story1.jpg"; // replace with your story images
//import storyImg2 from "../assets/images/story2.jpg";

const stories = [
  {
    name: "Mama Juma Savings Group",
   // image: storyImg1,
    story:
      "Tujenge helped us structure our savings, and now we've collectively invested in poultry farming. The returns are life-changing!",
    location: "Kisumu",
  },
  {
    name: "Youth Empowerment Chama",
   // image: storyImg2,
    story:
      "We started with 5 members. Today, we are 30 strong with ongoing small business loans, thanks to Tujenge.",
    location: "Nakuru",
  },
];

export default function SuccessStories() {
  return (
    <div>
      
      <div
        className="relative h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${SuccessHero})` }}
      >
        <div className="absolute inset-0 bg-[#475B06] opacity-60"></div>
        <div className="relative z-10 h-full flex flex-col justify-center px-6 text-left text-[#f7c948]">
          <h1 className="text-4xl md:text-5xl font-bold italic">Success Stories</h1>
          <p className="text-white text-lg mt-4 max-w-xl">
            Real journeys from our users who are changing their lives through saving and investing together.
          </p>
        </div>
      </div>

      
      <section className="py-16 px-4 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          {stories.map((s, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={s.image} alt={s.name} className="w-full h-60 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{s.name}</h3>
                <p className="text-sm text-gray-500 italic mb-2">{s.location}</p>
                <p className="text-gray-700 text-md">{s.story}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      
      <div className="text-center py-10 bg-gray-50 text-[#475B06]">
        <h2 className="text-2xl font-bold mb-2">Ready to start your success story?</h2>
        <p className="mb-4">Join Tujenge and begin building your future today.</p>
        <a
          href="/signup"
          className="inline-block px-6 py-2 bg-[#e0b238] text-white rounded hover:bg-[#f7c948]"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
