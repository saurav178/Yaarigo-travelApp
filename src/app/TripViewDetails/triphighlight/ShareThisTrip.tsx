import { FaFacebookF, FaTwitter, FaLink } from "react-icons/fa";

const ShareThisTrip = () => {
  return (
    <div className=" p-6 bg-white w-full shadow-lg hover:shadow-2xl transition-all duration-300">
      <h2 className="text-lg font-semibold mb-3">Share this trip</h2>
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <button className="p-2 bg-gray-900 rounded-full hover:bg-gray-200 text-white hover:text-gray-900 transition-colors duration-300 cursor-pointer">
            <FaFacebookF />
          </button>
          <button className="p-2 bg-gray-900 rounded-full hover:bg-gray-200 text-white hover:text-gray-900 transition-colors duration-300 cursor-pointer">
            <FaTwitter />
          </button>
          <button className="p-2 bg-gray-900 rounded-full hover:bg-gray-200 text-white hover:text-gray-900 transition-colors duration-300 cursor-pointer">
            <FaLink />
          </button>
        </div>

        <button className="px-3 py-1 border bg-[#1D4350] text-white hover:bg-[#16333b] transition-colors duration-300 cursor-pointer">
          Copy
        </button>
      </div>
    </div>
  );
};

export default ShareThisTrip;
