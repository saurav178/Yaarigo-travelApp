import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { reviews, user } from "../data/profileData";

export default function ReviewsTab() {
  return (
    <>
      <div className="flex items-center justify-between mt-4 ">
        <div>
          <h3 className="font-semibold ml-4">Travelers Reviews</h3>
          <div className="text-sm text-gray-500 mt-1 flex items-center gap-1 ml-4 mt-4">
            <FaStar className="text-yellow-400" /> {user.rating} (
            {user.reviews} reviews)
          </div>
        </div>
        <div className="text-sm text-[#F76C6C] cursor-pointer mr-4 ">
          Show All Reviews
        </div>
      </div>

      <div className="mt-4 ml-4  mr-4  grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.slice(0, 3).map((r) => (
          <div
            key={r.id}
            className="bg-gray-50 p-4 rounded-lg border-3 mb-4 border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  S
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    {r.author}{" "}
                    <span className="text-xs text-red-500 font-bold ml-2">
                      Verified User
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(r.date).toLocaleDateString("en-GB")}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-400">⋯</div>
            </div>

            <div className="mt-3 flex items-center gap-1">
              {Array.from({ length: r.rating }, (_, i) => (
                <span key={i} className="text-yellow-400">
                  ★
                </span>
              ))}
            </div>

            <div className="mt-3 text-sm text-gray-700">{r.text}</div>
          </div>
        ))}
      </div>
    </>
  );
}
