// DashboardHeader Data
export const navItems = [
  { 
    href: "/dashboard", 
    label: "My Trips",
    iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
  },
  { 
    href: "/searchtrip", 
    label: "Explore",
    iconPath: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  },
  { 
    href: "/dashboard/nearby", 
    label: "Nearby",
    iconPath: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"
  },
  { 
    href: "/community", 
    label: "Community",
    iconPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
  }
];

// ProfileDropdown Data
export const userData = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://i.pravatar.cc/150?img=12",
  hasNotifications: true,
};

export const menuItems = [
  {
    href: "/dashboard/profile",
    label: "My Profile",
    iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
  },
  {
    href: "/userProfile",
    label: "User Profile",
    iconPath: "M5.121 17.804A4 4 0 017 7h10a4 4 0 011.879 10.804M12 14v7m-3-3h6"
  },
  {
    href: "/dashboard/bookings",
    label: "My Bookings",
    iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
  },
  {
    href: "/dashboard/favorites",
    label: "Favorites",
    iconPath: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    iconPath: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z"
  }
];

// QuickActions Data
export const quickActionCards = [
  {
    title: "Explore Trip",
    description: "Find places to go based on your interests",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    type: "explore"
  },
  {
    title: "Nearby Essentials",
    description: "Hospitals, ATMs",
    image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=800&q=80",
    type: "essentials"
  },
  {
    title: "My Trip",
    description: "View Itinerary",
    subDescription: "Tickets",
    image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&q=80",
    type: "mytrip",
    badge: "confirmed"
  },
  {
    title: "Community",
    description: "Meet our Travio community",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    type: "community"
  }
];

export const smartSuggestions = [
  {
    text: "Hotels near you",
    iconPath: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
  },
  {
    text: "Cab options",
    iconPath: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
  },
  {
    text: "Explore weekend trips",
    iconPath: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
  }
];

export const liveAlerts = [
  {
    text: "3 new trip confirmations",
    iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    text: "Your London flight is delayed",
    iconPath: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600"
  }
];

// RecentTrips Data
export const recentTrips = [
  {
    id: "1",
    title: "Paris Adventure",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    gradient: "from-blue-400 via-purple-400 to-pink-400",
    status: {
      label: "Upcoming",
      color: "text-blue-600"
      
    },
    dates: "Dec 15 - Dec 22, 2024",
    buttonText: "View Details",
    buttonStyle: "bg-gradient-to-r from-[#1DA69B] to-[#1D4350] text-white hover:shadow-xl"
  },
  {
    id: "2",
    title: "Bali Getaway",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    gradient: "from-green-400 via-teal-400 to-blue-400",
    status: {
      label: "Completed",
      color: "text-green-600"
      
    },
    dates: "Nov 10 - Nov 17, 2024",
    buttonText: "View Memories",
    buttonStyle: "bg-gray-100 text-gray-700 hover:bg-gray-200"
  },
  {
    id: "3",
    title: "Tokyo Exploration",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    gradient: "from-purple-400 via-pink-400 to-red-400",
    status: {
      label: "Planning",
      color: "text-purple-600"
      
    },
    dates: "Jan 5 - Jan 12, 2025",
    buttonText: "Continue Planning",
    buttonStyle: "bg-gradient-to-r from-[#1DA69B] to-[#1D4350] text-white hover:shadow-xl"
  }
];

// RecommendedSection Data
export const tabs = ["Hotels", "Restaurants", "Adventure spots"];

export const recommendedCards = [
  {
    title: "Luxury Hotels",
    description: "Deal",
    mainText: "Flat 30% off on Premium rooms",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    buttonText: "Book Now",
    buttonStyle: "bg-gradient-to-r from-[#1DA69B] to-[#1D4350] text-white hover:shadow-lg"
  },
  {
    title: "Famous Restaurants",
    description: "Best local food & rating near you",
    mainText: "",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    buttonText: "Explore",
    buttonStyle: "bg-gray-100 text-gray-700 hover:bg-gray-200"
  },
  {
    title: "Adventure spot",
    description: "Top ride, trek & activities",
    mainText: "",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    buttonText: "See Details",
    buttonStyle: "bg-gray-100 text-gray-700 hover:bg-gray-200"
  }
];

// StatsCards Data
export const statsCards = [
  {
    title: "Total Trips",
    count: "12",
    subText: "+2 this month",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    gradient: "from-[#1DA69B] to-[#1D4350]"
  },
  {
    title: "Completed",
    count: "9",
    subText: "Last 2 weeks ago",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    gradient: "from-green-600 to-green-700"
  }
];

