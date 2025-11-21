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
    ${active ? "bg-red-600 shadow-md scale-105" : "bg-red-600 hover:shadow-md"}`
  }
  style={{ borderRadius: "50%" }} 
>
  <button
    onClick={onClick}
    className="text-white font-bold text-lg w-full h-full flex items-center justify-center rounded-full"
  >
    {number}
  </button>
</div>

  
  );
};

export default RoundButton;
