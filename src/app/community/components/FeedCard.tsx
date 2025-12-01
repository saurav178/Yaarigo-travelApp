// "use client";
// import { Post } from "../types/types";
// import { Bookmark, Sun } from "lucide-react";

// export default function FeedCard({ post }: { post: Post }) {
//   return (

//     <article className="bg-white border border-neutral-200 p-5 shadow-soft hover:shadow-md transition-all duration-200">
//   {/* Header */}
//   <div className="flex items-start justify-between gap-4">
//     <div className="flex-1">
//       <div className="flex items-center justify-between mb-2">
//         <div className="text-sm text-neutral-600">
//           <span className="font-medium text-neutral-800">{post.author}</span> •{" "}
//           <span className="capitalize">{post.location}</span> • {post.timeAgo}
//         </div>
//         <button className="text-neutral-400 hover:text-neutral-700 transition">
//           <Bookmark size={18} />
//         </button>
//       </div>

//       {/* Post Text */}
//       <p className="leading-relaxed text-neutral-800 text-[15px]">{post.text}</p>

//       {/* Tags or Metadata */}
//       {post.bestTime && (
//         <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
//           <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
//             <Sun size={14} /> Best time: {post.bestTime}
//           </span>
//           <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full">
//             ☀️ Clear Weather
//           </span>
//         </div>
//       )}

//       {/* Actions */}
//       <div className="mt-4 flex items-center gap-5 text-sm text-neutral-600">
//         <button className="hover:text-orange-600 transition flex items-center gap-1">
//           ❤️ Like
//         </button>
//         <button className="hover:text-blue-600 transition flex items-center gap-1">
//           💬 Comment
//         </button>
//         <button className="hover:text-green-600 transition flex items-center gap-1">
//           🔗 Share
//         </button>
//       </div>
//     </div>

//     {/* Image Preview */}
//     <div className="relative w-44 h-32  overflow-hidden border border-neutral-200 bg-neutral-100 flex items-center justify-center">
//       <span className="text-neutral-400 text-sm">📸 Image</span>
//     </div>
//   </div>
// </article>
//   );
// }


'use client';
import { Post } from '../types/types';
import { Bookmark, Sun } from 'lucide-react';

export default function FeedCard({ post }: { post: Post }) {
  return (
    <article className="bg-white border border-neutral-200 p-5 shadow-soft hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between gap-4">
        {/* Text Section */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-neutral-600">
              <span className="font-medium text-neutral-800">{post.author}</span> •{' '}
              <span className="capitalize">{post.location}</span> • {post.timeAgo}
            </div>
            <button className="text-neutral-400 hover:text-neutral-700 transition">
              <Bookmark size={18} />
            </button>
          </div>

          <p className="leading-relaxed text-neutral-800 text-[15px]">{post.text}</p>

          {post.bestTime && (
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                <Sun size={14} /> Best time: {post.bestTime}
              </span>
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                ☀️ Clear Weather
              </span>
            </div>
          )}

          <div className="mt-4 flex items-center gap-5 text-sm text-neutral-600">
            <button className="hover:text-orange-600 transition flex items-center gap-1">
              ❤️ Like
            </button>
            <button className="hover:text-blue-600 transition flex items-center gap-1">
              💬 Comment
            </button>
            <button className="hover:text-green-600 transition flex items-center gap-1">
              🔗 Share
            </button>
          </div>
        </div>

        {/* Dynamic Image */}
        <div className="relative w-44 h-32  overflow-hidden border border-neutral-200 bg-neutral-100 flex items-center justify-center">
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt={post.location}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <span className="text-neutral-400 text-sm">📸 No Image</span>
          )}
        </div>
      </div>
    </article>
  );
}
