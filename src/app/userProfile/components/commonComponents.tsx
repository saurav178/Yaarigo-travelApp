import {SectionProps} from "../Types"

export function Section({ children }: SectionProps) {
  return (
    <div className="p-4 sm:p-6 shadow-lg bg-white mt-6  ">
      {children}
    </div>
  );
}