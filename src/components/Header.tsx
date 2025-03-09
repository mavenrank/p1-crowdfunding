"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserCircle } from "@fortawesome/free-regular-svg-icons"; // Regular icon for sign-in
import { faUser as faUserSolid, faGear, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"; // Solid icons
import SearchBar from "@/components/SearchBar";
import CategoryList from "@/components/ui/CategoryList";

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    const redirectChoice = localStorage.getItem("userRedirect");

    if (userRole && !redirectChoice) {
      setShowRedirectModal(true);
    }

    // ✅ Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md w-full">
      <div className="container mx-auto flex flex-col">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between py-3 px-6">
          {/* Logo */}
          <img
            src="/crowd_rise_logo.png"
            alt="CrowdRise Logo"
            className="h-12 w-auto cursor-pointer"
            onClick={() => router.push("/")}
          />

          {/* Search Bar */}
          <div className="w-full md:w-1/3">
            <SearchBar />
          </div>

          {/* Right Side: Profile or Sign-In */}
          <div className="flex items-center space-x-6">
            {session?.user ? (
              <div className="relative" ref={dropdownRef}>
                {/* ✅ Profile Icon (Click to Toggle Dropdown) */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-gray-700 hover:text-gray-900 text-2xl flex items-center space-x-2"
                >
                  <FontAwesomeIcon icon={faUserSolid} className="text-blue-600" />
                </button>

                {/* ✅ Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg p-3">
                    {/* ✅ Display User Info */}
                    <div className="text-sm text-gray-600 mb-2 text-center border-b pb-2">
                      <p className="font-semibold">{session.user.name || session.user.email}</p>
                    </div>

                    {/* ✅ Settings Button */}
                    <button
                      onClick={() => router.push("/settings")}
                      className="flex items-center w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                    >
                      <FontAwesomeIcon icon={faGear} className="mr-2 text-gray-600" />
                      Settings
                    </button>

                    {/* ✅ Sign Out Button */}
                    <button
                      onClick={() => signOut()}
                      className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md mt-1"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-red-600" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ✅ Show Sign In & Get Started Buttons if Not Logged In */
              <>
                <button
                  className="text-gray-700 hover:text-gray-900 text-2xl"
                  onClick={() => router.push("/signin")}
                >
                  <FontAwesomeIcon icon={faUserCircle} className="text-gray-500" />
                </button>

                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700"
                  onClick={() => router.push("/signup")}
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <CategoryList />
        </div>
        {/* First-Time User Redirection Modal */}
        {showRedirectModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
              <h2 className="text-xl font-semibold mb-4">Where would you like to go?</h2>
              <button
                className="bg-blue-600 text-white w-full py-2 rounded-md mb-2"
                onClick={() => {
                  localStorage.setItem("userRedirect", "/dashboard");
                  setShowRedirectModal(false);
                  router.push("/dashboard");
                }}
              >
                Go to My Dashboard
              </button>
              <button
                className="bg-gray-200 text-gray-800 w-full py-2 rounded-md"
                onClick={() => {
                  localStorage.setItem("userRedirect", "/");
                  setShowRedirectModal(false);
                  router.push("/");
                }}
              >
                Explore Campaigns
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;