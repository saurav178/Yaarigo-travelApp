"use client";

import React, { useState, useEffect } from 'react';
import MatchCard from './MatchCard';

interface Match {
  id: string;
  name: string;
  age: number;
  gender: string;
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

const mockMatches: Match[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    age: 28,
    gender: 'Female',
    profilePic: 'https://picsum.photos/150/150?random=1',
    verified: true,
    interests: ['Hiking', 'Photography'],
    travelStyle: 'Adventure Seeker',
    compatibilityScore: 85,
    destination: 'Paris, France',
    destinationPic: 'https://picsum.photos/300/200?random=1',
    date: '2023-12-15',
    chatStarters: ['What\'s your favorite hiking trail?', 'Let\'s plan a trip!'],
  },
  {
    id: '2',
    name: 'Bob Smith',
    age: 32,
    gender: 'Male',
    profilePic: 'https://picsum.photos/150/150?random=2',
    verified: false,
    interests: ['Food', 'Culture'],
    travelStyle: 'Cultural Explorer',
    compatibilityScore: 92,
    destination: 'Tokyo, Japan',
    destinationPic: 'https://picsum.photos/300/200?random=2',
    date: '2024-01-20',
    chatStarters: ['What\'s your favorite food?', 'Let\'s explore Tokyo together.'],
  },
  {
    id: '3',
    name: 'Charlie Brown',
    age: 25,
    gender: 'Male',
    profilePic: 'https://picsum.photos/150/150?random=3',
    verified: true,
    interests: ['Beach', 'Relaxation'],
    travelStyle: 'Relaxation Lover',
    compatibilityScore: 78,
    destination: 'Bali, Indonesia',
    destinationPic: 'https://picsum.photos/300/200?random=3',
    date: '2024-02-10',
    chatStarters: ['Beach or mountains?', 'Tell me about your dream vacation.'],
  },
  {
    id: '4',
    name: 'Diana Prince',
    age: 30,
    gender: 'Female',
    profilePic: 'https://picsum.photos/150/150?random=4',
    verified: true,
    interests: ['History', 'Museums'],
    travelStyle: 'History Buff',
    compatibilityScore: 88,
    destination: 'Rome, Italy',
    destinationPic: 'https://picsum.photos/300/200?random=4',
    date: '2024-03-05',
    chatStarters: ['Which historical site have you visited?', 'Share a fun fact about history.'],
  },
  {
    id: '5',
    name: 'Ethan Hunt',
    age: 35,
    gender: 'Male',
    profilePic: 'https://picsum.photos/150/150?random=5',
    verified: false,
    interests: ['Adventure', 'Extreme Sports'],
    travelStyle: 'Thrill Seeker',
    compatibilityScore: 95,
    destination: 'New Zealand',
    destinationPic: 'https://picsum.photos/300/200?random=5',
    date: '2024-04-12',
    chatStarters: ['What\'s your most thrilling adventure?', 'Let\'s plan an extreme trip!'],
  },
  {
    id: '6',
    name: 'Fiona Green',
    age: 27,
    gender: 'Female',
    profilePic: 'https://picsum.photos/150/150?random=6',
    verified: true,
    interests: ['Nature', 'Wildlife'],
    travelStyle: 'Nature Lover',
    compatibilityScore: 82,
    destination: 'Kenya, Africa',
    destinationPic: 'https://picsum.photos/300/200?random=6',
    date: '2024-05-18',
    chatStarters: ['What\'s your favorite animal?', 'Let\'s go on a safari!'],
  },
  {
    id: '7',
    name: 'George Lucas',
    age: 40,
    gender: 'Male',
    profilePic: 'https://picsum.photos/150/150?random=7',
    verified: false,
    interests: ['Movies', 'Technology'],
    travelStyle: 'Tech Enthusiast',
    compatibilityScore: 90,
    destination: 'Los Angeles, USA',
    destinationPic: 'https://picsum.photos/300/200?random=7',
    date: '2024-06-22',
    chatStarters: ['What\'s your favorite movie?', 'Let\'s discuss the latest gadgets.'],
  },
  {
    id: '8',
    name: 'Hannah Montana',
    age: 26,
    gender: 'Female',
    profilePic: 'https://picsum.photos/150/150?random=8',
    verified: true,
    interests: ['Music', 'Performing Arts'],
    travelStyle: 'Artist',
    compatibilityScore: 87,
    destination: 'London, UK',
    destinationPic: 'https://picsum.photos/300/200?random=8',
    date: '2024-07-08',
    chatStarters: ['What instrument do you play?', 'Let\'s attend a concert together.'],
  },
];

const MatchTravelUI: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>(mockMatches);
  const [viewMode, setViewMode] = useState<'grid' | 'swipe'>('grid');

  // Simulate dynamic updates
  useEffect(() => {
    // Commented out: add a new match every 10 seconds
    /*
    const interval = setInterval(() => {
      // For demo, add a new match every 10 seconds
      const newMatch: Match = {
        id: Date.now().toString(),
        name: 'New User',
        profilePic: 'https://via.placeholder.com/150',
        verified: Math.random() > 0.5,
        interests: ['Random'],
        travelStyle: 'Explorer',
        compatibilityScore: Math.floor(Math.random() * 100),
      };
      setMatches(prev => [newMatch, ...prev]);
    }, 10000);

    return () => clearInterval(interval);
    */
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 pl-40">
      <h1 className="text-2xl font-bold mb-4 mt-8">Yours Matched Partners</h1>
      {/* <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setViewMode('grid')}
          className={`px-4 py-2 rounded-lg font-medium ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          Grid View
        </button>
        <button
          onClick={() => setViewMode('swipe')}
          className={`px-4 py-2 rounded-lg font-medium ${viewMode === 'swipe' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          Swipe View
        </button>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {matches.map(match => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
};

export default MatchTravelUI;
