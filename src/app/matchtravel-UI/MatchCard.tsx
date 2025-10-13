import React, { useState } from 'react';

interface Match {
  id: string;
  name: string;
  profilePic: string;
  verified: boolean;
  interests: string[];
  travelStyle: string;
  compatibilityScore: number;
  destination: string;
  destinationPic: string;
  date: string;
  chatStarters: string[];
}

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isRequested, setIsRequested] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState('');

  // Mock user data for compatibility calculation
  const userInterests = ['Hiking', 'Food', 'Beach', 'History', 'Adventure', 'Nature', 'Movies', 'Music', 'Wildlife', 'Relaxation'];
  const userDestination = 'Paris, France';
  const userDate = '2023-12-15';
  const userTravelStyle = 'Adventure Seeker';

  const calculateCompatibility = (match: Match) => {
    const sharedInterests = match.interests.filter(i => userInterests.includes(i)).length;
    const interestScore = (sharedInterests / match.interests.length) * 30;
    const destinationScore = match.destination === userDestination ? 20 : 0;
    const dateMatch = match.date === userDate ? 10 : 0;
    const travelStyleScore = match.travelStyle === userTravelStyle ? 40 : 0;
    return {
      total: Math.round(interestScore + destinationScore + dateMatch + travelStyleScore),
      interests: Math.round(interestScore),
      destination: destinationScore,
      date: dateMatch,
      travelStyle: travelStyleScore
    };
  };

  const compatibility = calculateCompatibility(match);

  const pieData = [
    { name: 'Interests', value: compatibility.interests, color: '#1E40AF' },
    { name: 'Destination', value: compatibility.destination, color: '#047857' },
    { name: 'Date', value: compatibility.date, color: '#D97706' },
    { name: 'Travel Style', value: compatibility.travelStyle, color: '#DC2626' }
  ];



  const handleChat = () => {
    setShowChat(true);
  };

  const handleJoinRequest = () => {
    setIsRequested(!isRequested);
    console.log(`${isRequested ? 'Cancel' : 'Send'} join request for ${match.name}`);
    // TODO: Send request to backend
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    console.log(`${isSaved ? 'Remove from' : 'Add to'} saved list for ${match.name}`);
    // TODO: Update saved list
  };

  const handleFollow = () => {
    setIsFollowed(!isFollowed);
    console.log(`${isFollowed ? 'Unfollow' : 'Follow'} ${match.name}`);
    // TODO: Follow user
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // Simulate response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'Thanks for your message!', sender: 'match' }]);
      }, 1000);
    }
  };

  const handleSendStarter = (starter: string) => {
    setMessages([...messages, { text: starter, sender: 'user' }]);
    // Simulate response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: 'Thanks for your message!', sender: 'match' }]);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-3 hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100 relative min-w-[320px] flex flex-col min-h-[350px]">
      <div className="absolute top-4 right-4">
        <button
          onClick={handleFollow}
          className={`px-2 py-1 rounded text-xs font-medium hover:scale-110 transition-all group ${isFollowed ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          <svg className="w-4 h-4 group-hover:hidden" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <span className="hidden group-hover:inline">{isFollowed ? 'Following' : 'Follow'}</span>
        </button>
      </div>
      <div className="flex items-center mb-4">
        <img
          src={match.profilePic}
          alt={`${match.name}'s profile`}
          className="w-12 h-12 rounded-full mr-3 border-2 border-gray-200"
        />
        <div>
          <h3 className="text-xl font-bold flex items-center text-blue-600">
            {match.name}
            {match.verified && (
              <svg
                className="w-6 h-6 ml-2 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </h3>
          <p className="text-sm text-gray-600 font-medium">{match.travelStyle}</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-base font-semibold text-gray-700 mb-1">Interests: <span className="font-normal">{match.interests.join(', ')}</span></p>
        <p className="text-base font-semibold text-gray-700">Compatibility: <span className="font-normal text-green-700 cursor-pointer" onClick={() => setShowDialog(true)}>{compatibility.total}%</span></p>
        <div className="mb-2">
          <p className="text-base font-semibold text-gray-700 mb-2">Destination: {match.destination}</p>
          <img src={match.destinationPic} alt={match.destination} className="w-full h-20 object-cover rounded-lg" />
        </div>
        <p className="text-base font-semibold text-gray-700 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          Date: <span className="font-normal">{new Date(match.date).toLocaleDateString()}</span>
        </p>
      </div>


      <div className="flex justify-center gap-3 mt-auto">
        <button
          onClick={handleChat}
          className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-600 transition-all group"
        >
          <svg className="w-5 h-5 group-hover:hidden" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
          </svg>
          <span className="hidden group-hover:inline">Chat</span>
        </button>
        <button
          onClick={handleJoinRequest}
          className={`px-3 py-1 rounded-lg text-sm font-medium hover:scale-110 transition-all group ${isRequested ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          <svg className="w-5 h-5 group-hover:hidden" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1z" />
          </svg>
          <span className="hidden group-hover:inline">{isRequested ? 'Requested' : 'Join Request'}</span>
        </button>
        <button
          onClick={handleSave}
          className={`px-3 py-1 rounded-lg text-sm font-medium hover:scale-110 transition-all group ${isSaved ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          <svg className="w-5 h-5 group-hover:hidden" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
          <span className="hidden group-hover:inline">{isSaved ? 'Saved' : 'Save'}</span>
        </button>
      </div>

      {showChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-md w-full h-96 flex flex-col">
            <h3 className="text-lg font-bold mb-2">Chat with {match.name}</h3>
            <div className="flex-1 overflow-y-auto mb-4">
              {messages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block px-3 py-1 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
            {match.chatStarters.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Chat Starters:</p>
                <div className="flex flex-wrap gap-2">
                  {match.chatStarters.map((starter, index) => (
                    <button key={index} onClick={() => handleSendStarter(starter)} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg text-xs hover:bg-gray-300">
                      {starter}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type a message..."
              />
              <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600">Send</button>
            </div>
            <button onClick={() => setShowChat(false)} className="mt-2 bg-gray-500 text-white px-4 py-2 rounded">Close</button>
          </div>
        </div>
      )}

      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl shadow-2xl max-w-sm w-full border border-gray-200" style={{ resize: 'both', overflow: 'auto', minWidth: '300px', minHeight: '400px' }}>
            <h3 className="text-lg font-bold mb-3 text-center text-blue-600">Compatibility Breakdown</h3>
            <div className="grid grid-cols-2 gap-4 mb-3">
              {pieData.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={item.color}
                        strokeWidth="3"
                        strokeDasharray={`${item.value}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-700">{item.value}%</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-700 mt-1">{item.name}</span>
                </div>
              ))}
            </div>
            <div className="text-center mb-3">
              <p className="text-sm font-bold text-gray-800"><span>Total Compatibility: </span><span className="text-green-600">{compatibility.total}%</span></p>
            </div>
            <div className="flex justify-center">
              <button onClick={() => setShowDialog(false)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-all text-sm">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchCard;
