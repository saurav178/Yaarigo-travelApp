// export type TripStatus = "confirmed" | "planning" | "completed";

// export interface Trip {
//   status: any;
//   location: ReactNode;
//   start: ReactNode;
//   end: ReactNode;
//   participants: any;
//   id: string;

//   title: string;
//   description: string;
//   image: string;

//   tags: string[];

//   from: string;
//   to: string;

//   date: string;

//   travelersNeeded: number;
//   spotsLeft: number;

//   price?: string; // optional if backend may not send
//   rating?: number | null;

//   host: {
//     name: string;
//     age: number;
//     verified: boolean;
//     location: string;
//     rating: number;
//     match: number;
//     safeScore: number;
//     category:
//       | "Travel Enthusiast"
//       | "Trip Agency"
//       | "Featured Trip Leader"
//       | "Featured Trip Agency";
//   };
// }


// export interface Review {
//   id: string;
//   name: string;
//   title: string;
//   text: string;
//   tags: string[];
//   date: string;
//   rating: number;
//   image: string;
// }

// export interface Follower {
//   name: string;
//   username: string;
//   image: string;
//   isFollowing?: boolean;
// }

// export interface Following {
//   name: string;
//   username: string;
//   image: string;
//   isFollowing: boolean;
// }

// export interface SocialLinks {
//   instagram: string;
//   facebook: string;
// }

// export interface EmergencyContact {
//   contactName: string;
//   contactPhone: string;
// }

// export interface Profile {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   location: string;
//   dob: string;
//   gender: string;
//   occupation: string;
//   about: string;
//   profilePhoto: string | File;
//   coverPhoto: string | File;
//   travelStyles: string[];
//   languages: string[];
//   social: SocialLinks;
//   emergency: EmergencyContact;
//   trips: Trip[];
//   gallery: string[];
//   showAllGallery: boolean;
//   reviews: Review[];
//   showAllReviews: boolean;
//   followers: number;
//   following: number;
//   tripsCompleted: number;
//   followersList: Follower[];
//   followingList: Following[];
// }

// export interface SectionProps {
//   children: React.ReactNode;
// }

// export interface FileUploadFieldProps {
//   label: string;
//   value: string | File;
//   onChange: (file: File) => void;
// }

// export interface InlineIconRowProps {
//   icon: string;
//   text: string;
// }

// export interface ViewTagListProps {
//   all: string[];
//   selected: string[];
// }

// export interface InputFieldProps {
//   label: string;
//   value: string;
//   onChange: (value: string) => void;
//   type?: string;
// }

// export interface SelectFieldProps {
//   label: string;
//   value: string;
//   onChange: (value: string) => void;
//   options: string[];
// }

// export interface TextareaFieldProps {
//   label: string;
//   value: string;
//   onChange: (value: string) => void;
// }

// export interface TripCardProps {
//   trip: Trip;
// }

// export interface SectionProps {
//   children: React.ReactNode;
// }

// export interface FileUploadFieldProps {
//   label: string;
//   value: string | File;
//   onChange: (file: File) => void;
// }

// export interface InlineIconRowProps {
//   icon: string;
//   text: string;
// }

// export interface ViewTagListProps {
//   all: string[];
//   selected: string[];
// }

// export interface InputFieldProps {
//   label: string;
//   value: string;
//   onChange: (value: string) => void;
//   type?: string;
// }


// export interface SelectFieldProps {
//   label: string;
//   value: string;
//   onChange: (value: string) => void;
//   options: string[];
// }

// export interface TextareaFieldProps {
//   label: string;
//   value: string;
//   onChange: (value: string) => void;
// }

// export interface TripCardProps {
//   trip: Trip;
// }


import { ReactNode } from "react";

/* -------------------- Trip Types -------------------- */

export type TripStatus = "confirmed" | "planning" | "completed";

export interface TripParticipant {
  id: string;
  name: string;
  image?: string;
}

export interface Trip {
  id: string;
  status: TripStatus;

  title: string;
  description: string;
  image: string;

  location: ReactNode;
  start: ReactNode;
  end: ReactNode;

  participants: TripParticipant[];

  tags: string[];

  from: string;
  to: string;
  date: string;

  travelersNeeded: number;
  spotsLeft: number;

  price?: string;
  rating?: number | null;

  host: {
    name: string;
    age: number;
    verified: boolean;
    location: string;
    rating: number;
    match: number;
    safeScore: number;
    category:
      | "Travel Enthusiast"
      | "Trip Agency"
      | "Featured Trip Leader"
      | "Featured Trip Agency";
  };
}

/* -------------------- Review & Social -------------------- */

export interface Review {
  id: string;
  name: string;
  title: string;
  text: string;
  tags: string[];
  date: string;
  rating: number;
  image: string;
}

export interface Follower {
  name: string;
  username: string;
  image: string;
  isFollowing?: boolean;
}

export interface Following {
  name: string;
  username: string;
  image: string;
  isFollowing: boolean;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
}

export interface EmergencyContact {
  contactName: string;
  contactPhone: string;
}

/* -------------------- Profile -------------------- */

export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  dob: string;
  gender: string;
  occupation: string;
  about: string;

  profilePhoto: string | File;
  coverPhoto: string | File;

  travelStyles: string[];
  languages: string[];

  social: SocialLinks;
  emergency: EmergencyContact;

  trips: Trip[];

  gallery: string[];
  showAllGallery: boolean;

  reviews: Review[];
  showAllReviews: boolean;

  followers: number;
  following: number;
  tripsCompleted: number;

  followersList: Follower[];
  followingList: Following[];
}

/* -------------------- Shared UI Props -------------------- */

export interface SectionProps {
  children: React.ReactNode;
}

export interface FileUploadFieldProps {
  label: string;
  value: string | File;
  onChange: (file: File) => void;
}

export interface InlineIconRowProps {
  icon: string;
  text: string;
}

export interface ViewTagListProps {
  all: string[];
  selected: string[];
}

export interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

export interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export interface TextareaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export interface TripCardProps {
  trip: Trip;
}
