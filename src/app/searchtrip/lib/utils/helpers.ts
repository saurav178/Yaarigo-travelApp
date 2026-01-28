/**
 * Helper functions for the search trip module
 */

/**
 * Extracts initials from a name
 * @param name - Full name string
 * @returns Uppercase initials
 */
export const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

/**
 * Returns styling classes for host category badges
 * @param category - Host category
 * @returns Object with bg and avatarBg classes
 */
export const getCategoryStyle = (category: string) => {
  switch (category) {
    case "Travel Enthusiast":
      return {
        bg: "bg-blue-100 text-blue-800",
        avatarBg: "bg-blue-500 text-white",
      };
    case "Featured Trip Leader":
      return {
        bg: "bg-yellow-100 text-yellow-800",
        avatarBg: "bg-yellow-500 text-white",
      };
    case "Featured Trip Agency":
      return {
        bg: "bg-orange-100 text-orange-800",
        avatarBg: "bg-orange-500 text-white",
      };
    default:
      return {
        bg: "bg-gray-100 text-gray-800",
        avatarBg: "bg-gray-500 text-white",
      };
  }
};

/**
 * Returns styling classes for safe score badges
 * @param score - Safety score (0-100)
 * @returns CSS classes string
 */
export const getSafeScoreStyle = (score: number): string => {
  if (score < 50)
    return "bg-red-100 text-red-700 border border-red-300 px-2 py-[2px] rounded-md flex items-center gap-1 text-xs";
  if (score < 75)
    return "bg-yellow-100 text-yellow-800 border border-yellow-300 px-2 py-[2px] rounded-md flex items-center gap-1 text-xs";
  return "bg-green-100 text-green-700 border border-green-300 px-2 py-[2px] rounded-md flex items-center gap-1 text-xs";
};
