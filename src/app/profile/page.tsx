'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt, FaCheckCircle, FaCalendarAlt, FaUserFriends } from 'react-icons/fa';
import { IoMdChatbubbles } from 'react-icons/io';
import { MapPin, CalendarDays, Users } from "lucide-react";



const user = {
  rating: "4.1",
  reviews: 410,
};

const reviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    title: "Bali Adventure",
    date: "2023-11-15",
    rating: 5,
    text: "Absolutely loved the trip! The beaches were stunning and the culture was rich. Highly recommend!",
  },
  {
    id: 2,
    author: "Mike Chen",
    title: "Tokyo Experience",
    date: "2023-12-20",
    rating: 4,
    text: "Great food and sights. The guide was knowledgeable. Would go again.",
  },
  {
    id: 3,
    author: "Emma Wilson",
    title: "Swiss Alps",
    date: "2024-01-10",
    rating: 5,
    text: "Incredible hiking and scenery. Perfect for nature lovers.",
  },
  {
    id: 4,
    author: "David Lee",
    title: "Paris Getaway",
    date: "2024-02-05",
    rating: 4,
    text: "Romantic and beautiful. The Eiffel Tower was magical at night.",
  },
];

const upcomingTrips = [
  {
    id: 1,
    title: "Bali Beach & Culture Adventure",
    location: "Bali, Indonesia",
    date: "Nov 3 - Nov 10, 2025",
    travelers: 3,
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=180&q=80",
    avatars: ["https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=30&h=30&q=80", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=30&h=30&q=80", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=30&h=30&q=80"],
  },
  {
    id: 2,
    title: "Machu Picchu Trek",
    location: "Cusco, Peru",
    date: "Dec 10 - Dec 17, 2025",
    travelers: 5,
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=180&q=80",
    avatars: ["https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=30&h=30&q=80", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=30&h=30&q=80", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=30&h=30&q=80", "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=30&h=30&q=80", "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=30&h=30&q=80"],
  },
  {
    id: 3,
    title: "Northern Lights in Iceland",
    location: "Reykjavik, Iceland",
    date: "Jan 15 - Jan 22, 2026",
    travelers: 4,
    image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=180&q=80",
    avatars: ["https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=30&h=30&q=80", "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=30&h=30&q=80", "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=30&h=30&q=80", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=30&h=30&q=80"],
  },
];

const pastTrips = [
  {
    id: 2,
    title: "Bali Beach & Culture Adventure",
    location: "Bali, Indonesia",
    date: "Nov 3 - Nov 10, 2024",
    travelers: 3,
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=180&q=80",
    avatars: ["https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=30&h=30&q=80", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=30&h=30&q=80", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=30&h=30&q=80"],
  },
  {
    id: 3,
    title: "Tokyo City Lights & Temples",
    location: "Tokyo, Japan",
    date: "Dec 15 - Dec 22, 2024",
    travelers: 2,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=180&q=80",
    avatars: ["https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=30&h=30&q=80", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=30&h=30&q=80"],
  },
  {
    id: 4,
    title: "Swiss Alps Hiking Expedition",
    location: "Zurich, Switzerland",
    date: "Jan 5 - Jan 12, 2025",
    travelers: 4,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=180&q=80",
    avatars: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=30&h=30&q=80", "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=30&h=30&q=80", "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=30&h=30&q=80", "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=30&h=30&q=80"],
  },
];

const travelPhotos = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
  "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
  "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
  "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Upcoming Trips');
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(1234);
  const [showChatModal, setShowChatModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Section */}
      <div className="max-w-6xl mx-auto mt-8 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full flex flex-col md:flex-row gap-6 items-center">
          {/* Avatar */}
          <div className="relative w-36 h-36 overflow-hidden shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              Jane Cooper
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md flex items-center gap-1">
                <Image src="/ic_baseline-check-circle-outline.png" alt="Verified" width={16} height={16} /> Verified Traveler
              </span>
            </h2>
            <p className="text-gray-600 flex items-center gap-1 mt-1">
              <FaMapMarkerAlt className="text-gray-500" /> Kiev, Ukraine
            </p>
            <p className="text-sm text-gray-500 mt-2">
              ⭐ 4.1 (410 reviews) • <span className="font-medium">88%</span> Safe Traveler
            </p>

            {/* Stats */}
            <div className="flex gap-10 mt-4 text-center">
              <div>
                <p className="text-lg font-semibold">{followerCount}</p>
                <p className="text-gray-500 text-sm">Followers</p>
              </div>
              <div>
                <p className="text-lg font-semibold">567</p>
                <p className="text-gray-500 text-sm">Following</p>
              </div>
              <div>
                <p className="text-lg font-semibold">15</p>
                <p className="text-gray-500 text-sm">Trips Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative mt-8">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt="Cover"
          width={1600}
          height={400}
          className="w-full h-64 object-cover rounded-b-xl"
        />
        <button className="absolute top-4 left-4 text-white bg-black/40 px-3 py-1 rounded-md hover:bg-black/60 transition">
          ← Back
        </button>
      </div>

      {/* Buttons */}
      <div className="max-w-6xl mx-auto mt-8 px-4 flex justify-center">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setShowChatModal(true)}
            className="flex items-center justify-center gap-2 bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition"
          >
            <IoMdChatbubbles /> Chat
          </button>
          <button
            onClick={() => {
              setIsFollowing(!isFollowing);
              setFollowerCount(isFollowing ? followerCount - 1 : followerCount + 1);
            }}
            className="border border-gray-300 px-5 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
          >
            {isFollowing ? 'Following' : '+ Follow'}
          </button>
        </div>
      </div>

      {/* About + Tabs Section */}
      <div className="max-w-6xl mx-auto mt-8 px-4 flex flex-col md:flex-row gap-8">
        {/* About Section */}
        <div className="w-full md:w-1/3 bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-gray-600 text-sm">
            Wildlife photographer and nature lover. Always seeking the next great outdoor adventure.
            Eco-conscious traveler.
          </p>

          <h4 className="font-semibold mt-4 mb-2">🌐 Languages</h4>
          <div className="flex flex-wrap gap-2">
            {['English', 'Spanish', 'Ukrainian'].map((lang) => (
              <span
                key={lang}
                className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm"
              >
                {lang}
              </span>
            ))}
          </div>

          <h4 className="font-semibold mt-4 mb-2">🏕️ Travel Style</h4>
          <div className="flex flex-wrap gap-2">
            {['Adventure', 'Cultural', 'Budget-friendly'].map((style) => (
              <span
                key={style}
                className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm"
              >
                {style}
              </span>
            ))}
          </div>

          <h4 className="font-semibold mt-4 mb-2">💡 Interests</h4>
          <div className="flex flex-wrap gap-2">
            {['Hiking', 'Photography', 'Local cuisine'].map((interest) => (
              <span
                key={interest}
                className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="w-full md:w-2/3">
          <div className="bg-white rounded-2xl shadow-md">
            {/* Tabs Header */}
            <div className="flex space-x-8 border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab("Upcoming Trips")}
                className={`pb-2 text-sm font-medium ${
                  activeTab === "Upcoming Trips"
                    ? "text-[#F76C6C] border-b-2 border-[#F76C6C]"
                    : "text-gray-500"
                }`}
              >
                Upcoming Trips
              </button>
              <button
                onClick={() => setActiveTab("Past Trips")}
                className={`pb-2 text-sm font-medium ${
                  activeTab === "Past Trips"
                    ? "text-[#F76C6C] border-b-2 border-[#F76C6C]"
                    : "text-gray-500"
                }`}
              >
                Past Trips
              </button>
              <button
                onClick={() => setActiveTab("Reviews")}
                className={`pb-2 text-sm font-medium ${
                  activeTab === "Reviews"
                    ? "text-[#F76C6C] border-b-2 border-[#F76C6C]"
                    : "text-gray-500"
                }`}
              >
                Reviews
              </button>
              <button
                onClick={() => setActiveTab("Travel Photos")}
                className={`pb-2 text-sm font-medium ${
                  activeTab === "Travel Photos"
                    ? "text-[#F76C6C] border-b-2 border-[#F76C6C]"
                    : "text-gray-500"
                }`}
              >
                Travel Photos
              </button>
            </div>

            {activeTab === "Reviews" && (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Travelers Reviews</h3>
                    <div className="text-sm text-gray-500 mt-1">
                      {user.rating} ({user.reviews} reviews)
                    </div>
                  </div>
                  <div className="text-sm text-[#F76C6C] cursor-pointer">
                    Show All Reviews
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map((r) => (
                    <div
                      key={r.id}
                      className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            S
                          </div>
                          <div>
                            <div className="text-sm font-semibold">
                              {r.author}{" "}
                              <span className="text-xs text-gray-400">
                                • {r.title}
                              </span>
                            </div>
                            <div className="text-xs text-gray-400">
                              {r.date}
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

                      <div className="mt-3 text-sm text-gray-700">
                        {r.text}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "Upcoming Trips" && (
              <section className="w-full max-w-5xl mx-auto mt-10 px-4">
                <h2 className="text-2xl font-semibold mb-6">Upcoming Trips</h2>
                <div className="flex flex-col gap-6 max-h-[600px] overflow-y-scroll">
                  {upcomingTrips.map((trip) => (
                    <div
                      key={trip.id}
                      className="flex flex-col md:flex-row items-center md:items-start bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 p-4 md:p-5"
                    >
                      {/* Trip Image */}
                      <div className="w-full md:w-1/3">
                        <Image
                          src={trip.image}
                          alt={trip.title}
                          width={300}
                          height={180}
                          className="rounded-lg object-cover w-full h-[180px]"
                        />
                      </div>

                      {/* Trip Details */}
                      <div className="w-full md:w-2/3 mt-4 md:mt-0 md:ml-6 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{trip.title}</h3>
                          <div className="flex items-center text-gray-600 text-sm mt-1 space-x-4">
                            <div className="flex items-center">
                              <MapPin size={16} className="mr-1" />
                              {trip.location}
                            </div>
                            <div className="flex items-center">
                              <CalendarDays size={16} className="mr-1" />
                              {trip.date}
                            </div>
                            <div className="flex items-center">
                              <Users size={16} className="mr-1" />
                              {trip.travelers} travelers
                            </div>
                          </div>
                        </div>

                        {/* Traveler Avatars */}
                        <div className="flex items-center mt-3">
                          <div className="flex -space-x-2">
                            {trip.avatars.map((avatar, i) => (
                              <Image
                                key={i}
                                src={avatar}
                                alt={`Traveler ${i + 1}`}
                                width={30}
                                height={30}
                                className="rounded-full border-2 border-white"
                              />
                            ))}
                          </div>
                          <p className="ml-3 text-sm text-gray-600">
                            {trip.travelers} travelers joined
                          </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-3 mt-5">
                          <button className="bg-[#F76C6C] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#f85a5a] transition">
                            Join Trip
                          </button>
                          <button className="border border-[#F76C6C] text-[#F76C6C] px-6 py-2.5 rounded-lg font-medium hover:bg-[#fff0f0] transition">
                            View trip details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === "Past Trips" && (
              <section className="w-full max-w-4xl mx-auto mt-8 px-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-5">
                  Past Trips
                </h2>

                {/* Scrollable Container */}
                <div className="flex flex-col gap-5 max-h-[600px] overflow-y-scroll pr-2 scroll-smooth">
                  {pastTrips.map((trip, index) => (
                    <div
                      key={trip.id}
                      className="flex items-center justify-between border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-white p-4"
                    >
                      {/* Left Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={trip.image}
                          alt={trip.title}
                          className="w-60 h-36 rounded-md object-cover"
                        />
                      </div>

                      {/* Right Details */}
                      <div className="flex flex-col flex-1 px-6">
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">
                          {trip.title}
                        </h3>

                        <div className="flex items-center text-sm text-gray-600 gap-5 mb-2">
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt className="text-gray-400" /> {trip.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaCalendarAlt className="text-gray-400" /> {trip.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaUserFriends className="text-gray-400" /> {trip.travelers}
                          </span>
                        </div>

                        {/* Travelers Joined */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex -space-x-2">
                            {trip.avatars.map((img, i) => (
                              <img
                                key={i}
                                src={img}
                                alt="traveler"
                                className="w-6 h-6 rounded-full border-2 border-white"
                              />
                            ))}
                          </div>
                          <p className="text-gray-500 text-sm">
                            {trip.travelers} travelers joined
                          </p>
                        </div>

                        {/* Button */}
                        <button className="w-fit border border-red-400 text-red-500 text-sm font-medium px-4 py-2 rounded-md hover:bg-red-50 transition">
                          View trip details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === "Travel Photos" && (
              <div className="text-center text-gray-500 mt-8">
                No travel photos available.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {showChatModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowChatModal(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Chat with Jane Cooper</h3>
              <button
                onClick={() => setShowChatModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="h-64 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto">
              <div className="text-center text-gray-500">
                Start a conversation with Jane Cooper!
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
