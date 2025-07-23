import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import Money from "../assets/images/Money.png";

export default function Footer() {
  return (
    <footer className="bg-[#021006] text-white px-4 py-4 text-sm ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 ">
      
        <div>
            <div>
                <div className="mb-4 w-40 h-30 overflow-hidden bg-[#021006]">
                <img
                src={Money}
                alt="Tujenge Logo"
                className="h-full w-full object-cover "
                />
                </div>
            <span className="text-[#96b420]  font-semibold text-2xl ">TUJENGE</span>

          </div>
          <p className="text-gray-300 leading-relaxed">
           We empower individuals, families, and groups to build their financial futures together — securely, transparently, and conveniently.
           Whether you're saving for education, starting a chama, planning a big event, or looking to invest wisely, Tujenge provides the tools and trust to make it happen.
           Join a growing movement of changemakers who are transforming their communities one goal at a time.
          </p>
        </div>

        <div>
            <h3 className="text-[#96b420] font-semibold mb-3 text-2xl ">MENU</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-10 text-[#e2e8f0] ">
                <Link to="/about" className="hover:text-[#f7c948] hover:underline">About Us</Link> |
                <Link to="/faq" className="hover:text-[#f7c948] hover:underline">FAQ/Helpline</Link> |
                <Link to="/save/group" className="hover:text-[#f7c948] hover:underline">Group Savings</Link> |
                <Link to="/save/how-it-works" className="hover:text-[#f7c948] hover:underline">How It Works</Link> |
                <Link to="/invest/opportunities" className="hover:text-[#f7c948] hover:underline">Opportunities</Link> |
                <Link to="/invest/stories" className="hover:text-[#f7c948] hover:underline">Success Stories</Link> |
                <Link to="/learn/finance-101" className="hover:text-[#f7c948] hover:underline">Finance 101</Link> |
                <Link to="/learn/glossary" className="hover:text-[#f7c948] hover:underline">Glossary</Link> |
                <Link to="/learn/how-tujenge-works" className="hover:text-[#f7c948] hover:underline">How Tujenge Works</Link> |
                
            </div>
        </div>

        <div>
            <h3 className="text-[#96b420] font-semibold mb-3 text-2xl ">CONTACT US</h3>
            <p>Tujenge HQ, Innovation Street, <br/>
            off Ngong Rd , Nairobi, Kenya
            </p>
            <p className="text-[#e2e8f0] mb-1"> Call us at : +254 791 527 147</p>
            <p className="text-[#e2e8f0] mb-4">Email us at: support@tujenge.africa</p>
           <div className="flex space-x-4 text-[#e2e8f0] text-lg">
            <a href="#"><FaFacebookF className="hover:text-[#f7c948]" /></a>
            <a href="#"><FaTwitter className="hover:text-[#f7c948]"/></a>
            <a href="#"><FaYoutube className="hover:text-[#f7c948]"/></a>
            <a href="#"><FaInstagram className="hover:text-[#f7c948]"/></a>
           </div>
        </div>

        
      </div>

        <hr className="my-6 border-[#2d3748]" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-[#a0aec0]">
            <p>© 2025 Tujenge. All Rights Reserved</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
            </div>
        </div>
    </footer>
  );
}
