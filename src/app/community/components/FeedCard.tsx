
'use client';

import { useState } from 'react';
import { Post } from '../types/types';
import { Bookmark, Sun } from 'lucide-react';
import Image from 'next/image';

// Deterministic hash → stable initial like count (no Math.random / Date.now)
function seedLikes(key: string) {
  // djb2-ish
  let h = 5381;
  for (let i = 0; i < key.length; i++) h = ((h << 5) + h) + key.charCodeAt(i);
  // 12–120 range
  const n = Math.abs(h) % 109; // 0..108
  return 12 + n; // 12..120
}

export default function FeedCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(() => seedLikes(post.id));

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((count) => (liked ? count - 1 : count + 1));
  };

  const handleComment = () => {
    alert(`💬 Comment feature coming soon!\nPost by ${post.author}`);
  };

  const handleShare = async () => {
    const shareData = {
      title: post.location,
      text: post.text,
      url: typeof window !== 'undefined' ? window.location.href : '',
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch  {}
    } else if (shareData.url) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert('🔗 Link copied to clipboard!');
      } catch {
        alert('Copy failed. You can copy the URL from the address bar.');
      }
    }
  };

  return (
    <article className="bg-white border border-neutral-200 p-5 shadow-soft hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between gap-4">
        {/* Text */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-neutral-600">
              <span className="font-medium text-neutral-800">{post.author}</span> •{' '}
              <span className="capitalize">{post.location}</span> • {post.timeAgo}
            </div>
            <button className="text-neutral-400 hover:text-neutral-700 transition" aria-label="Bookmark">
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

          {/* Actions */}
          <div className="mt-4 flex items-center gap-5 text-sm text-neutral-600">
            <button
              onClick={handleLike}
              className={`transition flex items-center gap-1 ${
                liked ? 'text-red-600' : 'hover:text-orange-600'
              }`}
            >
              {liked ? '❤️ Liked' : '🤍 Like'} ({likeCount})
            </button>

            <button
              onClick={handleComment}
              className="hover:text-blue-600 transition flex items-center gap-1"
            >
              💬 Comment
            </button>

            <button
              onClick={handleShare}
              className="hover:text-green-600 transition flex items-center gap-1"
            >
              🔗 Share
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative w-44 h-32 overflow-hidden border border-neutral-200 bg-neutral-100  flex items-center justify-center">
          {post.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt={post.location}
              fill
              sizes="176px"
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <span className="text-neutral-400 text-sm">📸 No Image</span>
          )}
        </div>
      </div>
    </article>
  );
}
