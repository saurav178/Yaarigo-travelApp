// import React,{useMemo, useCallback, useState} from 'react'
// import { Profile } from '../Types'

// interface props {
//     profile:Profile,
//     setProfile: React.Dispatch<React.SetStateAction<Profile>>,
//     setShowFollowingModal : React.Dispatch<React.SetStateAction<boolean>>
// }

// const FollowingModal = ({profile,setProfile,setShowFollowingModal}:props) => {
//     const [searchFollowing, setSearchFollowing] = useState("");

//     const searchValue = searchFollowing.toLowerCase();
//     const filteredFollowing = useMemo(() => {
//       return (
//         profile.followingList?.filter(
//           (user) =>
//             user.name.toLowerCase().includes(searchValue) ||
//             user.username.toLowerCase().includes(searchValue)
//         ) ?? []
//       );
//     }, [profile.followingList, searchValue]);
    
//     const toggleFollow = useCallback((username: string) => {
//       setProfile((prev) => ({
//         ...prev,
//         followingList: prev.followingList.map((u) =>
//           u.username === username
//             ? { ...u, isFollowing: !u.isFollowing }
//             : u
//         ),
//       }));
//     }, []);
//   return (
//             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//     <div className="bg-white w-full max-w-[420px] mx-4 rounded-2xl shadow-lg overflow-hidden">
//       <div className="flex items-center justify-between p-4 border-b">
//         <h2 className="text-lg font-semibold">Following</h2>
//         <button
//           onClick={() => setShowFollowingModal(false)}
//           className="text-2xl font-light"
//         >
//           ✕
//         </button>
//       </div>

//       <div className="px-4 py-2">
//         <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
//           <span className="text-gray-500 mr-2">🔍</span>
//           <input
//             type="text"
//             placeholder="Search"
//             value={searchFollowing}
//             onChange={(e) => setSearchFollowing(e.target.value)}
//             className="bg-transparent w-full outline-none text-sm"
//           />
//         </div>
//       </div>

//       <div className="max-h-[320px] overflow-y-auto px-2 pb-4">
//         {filteredFollowing.map((f) => (
//           <div
//             key={f.username}
//             className="flex items-center justify-between px-3 py-3 hover:bg-gray-50 rounded-lg"
//           >
//             <div className="flex items-center gap-3">
//               <img
//                 src={f.image}
//                 className="w-12 h-12 rounded-full object-cover"
//                 alt={f.name}
//               />
//               <div>
//                 <p className="font-semibold text-sm">{f.name}</p>
//                 <p className="text-gray-500 text-xs">{f.username}</p>
//               </div>
//             </div>

//             <button
//               onClick={() => toggleFollow(f.username)}
//               className={`px-4 py-1 rounded-lg text-sm ${
//                 f.isFollowing
//                   ? "bg-gray-200 hover:bg-gray-300"
//                   : "bg-rose-100 text-rose-600 hover:bg-rose-200"
//               }`}
//             >
//               {f.isFollowing ? "Following" : "Follow"}
//             </button>
//           </div>
//         ))}

//         {filteredFollowing.length === 0 && (
//           <p className="text-center text-gray-500 py-6">
//             No results found.
//           </p>
//         )}
//       </div>
//     </div>
//   </div>
//   )
// }

// export default FollowingModal


import React, { useMemo, useCallback, useState } from "react";
import Image from "next/image";
import { Profile } from "../Types";

interface FollowingUser {
  name: string;
  username: string;
  image: string;
  isFollowing: boolean;
}

interface Props {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  setShowFollowingModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const FollowingModal = ({
  profile,
  setProfile,
  setShowFollowingModal,
}: Props) => {
  const [searchFollowing, setSearchFollowing] = useState("");

  const searchValue = searchFollowing.toLowerCase();

  const filteredFollowing = useMemo(() => {
    return (
      profile.followingList?.filter(
        (user: FollowingUser) =>
          user.name.toLowerCase().includes(searchValue) ||
          user.username.toLowerCase().includes(searchValue)
      ) ?? []
    );
  }, [profile.followingList, searchValue]);

  const toggleFollow = useCallback(
    (username: string) => {
      setProfile((prev) => ({
        ...prev,
        followingList: prev.followingList.map((u) =>
          u.username === username
            ? { ...u, isFollowing: !u.isFollowing }
            : u
        ),
      }));
    },
    [setProfile]
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-[420px] mx-4 rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Following</h2>
          <button
            onClick={() => setShowFollowingModal(false)}
            className="text-2xl font-light"
          >
            ✕
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-2">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <span className="text-gray-500 mr-2">🔍</span>
            <input
              type="text"
              placeholder="Search"
              value={searchFollowing}
              onChange={(e) => setSearchFollowing(e.target.value)}
              className="bg-transparent w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* List */}
        <div className="max-h-[320px] overflow-y-auto px-2 pb-4">
          {filteredFollowing.length > 0 ? (
            filteredFollowing.map((f: FollowingUser) => (
              <div
                key={f.username}
                className="flex items-center justify-between px-3 py-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={f.image}
                    alt={f.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm">{f.name}</p>
                    <p className="text-gray-500 text-xs">@{f.username}</p>
                  </div>
                </div>

                <button
                  onClick={() => toggleFollow(f.username)}
                  className={`px-4 py-1 rounded-lg text-sm ${
                    f.isFollowing
                      ? "bg-gray-200 hover:bg-gray-300"
                      : "bg-rose-100 text-rose-600 hover:bg-rose-200"
                  }`}
                >
                  {f.isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-6">
              No results found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowingModal;
