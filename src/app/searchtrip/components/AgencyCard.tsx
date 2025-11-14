"use client";

import Image from "next/image";
import type { Agency } from "@/src/app/searchtrip/types/types";
import star from "../../../../public/searchpageimg/rating.png";
// import verify from "../../../../public/searchpageimg/Verfied Badge.png"
// import level from "../../../../public/searchpageimg/levelrating (1).png"
// import {cover} from "../../../../public/searchpageimg/agency-cover.jpg"
import veritick from "../../../../public/searchpageimg/veritick.png";
import tick from "../../../../public/searchpageimg/Group.png";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/src/routes";

export default function AgencyCard({ agency }: { agency: Agency }) {
  const router = useRouter();

  const handleProfileAgency = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // prevents form reload
    router.push(ROUTES.PROFILE_AGENCY); // navigates to /trip page
  };

  const trust = agency.trust === "Verified" ? "High" : agency.trust;
  const {
    name,
    description = "",
    rating = 4.1,

    tripsCount = 15,
    travelersCount = 500,
    years = 2,
    tags = ["Adventure Travel", "Cultural Tours", "Sustainable Tours"],
    avatar = "/avatar-placeholder.jpg",
    cover = "/cover-placeholder.jpg",
  } = agency;

  return (
    <article className="w-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition hover:shadow-md">
      {/* Cover */}
      <div className="relative h-44 md:h-52">
        <Image
          src={cover}
          alt={`${name} cover`}
          fill
          className="object-cover"
        />
        <div className="absolute right-3 mt-2 px-3 py-1 rounded-full ">
          {/* {trust} */}
          {/* <Image src={verify} alt="alt"  /> */}
          {agency.verified && (
            <div className="flex flex-row absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-5 py-1 rounded-full shadow">
              <Image src={veritick} alt="verified" className="-ml-3 mr-1" />
              Verified
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden relative">
            <Image
              src={avatar}
              alt={`${name} avatar`}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>

          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between gap-3 w-full">
              <h4 className="text-base font-semibold">{name}</h4>
            </div>
            <div className="flex flex-row gap-3 w-full mt-1">
              <div className="flex ">
                <Image src={star} alt="alt" className="h-4 w-4 mr-1" />
                <div className="text-xs">{rating.toFixed(1)}</div>
              </div>

              <div
                className={`flex flex-row items-center px-1 rounded-full text-white -mt-1
    ${
      trust === "High"
        ? "bg-green-500"
        : agency.trust === "Moderate"
        ? "bg-orange-500"
        : agency.trust === "Low"
        ? "bg-[#F76C6C]"
        : "bg-gray-300"
    }`}
              >
                <Image
                  src={tick}
                  alt="tick"
                  className={`w-3 h-3 mr-1
      ${
        trust === "High"
          ? "bg-green-400"
          : agency.trust === "Moderate"
          ? "bg-orange-400"
          : agency.trust === "Low"
          ? "bg-red-400"
          : "bg-gray-200"
      }`}
                />
                {agency.trust ?? "Unknown"}
              </div>

               {/* {agency.trust && (
                  <div className="flex flex-row  bg-green-500 text-white text-xs font-semibold px-5 py-1 rounded-full shadow">
                    <Image src={veritick} alt="verified" className="-ml-3"/>
                  </div>
                )} */}

            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm font-bold text-[#F76C6C]">
              {tripsCount}+
            </div>
            <div className="text-xs text-gray-500">Trips</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[#F76C6C]">
              {travelersCount}+
            </div>
            <div className="text-xs text-gray-500">Travelers</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[#F76C6C]">{years}+</div>
            <div className="text-xs text-gray-500">Years</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="text-xs bg-rose-50 text-[#F76C6C] px-3 py-1 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-3 ">
          <button
            type="submit"
            onClick={handleProfileAgency}
            className="flex-1 bg-[#F76C6C] text-white py-2 rounded-lg font-semibold hover:bg-[#EB5757] transition"
          >
            View Profile
          </button>
          <button className="px-4 py-2 border border-rose-200 rounded-lg text-[#F76C6C] font-semibold hover:bg-rose-50 transition">
            2 trips
          </button>
        </div>
      </div>
    </article>
  );
}
