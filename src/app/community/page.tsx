// import FeedCard from "./components/FeedCard";
// import Sidebar from "./components/Sidebar";
// import Suggestions from "./components/Suggestions";
// import { type Post } from "./types/types";

// const posts: Post[] = [
//   {
//     id: "1",
//     author: "Ravi kumar",
//     location: "meghalaya",
//     timeAgo: "2h ago",
//     text: "Found this incredible hidden temple in Meghalaya! The bamboo forest creates the most magical morning light. Totally worth the 6 AM wakeup!",
//     bestTime: "6:00 AM",
//   },
//   {
//     id: "2",
//     author: "traveller",
//     location: "kyoto",
//     timeAgo: "5h ago",
//     text: "(Traveller with post)",
//   },
//   {
//     id: "3",
//     author: "traveller",
//     location: "bali",
//     timeAgo: "1d ago",
//     text: "(Traveller with post)",
//   },
// ];

// export default function Page() {
//   return (
//     <main className="container mx-auto px-4 py-6 mt-12">
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//         {/* Left */}
//         <div className="lg:col-span-3">
//           <Sidebar />
//         </div>

//         {/* Center feed */}
//         <div className="lg:col-span-6 space-y-4">
//           <div className="card p-4">
//             <div className="flex items-center justify-between">
//               <h1 className="text-3xl font-semibold">
//                 Trending feed{" "}
//                 <span className="text-sm text-neutral-500">
//                   (users share ↑)
//                 </span>
//               </h1>
//               <button className="btn">Sort</button>
//             </div>
//           </div>
//           {posts.map((p) => (
//             <FeedCard key={p.id} post={p} />
//           ))}
//           <div className="card p-10 text-center text-neutral-500">
//             (Traveller with post)
//           </div>
//         </div>

//         {/* Right */}

//         <div className="lg:col-span-3">
//           <Suggestions />
//         </div>
//       </div>
//     </main>
//   );
// }


import FeedCard from "./components/FeedCard";
import Sidebar from "./components/Sidebar";
import Suggestions from "./components/Suggestions";
import { getPosts } from "./data/posts";

export default function Page() {
  // Generate exactly 10 posts
  const posts = getPosts(10);

  return (
    <main className="container mx-auto px-4 py-6 mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left */}
        <div className="lg:col-span-3">
          <Sidebar />
        </div>

        {/* Center feed */}
        <div className="lg:col-span-6 space-y-4">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-semibold">
                Trending feed{" "}
                <span className="text-sm text-neutral-500">(users share ↑)</span>
              </h1>
              <button className="btn">Sort</button>
            </div>
          </div>

          {posts.map((p) => (
            <FeedCard key={p.id} post={p} />
          ))}

          <div className="card p-10 text-center text-neutral-500">
            (Traveller with post)
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-3">
          <Suggestions />
        </div>
      </div>
    </main>
  );
}
