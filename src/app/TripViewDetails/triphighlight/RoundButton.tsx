"use client";

interface RoundButtonProps {
  number: number;
  active?: boolean;
  onClick?: () => void;
}

const RoundButton = ({ number, active = false, onClick }: RoundButtonProps) => {
  return (
    <div
      className={`flex-shrink-0 w-12 h-12 flex items-center justify-center transition-all duration-300
        rounded-full
        ${active ? "bg-red-600 shadow-md scale-105" : "bg-red-400 hover:bg-red-500 hover:shadow-md"}`
      }
      onClick={onClick} // directly handle click on div
    >
      <span className="text-white font-bold text-lg">{number}</span>
    </div>
  );
};

export default RoundButton;
