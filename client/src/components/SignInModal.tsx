import { useState } from "react";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Close Button */}
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={onClose}>
          ✖
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>

        {/* Sign In Buttons */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-2 p-2 border rounded-md hover:bg-gray-100">
            <FaGoogle className="text-red-500" /> Sign in with Google
          </button>
          <button className="w-full flex items-center justify-center gap-2 p-2 border rounded-md hover:bg-gray-100">
            <FaApple className="text-black" /> Sign in with Apple
          </button>
          <button className="w-full flex items-center justify-center gap-2 p-2 border rounded-md hover:bg-gray-100">
            <FaFacebook className="text-blue-600" /> Sign in with Facebook
          </button>
        </div>

        {/* Divider */}
        <div className="my-4 text-center text-gray-500">or</div>

        {/* Email Sign In */}
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-2 border rounded-md mb-3"
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
          Continue with Email
        </button>

        {/* Links */}
        <div className="mt-4 text-center">
          <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
          <p className="mt-2">
            New here? <a href="#" className="text-blue-600 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
