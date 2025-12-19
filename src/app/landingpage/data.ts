// Community Section Data
export const communityTestimonials = [
  {
    name: "Sarah Chen",
    location: "Tokyo, Japan",
    text: `I found the perfect travel buddy for my Southeast Asia trip! We had similar interests and it made the journey unforgettable.`,
    initials: "SC",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Marcus Rodriguez",
    location: "Barcelona, Spain",
    text: `The AI matching is incredible. Every person I connected with was genuinely compatible with my travel style.`,
    initials: "MR",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    name: "Emma Wilson",
    location: "New York, USA",
    text: `Safety features gave me peace of mind. I felt secure meeting new people and exploring together.`,
    initials: "EW",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    name: "Raj Patel",
    location: "Mumbai, India",
    text: `Made lifelong friends through Travio. Now we are planning our third trip together, awesome!`,
    initials: "RP",
    gradient: "from-blue-500 to-cyan-500",
  },
];

export const communityStats = [
  { value: "50K+", label: "Active Travelers" },
  { value: "150+", label: "Countries" },
  { value: "100K+", label: "Trips Planned" },
  { value: "4.9/5", label: "User Rating" },
];

// How It Works Section Data
export const howItWorksSteps = [
  { step: 1, title: "Plan smarter with AI", image: "/images/how1.jpg" },
  { step: 2, title: "Meet verified, like-minded travelers", image: "/images/how2.jpg" },
  { step: 3, title: "Stay safe with built-in protection", image: "/images/how3.jpg" },
  { step: 4, title: "Earn rewards and discover authentic experiences", image: "/images/how4.jpg" },
];

// Key Features Section Data
export const keyFeatures = [
  {
    icon: "/images/tripplanner2.png",
    title: "AI Trip Planner",
    description: "Personalized itineraries based on your preferences, time, and budget — crafted intelligently for every journey.",
  },
  {
    icon: "/images/travelmatching2.png",
    title: "Travel Matching",
    description: "Find travel companions who share your vibe and explore destinations together.",
  },
  {
    icon: "/images/safety2.png",
    title: "Safety & Trust",
    description: "Verified users, in-app check-ins, and trusted community ratings for peace of mind.",
  },
  {
    icon: "/images/social2.png",
    title: "Social Discovery",
    description: "Share your travel stories, join groups, and connect with explorers around the globe.",
  },
];

export const featureImages = [
  { src: "/images/img1.jpg", alt: "Trip 1" },
  { src: "/images/img2.jpg", alt: "Trip 2" },
  { src: "/images/img3.jpg", alt: "Trip 3" },
  { src: "/images/img4.jpg", alt: "Trip 4" },
];

// Safety & Trust Section Data
export const safetyFeatures = [
  {
    image: "/images/container1.png",
    title: "Verified Profiles",
    bgColor: "bg-blue-100",
  },
  {
    image: "/images/container2.png",
    title: "Safety Check-ins",
    bgColor: "bg-orange-100",
  },
  {
    image: "/images/container3.png",
    title: "AI-Based Compatibility & Moderation",
    bgColor: "bg-pink-100",
  },
  {
    image: "/images/container4.png",
    title: 'Emergency Assistance or "Travel Buddy" Mode',
    bgColor: "bg-green-100",
  },
];

// Why Choose Section Data
export const whyChooseFeatures = [
  {
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
    title: "Connect Authentically",
    description: "Meet verified travelers who share your interests, travel style, and destinations. Build meaningful connections before you go.",
    iconName: "Users",
  },
  {
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50",
    title: "AI-Powered Matching",
    description: "Our smart algorithm matches you with compatible travel companions based on your preferences, personality, and travel goals.",
    iconName: "Sparkles",
  },
  {
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50",
    title: "Travel Safely",
    description: "Verified profiles, secure messaging, and safety features ensure you can focus on the adventure, not the worries.",
    iconName: "ShieldCheck",
  },
];

// Common section titles and descriptions
export const sectionTitles = {
  community: {
    title: "Join Our Global Community",
    subtitle: "Hear from travelers who have found their perfect travel companions",
  },
  howItWorks: {
    title: "How it works",
    subtitle: "Experience travel like never before with features designed for modern explorers.",
  },
  keyFeatures: {
    title: "Key Features",
  },
  safetyTrust: {
    title: "Safety & Trust",
    subtitle: "Experience travel like never before with features designed for modern explorers.",
  },
  whyChoose: {
    title: "Why Choose Travio",
    subtitle: "Experience travel like never before with features designed for modern explorers",
  },
};

// Hero section constants
export const heroStats = "100k+ Verified Travelers ★ 98% Safety Rating ★ AI-Powered Matching";

// Animation styles
export const animationStyles = {
  blobAnimation: `
    @keyframes blob {
      0%, 100% {
        transform: translate(0, 0) scale(1);
      }
      33% {
        transform: translate(30px, -50px) scale(1.1);
      }
      66% {
        transform: translate(-20px, 20px) scale(0.9);
      }
    }
    .animate-blob {
      animation: blob 7s infinite;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }
  `,
};