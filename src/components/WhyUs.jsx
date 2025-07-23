import React from "react";

export default function WhyUs() {
  const reasons = [
    {
      icon: "🔒",
      title: "Safe & Secure",
      desc: "Your savings and investments are protected with bank-level security and full transparency.",
    },
    {
      icon: "👥",
      title: "Group Savings",
      desc: "Easily save as a chama or community group with flexible tools designed for teamwork.",
    },
    {
      icon: "📈",
      title: "Invest Smart",
      desc: "Access handpicked investment opportunities with real returns for you and your group.",
    },
    {
      icon: "🌍",
      title: "Accessible to All",
      desc: "Tujenge is built for everyone, whether you're in the city or in rural Kenya.",
    },
    {
      icon: "💰",
      title: "No Hidden Fees",
      desc: "Transparent pricing means no surprises when managing your money.",
    },
    {
      icon: "📚",
      title: "Learn & Grow",
      desc: "Financial education resources that empower you to make informed decisions.",
    },
    {
      icon: "⚡",
      title: "Fast Onboarding",
      desc: "Create an account and start saving or investing in minutes—no paperwork needed.",
    },
    {
      icon: "📱",
      title: "Mobile-Friendly",
      desc: "Use Tujenge seamlessly on your phone with a user experience designed for mobile.",
    },
    {
      icon: "🛡️",
      title: "Community-Driven",
      desc: "We build with you and for you, prioritizing your needs as a group and individual.",
    },
  ];

  return (
    <section className="relative bg-white py-16 px-6 md:px-20 text-[#475B06]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          Why Choose Tujenge?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, i) => (
            <div
              key={i}
              className="bg-[#f8fafc] rounded-lg p-6 shadow-md hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    
    </section>
  );
}
