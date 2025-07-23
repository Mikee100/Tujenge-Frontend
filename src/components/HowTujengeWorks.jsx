import HeroImage from "../assets/images/AboutHeroImage.jpg";
import { FaLock, FaChartLine, FaUsers } from "react-icons/fa";

const steps = [
  {
    title: "Members Contribute Funds",
    description: "Each member contributes a set amount regularly into the group’s digital wallet."
  },
  {
    title: "Funds Collected in Group Wallet",
    description: "The total contributions are securely pooled and visible to all members in real-time."
  },
  {
    title: "Admin Reviews & Approves Usage",
    description: "The group admin evaluates fund usage proposals and approves based on agreed terms."
  },
  {
    title: "Investments Made by Chama",
    description: "Approved funds are invested in vetted opportunities like agribusiness, real estate, or microloans."
  },
  {
    title: "Returns Earned on Investments",
    description: "The Chama earns profits or interest from investments made, tracked within the platform."
  },
  {
    title: "Reports Generated",
    description: "Automated financial reports show how funds were used, performance, and earnings."
  },
  {
    title: "Withdrawals or Re-Investment",
    description: "Members choose to either withdraw their share of the returns or reinvest into new opportunities."
  }
];

export default function HowTujengeWorks() {
  return (
    <div className="text-gray-800">
      {/* HERO */}
      <div
        className="relative h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        <div className="absolute inset-0 bg-[#475B06] opacity-60"></div>
        <div className="relative z-10 h-full flex flex-col justify-center px-6 text-left text-[#f7c948]">
          <h1 className="text-4xl md:text-5xl font-bold italic">How Tujenge Works</h1>
          <p className="text-white text-lg mt-4 max-w-xl">
                Discover how we manage, grow, and protect your Chama's savings.
          </p>
        </div>
      </div>

   
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-[#475B06] mb-8 text-center">How Money Flows</h2>
        <ol className="relative border-l-4 border-[#B8D62D]">
          {steps.map((step, index) => (
            <li key={index} className="mb-10 ml-6">
              <div className="absolute w-5 h-5 bg-[#475B06] rounded-full -left-2.5 border-4 border-white"></div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-600 mt-2">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="bg-[#F8F9FA] py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FaChartLine className="text-4xl mx-auto text-[#475B06] mb-4" />
          <h2 className="text-3xl font-bold mb-4">Earnings & Returns</h2>
          <p className="text-gray-700 text-lg">
            Tujenge Chama helps grow your savings through collective investments.
            You earn returns based on how your group chooses to reinvest and distribute earnings.
          </p>
        </div>
      </div>

    
      <div className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <FaUsers className="text-4xl text-[#475B06] mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">Group Transparency</h3>
            <p>All members view contributions, transactions, and reports in real-time.</p>
          </div>
          <div>
            <FaChartLine className="text-4xl text-[#475B06] mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">Smart Growth</h3>
            <p>Your funds are pooled and invested wisely with shared decision making.</p>
          </div>
          <div>
            <FaLock className="text-4xl text-[#475B06] mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">Top-tier Security</h3>
            <p>All transactions and data are protected with modern encryption and safe handling.</p>
          </div>
        </div>
      </div>

      
      <div className="bg-white  text-center py-10 px-4">
        <h2 className="text-2xl text-[#475B06] font-bold mb-2">Your Chama is in Safe Hands</h2>
        <p className="text-lg">
          Tujenge uses bank-grade security, OTP verification, and admin approvals to keep your funds secure.
        </p>
      </div>
    </div>
  );
}
