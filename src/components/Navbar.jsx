import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import Money from "../assets/images/Money.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleDropdown = (menu) =>
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  const handleMobileDropdown = (menu) =>
    setMobileDropdownOpen(mobileDropdownOpen === menu ? null : menu);

  const handleLogout = () => {
    localStorage.removeItem("access");
    // Remove other auth info if needed
    navigate("/login");
  };

  return (
    <nav className="bg-white fixed w-full z-50 shadow-md px-4 py-0.5 min-h-[44px]">
      <div className="max-w-7xl mx-auto flex items-center justify-between min-h-[44px]">
        {/* LEFT SECTION: Logo + Dropdowns */}
        <div className="flex items-center space-x-8">
          {/* Logo + Text */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 overflow-hidden bg-white rounded-full">
              <img
                src={Money}
                alt="Tujenge Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-lg font-semibold text-[#96b420] leading-none tracking-tight">
              TUJENGE
              <br />
              <span className="text-yellow-600 text-base">KENYA</span>
            </span>
          </Link>

          {/* Dropdown Menus - Desktop */}
          <div className="hidden md:flex space-x-6">
            {[
              {
                label: "Save",
                links: [
                 
                  { to: "/save/group", text: "Group Saving" },
                ],
              },
              {
                label: "Invest",
                links: [
                  { to: "/invest/opportunities", text: "Opportunities" },
                  { to: "/invest/stories", text: "Success Stories" },
                ],
              },
              {
                label: "Learn",
                links: [
                  
                  { to: "/learn/how-tujenge-works", text: "How Tujenge Works" },
                ],
              },
              {
                label: "More",
                links: [
                  { to: "/about", text: "About Us" },
                  { to: "/faq", text: "FAQ / Helpline" },
                  { to: "/contact", text: "Contact Us" },
                ],
              },
            ].map((menu) => (
              <div key={menu.label} className="relative group">
                <button
                  className="text-gray-700 font-medium"
                  onClick={() => handleDropdown(menu.label)}
                >
                  {menu.label} ▾
                </button>
                {dropdownOpen === menu.label && (
                  <div className="absolute bg-white mt-2 shadow-lg rounded w-48 z-50">
                    {menu.links.map((link, i) => (
                      <Link
                        key={i}
                        to={link.to}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {link.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION: Login Icon + Hamburger */}
        <div className="flex items-center space-x-4">
          {/* user icon*/}
          <div className="relative">
            <button onClick={() => setDropdownOpen(dropdownOpen === "user" ? null : "user")}>
              <FaUserCircle className="text-2xl text-gray-700 hover:text-[#475B06]"/>
            </button>
                {dropdownOpen === "user" && !localStorage.getItem("access") && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(null)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(null)}
                    >
                      Signup
                    </Link>
                  </div>
                   )}


          </div>


         {/* Logout Button (show if logged in) */}
         {localStorage.getItem("access") && (
           <button
             onClick={handleLogout}
             className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
           >
             Logout
           </button>
         )}

          {/* Hamburger for Mobile */}
          <button className="md:hidden" onClick={toggleMenu}>
            {menuOpen ? (
              <FaTimes className="text-xl text-gray-700" />
            ) : (
              <FaBars className="text-xl text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Hamburger Dropdown Menu - Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-white mt-1 shadow-lg rounded-lg p-2 space-y-2">
          {[
            {
              label: "Save",
              links: [
              
                { to: "/save/group", text: "Group Saving" },
              ],
            },
            {
              label: "Invest",
              links: [
                { to: "/invest/opportunities", text: "Opportunities" },
                { to: "/invest/stories", text: "Success Stories" },
              ],
            },
            {
              label: "Learn",
              links: [
                
                { to: "/learn/how-tujenge-works", text: "How Tujenge Works" },
              ],
            },
            {
              label: "More",
              links: [
                { to: "/about", text: "About Us" },
                { to: "/faq", text: "FAQ / Helpline" },
                { to: "/contact", text: "Contact Us" },
              ],
            },
          ].map((menu) => (
            <div key={menu.label}>
              <button
                className="w-full text-left font-medium text-gray-800"
                onClick={() => handleMobileDropdown(menu.label)}
              >
                {menu.label} ▾
              </button>
              {mobileDropdownOpen === menu.label && (
                <div className="ml-4 mt-1">
                  {menu.links.map((link, i) => (
                    <Link
                      key={i}
                      to={link.to}
                      className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
