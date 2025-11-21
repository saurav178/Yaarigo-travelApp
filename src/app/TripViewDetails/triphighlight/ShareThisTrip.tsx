import { FaFacebookF, FaTwitter, FaLink } from "react-icons/fa";
 
const ShareThisTrip = () => {
  return (
<<<<<<< HEAD
<div className="rounded-lg p-6 bg-white w-full shadow-lg hover:shadow-2xl transition-all duration-300">
=======
<div className=" p-6 bg-white w-full shadow-lg hover:shadow-2xl transition-all duration-300">
>>>>>>> 63e90ead738cf5ea157132bf932819acaa4b2043
      <h2 className="text-lg font-semibold mb-3">Share this trip</h2>
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <button className="p-2 bg-gray-900 rounded-full hover:bg-gray-200">
            <FaFacebookF />
          </button>
          <button className="p-2 bg-gray-900 rounded-full hover:bg-gray-200">
            <FaTwitter />
          </button>
          <button className="p-2 bg-gray-900 rounded-full hover:bg-gray-200">
            <FaLink />
          </button>
        </div>
    <button className="px-4 py-1 border rounded-lg text-sm font-medium bg-[#121212] text-white hover:bg-[#2a2a2a]">
  Copy
</button>
      </div>
    </div>
  );
};
 
export default ShareThisTrip;
 
 