// declare module "react-date-range" {
//   import { ComponentType } from "react";

//   export const DateRange: ComponentType<any>;
// }






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

  export const DateRange: ComponentType<DateRangeProps>;
}
