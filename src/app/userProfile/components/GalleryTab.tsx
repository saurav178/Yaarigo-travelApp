// import React, { ChangeEvent } from 'react'
// import { Section } from './commonComponents';
// import { Profile } from '../Types';

// interface props {
//     profile:Profile,
//     setProfile: React.Dispatch<React.SetStateAction<Profile>>
// }

// interface props {
//     profile:Profile,
//     setProfile: React.Dispatch<React.SetStateAction<Profile>>
// }

// const GalleryTab = ({profile,setProfile}:props) => {
//   return (
//     <div>
//             <Section>
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
//                   <h3 className="text-lg font-semibold text-black">
//                     Travel Gallery
//                   </h3>

//                   <label className="px-3 py-2 bg-[#1D4350] text-white rounded-md cursor-pointer text-sm">
//                     Upload Photos
//                     <input
//                       type="file"
//                       accept="image/*"
//                       multiple
//                       className="hidden"
//                       onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                         const files = Array.from(e.target.files || []);
//                         const urls = files.map((file) =>
//                           URL.createObjectURL(file)
//                         );

//                         setProfile((prev) => ({
//                           ...prev,
//                           gallery: [...prev.gallery, ...urls],
//                         }));
//                       }}
//                     />
//                   </label>
//                 </div>

//                 <p className="mt-2 text-sm text-gray-500">
//                   {profile.gallery.length} photos from{" "}
//                   {profile.trips.length} trips
//                 </p>

//                 {(() => {
//                   const showAll = profile.showAllGallery;
//                   const photos = showAll
//                     ? profile.gallery
//                     : profile.gallery.slice(0, 8);

//                   return (
//                     <>
//                       <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                         {photos.map((g, i) => (
//                           <img
//                             key={i}
//                             src={g}
//                             alt={`gallery-${i}`}
//                             className="w-full h-32 sm:h-40 object-cover rounded-md"
//                           />
//                         ))}
//                       </div>

//                       {profile.gallery.length > 8 && !showAll && (
//                         <div className="text-center mt-6">
//                           <button
//                             onClick={() =>
//                               setProfile((prev) => ({
//                                 ...prev,
//                                 showAllGallery: true,
//                               }))
//                             }
//                             className="px-4 py-2 border border-rose-300 rounded-md text-rose-500 hover:bg-rose-50 cursor-pointer"
//                           >
//                             Show More
//                           </button>
//                         </div>
//                       )}
//                     </>
//                   );
//                 })()}
//               </Section>
//             </div>
//   )
// }

// export default GalleryTab


import React, { ChangeEvent } from "react";
import Image from "next/image";
import { Section } from "./commonComponents";
import { Profile } from "../Types";

interface Props {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

const GalleryTab = ({ profile, setProfile }: Props) => {
  return (
    <div>
      <Section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h3 className="text-lg font-semibold text-black">
            Travel Gallery
          </h3>

          <label className="px-3 py-2 bg-[#1D4350] text-white rounded-md cursor-pointer text-sm">
            Upload Photos
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const files = Array.from(e.target.files || []);
                const urls = files.map((file) =>
                  URL.createObjectURL(file)
                );

                setProfile((prev) => ({
                  ...prev,
                  gallery: [...prev.gallery, ...urls],
                }));
              }}
            />
          </label>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          {profile.gallery.length} photos from{" "}
          {profile.trips.length} trips
        </p>

        {(() => {
          const showAll = profile.showAllGallery;
          const photos = showAll
            ? profile.gallery
            : profile.gallery.slice(0, 8);

          return (
            <>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {photos.map((src, i) => (
                  <div
                    key={i}
                    className="relative w-full h-32 sm:h-40"
                  >
                    <Image
                      src={src}
                      alt={`gallery-${i}`}
                      fill
                      className="object-cover rounded-md"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                ))}
              </div>

              {profile.gallery.length > 8 && !showAll && (
                <div className="text-center mt-6">
                  <button
                    onClick={() =>
                      setProfile((prev) => ({
                        ...prev,
                        showAllGallery: true,
                      }))
                    }
                    className="px-4 py-2 border border-rose-300 rounded-md text-rose-500 hover:bg-rose-50 cursor-pointer"
                  >
                    Show More
                  </button>
                </div>
              )}
            </>
          );
        })()}
      </Section>
    </div>
  );
};

export default GalleryTab;
