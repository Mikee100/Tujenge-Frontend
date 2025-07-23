import { useState } from "react";
import FaqHero from "../assets/images/FaqHero.jpg";
import { FaPlus, FaMinus } from "react-icons/fa";


const faqs = [
  {
    question: "What is Tujenge Chama?",
    answer:
      "Tujenge Chama is a digital platform that helps groups save, invest, and grow together in a secure and transparent environment.",
  },
  {
    question: "How do I create a Chama?",
    answer:
      "Simply sign up, provide your group details, and follow the guided steps to register and invite members.",
  },
  {
    question: "Is Tujenge secure?",
    answer:
      "Yes, we use end-to-end encryption, OTP verification, and secure backend services to protect your data and transactions.",
  },
  {
    question: "Can I invite people to join my Chama?",
    answer:
      "Yes, you can send invites to members via email or link, allowing them to join your Chama seamlessly.",
  },
  {
    question: "Is there a fee to use Tujenge?",
    answer:
      "There are no registration fees. However, a small service fee applies during withdrawals and transactions.",
  },
  {
    question: "Can I use Tujenge on my phone?",
    answer:
      "Absolutely! Our platform is fully responsive and works great on both mobile and desktop devices.",
  },
  {
    question: "What happens if I forget my password?",
    answer:
      "You can reset your password easily by clicking 'Forgot Password' and following the instructions sent to your email.",
  },
  {
    question: "How can we invest as a Chama?",
    answer:
      "We offer curated investment opportunities for Chamas. You can view them under the 'Invest' section once logged in.",
  },
  {
    question: "Can I join more than one Chama?",
    answer:
      "Yes, you can join multiple Chamas using the same account and switch between them easily.",
  },
  {
    question: "Who can I contact for help?",
    answer:
      "Visit our Contact Us page or use the FAQ/Helpline section to reach our support team.",
  },
];

export default function Faq() {
     const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (i) => {
    setActiveIndex(activeIndex === i ? null : i);
  };

  return (
   <div className="bg-white ">
        <div className="relative h-[80vh] bg-cover bg-center "style={{ backgroundImage: `url(${FaqHero})` }}>
            <div className="absolute inset-0 bg-[#475B06] opacity-60"></div>
        
              <div className="relative z-10 h-full flex flex-col justify-center items-start px-4 md:px-16 text-left text-[#f7c948]">
                  <h1 className="text-4xl italic md:text-5xl font-bold mb-4  ">Questions</h1>
                  <p className="max-w-xl text-3xl text-white md:text-xl mt-10 font-semibold ">
                  Get to know more about Tujenge via frequently asked questions
                  </p>
              </div>
        </div>

    <div className="max-w-5xl mx-auto px-6 py-12 space-y-4">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="bg-white shadow-md rounded-xl transition-all overflow-hidden"
        >
          <button
            onClick={() => toggleIndex(i)}
            className="w-full flex justify-between items-center px-5 py-4 text-left font-semibold text-2xl text-green-900 hover:bg-gray-50 transition"
          >
            {faq.question}
            <span className="text-green-700">
              {activeIndex === i ? <FaMinus /> : <FaPlus />}
            </span>
          </button>
          {activeIndex === i && (
            <div className="px-5 pb-4 text-gray-600">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
    
  );
  
}
