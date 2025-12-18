import React, { useMemo, useState , useCallback} from 'react'
import { Profile } from '../Types'

interface props {
    profile:Profile,
    setProfile: React.Dispatch<React.SetStateAction<Profile>>
    setShowFollowersModal: React.Dispatch<React.SetStateAction<boolean>>
}
const FollowersModal = ({profile, setProfile, setShowFollowersModal}:props) => {
      
      const [searchFollowers, setSearchFollowers] = useState("");
      
      const filteredFollowers = useMemo(() => {
      const query = searchFollowers.toLowerCase();
      return profile.followersList?.filter(
        (u) =>
          u.name.toLowerCase().includes(query) ||
          u.username.toLowerCase().includes(query)
      ) || [];
    }, [profile.followersList, searchFollowers]);
    
    const FollowerRow = React.memo(function FollowerRow({
      follower,
      onRemove,
    }: {
      follower: any;
      onRemove: (username: string) => void;
    }) {
      return (
        <div className="flex items-center justify-between px-3 py-3 hover:bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <img
              src={follower.image}
              className="w-12 h-12 rounded-full object-cover"
              alt={follower.name}
            />
            <div>
              <p className="font-semibold text-sm">{follower.name}</p>
              <p className="text-gray-500 text-xs">{follower.username}</p>
            </div>
          </div>
    
          <button
            className="px-4 py-1 rounded-lg bg-gray-200 text-sm hover:bg-gray-300"
            onClick={() => onRemove(follower.username)}
          >
            Remove
          </button>
        </div>
      );
    });
    
    
    const handleRemoveFollower = useCallback((username: string) => {
      setProfile((prev) => ({
        ...prev,
        followersList: prev.followersList.filter(
          (u) => u.username !== username
        ),
        followers: prev.followers - 1,
      }));
    }, []);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white w-full max-w-[420px] mx-4 rounded-2xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-semibold">Followers</h2>
                  <button
                    onClick={() => setShowFollowersModal(false)}
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
                      value={searchFollowers}
                      onChange={(e) => setSearchFollowers(e.target.value)}
                      className="bg-transparent w-full outline-none text-sm"
                    />
                  </div>
                </div>

                {/* List */}
                <div className="max-h-[320px] overflow-y-auto px-2 pb-4">
                  {filteredFollowers.length > 0 ? (
                    filteredFollowers.map((f) => (
                      <FollowerRow
                        key={f.username}
                        follower={f}
                        onRemove={handleRemoveFollower}
                      />
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-6">
                      No results found.
                    </p>
                  )}
                </div>
              </div>
            </div>
  )
}

export default FollowersModal
