
// src/types/react-date-range.d.ts
declare module "react-date-range" {
  import { ComponentType } from "react";

  export interface Range {
    startDate: Date;
    endDate: Date;
    key: string;
  }

  export interface DateRangeProps {
    ranges: Range[];                 // required
    onChange?: (ranges: { [key: string]: Range }) => void;
    minDate?: Date;
    maxDate?: Date;
    showMonthAndYearPickers?: boolean;
    moveRangeOnFirstSelection?: boolean;
    months?: number;
    direction?: "horizontal" | "vertical";
    showDateDisplay?: boolean;
    scroll?: { enabled: boolean }; 
    disabledDates?: Date[];
  }

  export interface RegisterRequest {
  email: string;
  full_name: string;
  password: string;
  phone_number: string;
  role: "INDIVIDUAL" | "ORGANIZATION"; 
  organization_name?: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token?: string;
  refresh_token?: string;
  user?: {
    id: string;
    email: string;
    full_name: string;
  };
  message?: string;
}
export interface Organization {
  id: string;
  name: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  organizations: Organization[]; 
}

export interface LoginResponse {
  access_token?: string;
  refresh_token?: string;
  user?: UserProfile; 
  message?: string;
}

  export const DateRange: ComponentType<DateRangeProps>;
}
