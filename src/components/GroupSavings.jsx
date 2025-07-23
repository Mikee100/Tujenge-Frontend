import SavingsImg from "../assets/images/AboutHeroImage.jpg";
import { FaUsers, FaPiggyBank, FaChartLine, FaRegCalendarAlt } from "react-icons/fa";

export default function GroupSavings() {
  return (
    <div className="text-gray-800">
     
      <div
        className="relative h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${SavingsImg})` }}
      >
        <div className="absolute inset-0 bg-[#475B06] opacity-60"></div>
        <div className="relative z-10 h-full flex flex-col justify-center px-6 text-left text-[#f7c948]">
          <h1 className="text-4xl md:text-5xl font-bold italic">Group Savings</h1>
          <p className="text-white text-lg mt-4 max-w-xl">
            Empower your Chama to save consistently and reach shared financial goals — together.
          </p>
        </div>
      </div>

    
      <div className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#475B06] text-center mb-12">How Group Savings Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        
          <div className="bg-white border shadow rounded-lg p-6 hover:shadow-md">
            <FaUsers className="text-4xl text-[#B8D62D] mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-[#475B06]">Members Contribute</h3>
            <p className="text-gray-600">Each member deposits an agreed amount regularly to the group fund.</p>
          </div>

    
          <div className="bg-white border shadow rounded-lg p-6 hover:shadow-md">
            <FaChartLine className="text-4xl text-[#B8D62D] mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-[#475B06]">Set a Common Goal</h3>
            <p className="text-gray-600">Define a goal — like buying land, investing, or covering school fees — and work toward it as a group.</p>
          </div>

         
          <div className="bg-white border shadow rounded-lg p-6 hover:shadow-md">
            <FaPiggyBank className="text-4xl text-[#B8D62D] mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-[#475B06]">Save & Track</h3>
            <p className="text-gray-600">Monitor progress with digital records and alerts. Everyone stays accountable and informed.</p>
          </div>

          <div className="bg-white border shadow rounded-lg p-6 hover:shadow-md">
            <FaRegCalendarAlt className="text-4xl text-[#B8D62D] mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-[#475B06]">Withdraw at Agreed Time</h3>
            <p className="text-gray-600">Funds are only accessed during agreed periods or emergencies — keeping the savings culture strong.</p>
          </div>
        </div>
      </div>

     
      <div className="bg-white text-gray-900 py-12 text-center px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Build Wealth Together</h2>
        <p className="mb-6 text-lg max-w-2xl mx-auto">
          Start a savings plan with your group today and move closer to your financial dreams — one step at a time.
        </p>
        <button className="bg-[#f7c948] text-[#475B06] px-6 py-3 font-semibold rounded hover:bg-yellow-400 transition">
          Start Saving Now
        </button>
      </div>
    </div>
  );
}
