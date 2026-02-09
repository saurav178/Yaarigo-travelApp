// export type UserRole = 'INDIVIDUAL' | 'ORGANIZATION';

// export interface User {
//   id: string;
//   email: string;
//   full_name: string;
//   phone_number: string;
//   role: UserRole;
//   organization_name?: string;
// }
// export interface RegisterResponse {
//   id?: string;
//   email?: string;
//   full_name?: string;
//   message?: string; // Often backends send a "Success" message
//   status?: number;
// }

// export interface AuthState {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
// }

// export interface LoginCredentials {
//   email: string;    
//   password: string; 
// }

// export interface RegisterData {
//   email: string;
//   full_name: string;
//   password: string;
//   phone_number: string;
//   role: string;
//   organization_name?: string;
// }

// // Organization payload structure
// export interface RegisterOrgPayload {
//   legal_name: string;
//   display_name: string;
//   slug: string;
// }

// // Success response structure
// export interface RegisterOrgResponse {
//   organization?: {
//     slug: string;
//     id: string;
   
//   };
//   slug?: string;
//   message?: string;
// }

// // Axios Error Interface (Standard for production)
// export interface ApiErrorResponse {
//   message: string | string[];
//   error?: string;
//   statusCode?: number;
// }

// export interface Organization {
//   id: string;
//   name: string;
//   slug: string;
//   role?: string; // Optional: agar aap store kar rahe hain
// }

// // AuthState ko bhi update karein taaki context ko pata ho organization kya hai
// export interface AuthState {
//   user: User | null;
//   organization: Organization[] | null; // Array of Organization
//   isAuthenticated: boolean;
//   isLoading: boolean;
// }


export type UserRole = 'INDIVIDUAL' | 'ORGANIZATION';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  role?: string; 
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone_number: string;
  role: UserRole;
  organization_name?: string;
  // Backend se aane wali organizations ko yahan define karna zaroori hai
  organizations?: Organization[]; 
}

export interface AuthState {
  user: User | null;
  organization: Organization[] | null; 
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface RegisterResponse {
  id?: string;
  email?: string;
  full_name?: string;
  message?: string; 
  status?: number;
}

export interface LoginCredentials {
  email: string;    
  password: string; 
}

export interface RegisterData {
  email: string;
  full_name: string;
  password: string;
  phone_number: string;
  role: string;
  organization_name?: string;
}

export interface RegisterOrgPayload {
  legal_name: string;
  display_name: string;
  slug: string;
}

// export interface RegisterOrgResponse {
//   organization?: {
//     slug: string;
//     id: string;
//   };
//   slug?: string;
//   message?: string;
// }

export interface ApiErrorResponse {
  message: string | string[];
  error?: string;
  statusCode?: number;
}

export interface RegisterOrgPayload {
  legal_name: string;
  display_name: string;
  slug: string;
}

export interface RegisterOrgResponse {
  message: string;
  organization: {
    id: string;
    aegixa_org_id: string;
    legal_name: string;
    slug: string;
    status: string;
  };
}