import React from "react";
import AboutHero from "./AboutHero";


export default function About() {
  return (
    <div className="bg-white text-gray-800">
     <AboutHero/>
      
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 ">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[#475B06]">Our Mission</h2>
            <p>
              To provide a reliable, digital platform that enables Chama groups to save,
              invest, and grow together in a secure and transparent way.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[#475B06]">Our Vision</h2>
            <p>
              To be the leading digital financial partner for Chama groups across Africa.
            </p>
          </div>
        </div>
      </section>

      
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#475B06]">Our Story</h2>
          <p className="text-center">
            Tujenge Chama was born from a need to bring transparency and ease to the
            traditional Chama system. By blending the power of community saving with
            cutting-edge technology, we've built a platform that ensures accountability,
            security, and impact for every group. Our journey started with a simple idea —
            to make saving accessible and meaningful for everyone.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#475B06] mb-10">
          Our Core Values
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Transparency", text: "We believe in openness and accountability." },
            { title: "Security", text: "Your savings and data are protected." },
            { title: "Community", text: "Together, we thrive and grow." },
            { title: "Empowerment", text: "We equip Chamas with tools to succeed." },
            { title: "Innovation", text: "We constantly evolve to meet your needs." },
            { title: "Trust", text: "Your trust is our top priority." },
          ].map((value, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded shadow p-6 text-center hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-[#475B06] mb-2">{value.title}</h3>
              <p className="text-sm">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

     
      <section className="py-16 bg-gray-50 mt-20 text-center px-6">
        <h2 className="text-3xl font-bold mb-4 text-[#475B06]">Ready to start saving?</h2>
        <p className="mb-6">Create your Chama group today and take control of your financial journey.</p>
        <a
          href="/signup"
          className="inline-block bg-[#F4C542] text-white px-6 py-3 rounded shadow hover:bg-[#3a4c04] transition"
        >
          Sign Up Now
        </a>
      </section>
    </div>
  );
}
