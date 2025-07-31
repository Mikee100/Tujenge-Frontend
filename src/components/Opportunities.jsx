import { FaLeaf, FaHome, FaCoins, FaChartPie } from "react-icons/fa";
import HeroImage from "../assets/images/AboutHeroImage.jpg";



export default function Opportunities() {
  return (
    <div className="text-gray-800">
     
      <div
        className="relative h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        <div className="absolute inset-0 bg-[#475B06] opacity-60"></div>
        <div className="relative z-10 h-full flex flex-col justify-center px-6 text-left text-[#f7c948]">
          <h1 className="text-4xl md:text-5xl font-bold italic">Investment Opportunities</h1>
          <p className="text-white text-lg mt-4 max-w-xl">
            Discover ways your Chama can grow wealth. We bring trusted, verified ventures your group can consider.
          </p>
        </div>
      </div>

      <div className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#475B06] text-center mb-12">Explore Featured Avenues</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
      
          <div className="bg-white border shadow-sm rounded-lg p-6 text-center hover:shadow-md transition">
            <FaLeaf className="text-4xl text-[#B8D62D] mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-[#475B06] mb-2">Agribusiness</h3>
            <p className="text-gray-600">Invest in farming cooperatives, greenhouses, or livestock businesses for stable and ethical returns.</p>
          </div>

         
          <div className="bg-white border shadow-sm rounded-lg p-6 text-center hover:shadow-md transition">
            <FaHome className="text-4xl text-[#B8D62D] mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-[#475B06] mb-2">Real Estate</h3>
            <p className="text-gray-600">Join property development projects or pooled land investment options ideal for long-term growth.</p>
          </div>

         
          <div className="bg-white border shadow-sm rounded-lg p-6 text-center hover:shadow-md transition">
            <FaCoins className="text-4xl text-[#B8D62D] mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-[#475B06] mb-2">Government Bonds</h3>
            <p className="text-gray-600">Put your group savings into low-risk treasury bills or government infrastructure bonds with guaranteed returns.</p>
          </div>

          <div className="bg-white border shadow-sm rounded-lg p-6 text-center hover:shadow-md transition">
            <FaChartPie className="text-4xl text-[#B8D62D] mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-[#475B06] mb-2">Small Businesses</h3>
            <p className="text-gray-600">Support growing local enterprises vetted by our partners, and receive dividends or shared revenue.</p>
          </div>
        </div>
      </div>

    
      <div className="bg-white  py-12 text-center px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#475B06] mb-4">Ready to Invest as a Team?</h2>
        <p className="mb-6 text-lg max-w-2xl mx-auto text-gray-900">
          Opportunities are reviewed regularly to ensure security, viability, and impact. Talk with your group and explore together.
        </p>
          <button className="bg-[#e0b238] text-[#475B06] px-6 py-3 font-semibold rounded hover:bg-[#f7c948] transition">
          Get Started Now
        </button>
      </div>
    </div>
  );
}
