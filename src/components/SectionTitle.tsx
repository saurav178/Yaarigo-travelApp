import { FC, ReactNode } from "react";

interface Props {
  title: string;
  children?: ReactNode;
}

const SectionTitle: FC<Props> = ({ title, children }) => (
  <div className="flex justify-between items-center mb-6 border-b pb-2">
    <h2 className="text-xl font-bold">{title}</h2>
    {children}
  </div>
);

export default SectionTitle;
