import { FC } from "react";

const VerifiedBadge: FC<{ size?: number }> = ({ size = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className="ml-1"
    >
      {/* Blue starburst background */}
      <path
        fill="#3B82F6"
        d="M256 32l53.3 37.9 62.4-8.4 22.8 59.1 59.1 22.8-8.4 62.4L480 256l-37.9 53.3 8.4 62.4-59.1 22.8-22.8 59.1-62.4-8.4L256 480l-53.3-37.9-62.4 8.4-22.8-59.1-59.1-22.8 8.4-62.4L32 256l37.9-53.3-8.4-62.4 59.1-22.8 22.8-59.1 62.4 8.4L256 32z"
      />
      {/* White check mark */}
      <path
        fill="#fff"
        d="M362.7 186.7L224 325.3l-74.7-74.6 30-30L224 265.3l108.7-108.6z"
      />
    </svg>
  );
};

export default VerifiedBadge;
