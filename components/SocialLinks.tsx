import { FaTwitter, FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";

const SocialLinks = () => {
  return (
    <div className="flex items-center justify-center space-x-6 mt-3">
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">
        <FaTwitter size={24} />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500">
        <FaInstagram size={24} />
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-500">
        <FaYoutube size={24} />
      </a>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700">
        <FaFacebook size={24} />
      </a>
    </div>
  );
};

export default SocialLinks;
