"use client";

interface RoundButtonProps {
  number: number;
  active?: boolean;
  onClick?: () => void;
}

const RoundButton = ({ number, active = false, onClick }: RoundButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex-0 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer
        ${active ? "bg-red-600 shadow-md scale-105" : "bg-red-400 hover:bg-red-500 hover:shadow-md"}`}
    >
      <span className="text-white font-bold text-lg">{number}</span>
    </div>
  );
};

export default RoundButton;