"use client";

import { useRouter } from "next/navigation"; // ✅ Correct for App Router
import { useModal } from "@/components/ModalProvider";
import SearchBar from "@/components/SearchBar";


const Header = () => {
  const modal = useModal();
  const openSignIn = modal?.openSignIn;
  const router = useRouter();

  return (
    <header className="bg-white shadow-md w-full">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">

        {/* Logo */}
        <img src="/crowd_rise_logo.png" alt="CrowdRise Logo" className="h-12 w-auto" />

        {/* Search Bar - Centered */}
        <div className="w-full md:w-1/3">
          <SearchBar />
        </div>

        {/* Buttons - Aligned Right */}
        <div className="flex items-center space-x-6">
          <button className="text-gray-700 hover:text-gray-900" onClick={openSignIn}>Sign In</button>

          <button
            className="bg-blue-600 text-gray-700 px-10 py-4 rounded-md font-semibold hover:bg-blue-700"
            onClick={() => router.push("/signup")} // ✅ Redirect to sign-up page
          ></button>
        </div>
      </div>

      {/* Sign In Modal */}
      { /*<SignInModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
    </header>
  );
};

export default Header;
