// "use client";

// import { memo } from "react";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation, Autoplay } from "swiper/modules";

// function TripsListComponent({ trips }: { trips: any[] }) {
//   return (
//     <div className="space-y-6 mt-6">
//       {trips.length > 0 ? (
//         trips.map((trip, index) => (
//           <div
//             key={index}
//             className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-4 rounded-lg shadow-md"
//           >
//             {/* Left Info */}
//             <div className="flex-1 pr-6 pt-4">
//               <p className="text-sm text-blue-500 font-medium">{trip.status}</p>
//               <h3 className="text-lg font-semibold">{trip.title}</h3>
//               <p className="text-sm text-blue-600 font-medium">
//                 {trip.days} days · {trip.cities} cities
//               </p>
//             </div>

//             {/* Right Carousel */}
//             <div className="mt-5 md:mt-0 w-full md:w-[280px] relative">
//               <Swiper
//                 modules={[Navigation, Autoplay]}
//                 spaceBetween={10}
//                 slidesPerView={1}
//                 navigation={{
//                   nextEl: '.swiper-button-next-custom',
//                   prevEl: '.swiper-button-prev-custom',
//                 }}
//                 autoplay={{ delay: 3000, disableOnInteraction: false }}
//                 loop={true}
//               >
//                 {trip.images?.map((img: string, idx: number) => (
//                   <SwiperSlide key={idx}>
//                     <div className="relative w-full h-[150px] rounded-md overflow-hidden">
//                       <Image
//                         src={img}
//                         alt={`${trip.title} ${idx}`}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>
//                   </SwiperSlide>
//                 ))}

//                 {/* Custom Navigation Buttons */}
//                 <div className="swiper-button-prev-custom absolute top-1/2 -left-0 z-10 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
//                   <span className="text-black text-lg font-bold">{'<'}</span>
//                 </div>
//                 <div className="swiper-button-next-custom absolute top-1/2 -right-0 z-10 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
//                   <span className="text-black text-lg font-bold">{'>'}</span>
//                 </div>

//               </Swiper>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-500 text-center">No trips found.</p>
//       )}
//     </div>
//   );
// }

// export default memo(TripsListComponent);



// "use client";

// import { memo } from "react";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation, Autoplay, Pagination } from "swiper/modules";

// function TripsListComponent({ trips }: { trips: any[] }) {
//   return (
//     <div className="space-y-6 mt-6">
//       {trips.length > 0 ? (
//         trips.map((trip, index) => (
//           <div
//             key={index}
//             className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-4 rounded-lg shadow-md"
//           >
//             {/* Left Info */}
//             <div className="flex-1 pr-6 pt-4">
//               <p className="text-sm text-blue-500 font-medium">{trip.status}</p>
//               <h3 className="text-lg font-semibold">{trip.title}</h3>
//               <p className="text-sm text-blue-600 font-medium">
//                 {trip.days} days · {trip.cities} cities
//               </p>
//             </div>

//             {/* Right Carousel */}
//             <div className="mt-5 md:mt-0 w-full md:w-[280px] relative">
//               <Swiper
//                 modules={[Navigation, Autoplay, Pagination]}
//                 spaceBetween={10}
//                 slidesPerView={1}
//                 navigation={{
//                   nextEl: `.swiper-button-next-custom-${index}`,
//                   prevEl: `.swiper-button-prev-custom-${index}`,
//                 }}
//                 autoplay={{ delay: 3000, disableOnInteraction: false }}
//                 loop={true}
//                 pagination={{
//                   el: `.swiper-pagination-custom-${index}`,
//                   clickable: true,
//                 }}
//               >
//                 {trip.images?.map((img: string, idx: number) => (
//                   <SwiperSlide key={idx}>
//                     <div className="relative w-full h-[150px] rounded-md overflow-hidden">
//                       <Image
//                         src={img}
//                         alt={`${trip.title} ${idx}`}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>
//                   </SwiperSlide>
//                 ))}

//                 {/* Navigation Buttons */}
//                 <div
//                   className={`swiper-button-prev-custom-${index} absolute top-1/2 -left-2 z-10 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform`}
//                 >
//                   <span className="text-black text-lg font-bold">{'<'}</span>
//                 </div>
//                 <div
//                   className={`swiper-button-next-custom-${index} absolute top-1/2 -right-2 z-10 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform`}
//                 >
//                   <span className="text-black text-lg font-bold">{'>'}</span>
//                 </div>
//               </Swiper>

//               {/* Pagination dots inside image */}
//               <div
//                 className={`swiper-pagination-custom-${index} absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2`}
//               ></div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-500 text-center">No trips found.</p>
//       )}

//       {/* Custom Pagination Dots CSS */}
//       <style jsx>{`
//         .swiper-pagination-bullet {
//           background: black;
//           opacity: 0.5;
//           width: 10px;
//           height: 10px;
//         }
//         .swiper-pagination-bullet-active {
//           opacity: 1;
//           transform: scale(1.3);
//           transition: all 0.3s;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default memo(TripsListComponent);



// "use client";

// import { memo } from "react";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation, Autoplay, Pagination } from "swiper/modules";

// function TripsListComponent({ trips }: { trips: any[] }) {
//   return (
//     <div className="space-y-6 mt-6">
//       {trips.length > 0 ? (
//         trips.map((trip, index) => (
//           <div
//             key={index}
//             className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-4 rounded-lg shadow-md"
//           >
//             {/* Left Info */}
//             <div className="flex-1 pr-6 pt-4">
//               <p className="text-sm text-blue-500 font-medium">{trip.status}</p>
//               <h3 className="text-lg font-semibold">{trip.title}</h3>
//               <p className="text-sm text-blue-600 font-medium">
//                 {trip.days} days · {trip.cities} cities
//               </p>
//             </div>

//             {/* Right Carousel */}
//             <div className="mt-5 md:mt-0 w-full md:w-[280px] relative">
//               <Swiper
//                 modules={[Navigation, Autoplay, Pagination]}
//                 spaceBetween={10}
//                 slidesPerView={1}
//                 navigation={{
//                   nextEl: `.swiper-button-next-custom-${index}`,
//                   prevEl: `.swiper-button-prev-custom-${index}`,
//                 }}
//                 autoplay={{ delay: 3000, disableOnInteraction: false }}
//                 loop={true}
//                 pagination={{ clickable: true }}
//               >
//                 {trip.images?.map((img: string, idx: number) => (
//                   <SwiperSlide key={idx}>
//                     <div className="relative w-full h-[150px] rounded-md overflow-hidden">
//                       <Image
//                         src={img}
//                         alt={`${trip.title} ${idx}`}
//                         fill
//                         className="object-cover"
//                       />
//                       {/* Pagination dots inside image */}
//                       <div className="swiper-pagination absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2"></div>
//                     </div>
//                   </SwiperSlide>
//                 ))}

//                 {/* Navigation Buttons */}
//               </Swiper>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-500 text-center">No trips found.</p>
//       )}

//       {/* Pagination Dots CSS */}
//  <style jsx>{`
//   .swiper-pagination-bullet {
//     background: white;   /* inactive dots white */
//     opacity: 0.7;        /* thodi transparency */
//     width: 10px;
//     height: 10px;
//   }
//   .swiper-pagination-bullet-active {
//     background: #ffffffff; 
//     opacity: 1;
//     transform: scale(1.3);
//     transition: all 0.3s;
//   }
// `}</style>

//     </div>
//   );
// }

// export default memo(TripsListComponent);




"use client";

import { memo } from "react";
import Image from "next/image";

function TripsListComponent({ trips }: { trips: any[] }) {
  return (
    <div className="space-y-6 mt-6">
      {trips.length > 0 ? (
        trips.map((trip, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-4 rounded-lg shadow-md"
          >
            {/* Left Info */}
            <div className="flex-1 pr-6 pt-4">
              <p className="text-sm text-blue-500 font-medium">{trip.status}</p>
              <h3 className="text-lg font-semibold">{trip.title}</h3>
              <p className="text-sm text-blue-600 font-medium">
                {trip.days} days · {trip.cities} cities
              </p>
            </div>

            {/* Right Image */}
            <div className="mt-5 md:mt-0 w-full md:w-[280px] relative">
              <div className="relative w-full h-[150px] rounded-md overflow-hidden">
                <Image
                  src={trip.images?.[0] || "/placeholder.jpg"}
                  alt={trip.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No trips found.</p>
      )}
    </div>
  );
}

export default memo(TripsListComponent);
