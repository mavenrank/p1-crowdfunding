import { FaTwitter, FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";

const SocialLinks = () => {
  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold">Follow Us</h3>
      <div className="flex justify-center space-x-6 mt-3">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter size={24} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={24} />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <FaYoutube size={24} />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook size={24} />
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;