"use client";

import Image from "next/image";
import {
 
  ChevronLeft,
  ChevronRight,
 
} from "lucide-react";

import type { Rec } from "@/src/app/trip/data/recommendations";

import trips from "../../../public/searchpageimg/view_trips.png";
import view from "../../../public/searchpageimg/view_profile.png";
import join from "../../../public/searchpageimg/join_trips.png";
import money from "../../../public/searchpageimg/currency.png";
import calender  from "../../../public/searchpageimg/calender.png";
import line from "../../../public/searchpageimg/Line 1.png";
import groups from "../../../public/searchpageimg/Group.png";
import star from "../../../public/searchpageimg/rating.png";
// import tick from "../../../public/searchpageimg/tickmarks.png"
import spot from "../../../public/searchpageimg/3spots.png";
import verify from "../../../public/searchpageimg/Verfied Badge.png"

export default function TripCard({ rec }: { rec: Rec }) {
  const {
    name,
    age,
    location,
    // from,
    tags = [],
    match = 88,
    price = "₹15k - ₹50k",
    cover = "/cover-placeholder.jpg",
  } = rec;

  return (
    <article
      className={" w-full rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-md transition-transform hover:-translate-y-1"}
    >
      <div className=" relative h-44 rounded-lg overflow-hidden w-full">
        <Image
          src={cover}
          alt={`${name} cover`}
          fill
          className="object-cover filter blur-sm scale-105"
          priority
        />
        <div className="absolute inset-0 from-transparent to-black/30" />

        {/* Arrows */}
        <button
          aria-label="Prev"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/40 p-1 text-white hover:bg-black/60"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/40 p-1 text-white hover:bg-black/60"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Match badge */}
        <div className="absolute left-3 top-3 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold shadow-sm">
          {match}% Match
        </div>

        {/* Spots left */}
        <div className="absolute right-3 top-3 px-3 py-1 rounded-full bg-[#F76c6c] text-white text-xs font-medium shadow-sm flex items-center gap-2">
          <Image src={spot} alt="alt" />
          3 spots left
        </div>

        {/* Bottom overlay info */}
        <div className="absolute left-0 right-0 bottom-0 px-4 pb-4 pt-4 w-full">
          <div className="flex items-center gap-3 w-full">
          
          {/* ✅ Name, Age & Tick in one row (no wrapping, no scroll) */}
            <div className="flex items-center gap-2 text-white pb-1 w-fit whitespace-nowrap mt-5">
              <div className="text-sm font-medium  ">{name}</div>
              {age && <div className="text-xl font-semibold">,{age}</div>}
              {/* <Image src={tick} alt="verified" className="w-4 h-4" /> */}
              <Image src={verify} alt="alt" className="w-15 mb-1" />
            </div>

            {/* ✅ Location below */}
            <div className="text-xs text-white/90 drop-shadow-sm w-full -ml-29 mt-16">
              {location}
            </div>
          

            {/* Rating & group */}
            <div className="flex flex-row items-end gap-2 mt-15 -mb-1 w-full">
              <div className="flex items-center gap-1 bg-white/90 rounded-full px-2  py-1 ml-1 pr-4 pl-1 w-full">
                <Image src={star} alt="alt" className="" />
                <div className="text-xs font-semibold">4.1</div>
              </div>
              <div className="flex items-center gap-1 text-white bg-emerald-500 rounded-full px-2  py-1  w-full pr-4 pl-2">
                <Image src={groups} alt="alt" className="" />
                <div className="text-xs font-semibold">{match}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card bottom content */}
      <div className="px-2 py-3 flex flex-col h-[calc(100%-11rem)]">
        {/* Locations */}
        <div className="flex items-center gap-3 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border border-gray-400" />
            <span className="text-xs text-gray-600">
              Kolkata, West Bengal, India
            </span>
          </div>
        </div>

        <div>
          <Image src={line} alt="alt" className="h-2 ml-[5px]" />
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-black" />
          <span className="text-xs text-gray-600">
            Simla, Himachal Pradesh, India
          </span>
        </div>

        {/* Date & price */}
        <div className="mt-3 flex items-center gap-3 text-xs text-gray-600">
          <Image src={calender} alt="alt" />
          <div className="text-xs text-gray-700 font-medium">
            Nov 15-25, 2025
          </div>
          <Image src={money} alt="alt" className="ml-6" />
          <div className="ml-auto text-xs text-gray-700 font-medium">
            {price ?? "₹15k - ₹50k"}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {(tags.length ? tags : ["Beach", "Photography"]).map((t) => (
            <span
              key={t}
              className="text-xs bg-rose-50 text-[#f76c6c] px-3 py-1 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-3">
          <div className="grid grid-cols-2 gap-3">
            {/* ✅ Profile View Icon color matched */}
            <button className="w-full flex items-center justify-center gap-2 text-[#F76c6c] border border-rose-200 rounded-lg py-2 text-sm bg-white font-medium hover:bg-rose-50 transition-all duration-200">
              <Image
                src={view}
                alt="View Profile"
                className=""
              />
              View Profile
            </button>

            <button className="w-full flex items-center justify-center gap-2 text-[#F76c6c] border border-rose-200 rounded-lg py-2 text-sm bg-white font-medium hover:bg-rose-50 transition-all duration-200">
              <Image src={trips} alt="View Trip" />
              View Trip
            </button>
          </div>

          <div className="relative mt-3">
            <button className="w-full flex items-center justify-center gap-2 bg-[#F76c6c] text-white rounded-lg py-2 font-semibold hover:bg-[#EB5757] transition-all duration-200 shadow-sm hover:shadow-md">
              <Image src={join} alt="Join Trip" />
              Join Trip
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
