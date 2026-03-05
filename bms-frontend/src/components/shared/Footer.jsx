import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPinterestP, FaLinkedin } from "react-icons/fa";
import mainLogo from "../../assets/main-icon-white.png";

const Footer = () => {
  return (
    <footer className="bg-[#2b2b2b] text-gray-400 text-sm">
      <div className="border-t border-gray-600 w-full">
        {/* Logo */}
        <div className="flex flex-col items-center py-6">
          <img src={mainLogo} alt="BookMyScreen Logo" className="w-28 mb-4" />
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4 mb-4">
          <FaFacebookF className="w-8 h-8 p-2 rounded-full bg-gray-700 text-white cursor-pointer hover:bg-blue-600" />
          <FaTwitter className="w-8 h-8 p-2 rounded-full bg-gray-700 text-white cursor-pointer hover:bg-sky-500" />
          <FaInstagram className="w-8 h-8 p-2 rounded-full bg-gray-700 text-white cursor-pointer hover:bg-pink-500" />
          <FaYoutube className="w-8 h-8 p-2 rounded-full bg-gray-700 text-white cursor-pointer hover:bg-red-600" />
          <FaPinterestP className="w-8 h-8 p-2 rounded-full bg-gray-700 text-white cursor-pointer hover:bg-red-500" />
          <FaLinkedin className="w-8 h-8 p-2 rounded-full bg-gray-700 text-white cursor-pointer hover:bg-blue-700" />
        </div>

        {/* Copyright */}
        <p className="text-center text-xs px-4 max-w-4xl mx-auto mb-2">
          Copyright 2025 © BookmyScreen Pvt Ltd. All Rights Reserved.
        </p>
        <small className="block text-center px-4 max-w-3xl mx-auto">
          The content and images used on this site are copyright protected and
          copyrights vest with the respective owners. The usage of the content
          and images on this website is intended to promote the works and no
          endorsement of the artist shall be implied.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
