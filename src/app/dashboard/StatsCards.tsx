export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Total Trips */}
      <div className="group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 bg-gradient-to-br from-[#1DA69B] to-[#1D4350]">
        <div className="flex items-center h-32">
          {/* Left Side - Curved Image */}
          <div className="relative w-1/3 h-full overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                clipPath: "ellipse(100% 100% at 0% 50%)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"
                alt="Travel"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="flex-1 px-6 py-4">
            <p className="text-white/90 text-sm font-medium mb-1">Total Trips</p>
            <p className="text-5xl font-bold text-white mb-1">12</p>
            <p className="text-xs text-white/80 font-medium">+2 this month</p>
          </div>
        </div>
      </div>

      {/* Completed */}
      <div className="group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 bg-gradient-to-br from-green-600 to-green-700">
        <div className="flex items-center h-32">
          {/* Left Side - Curved Image */}
          <div className="relative w-1/3 h-full overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                clipPath: "ellipse(100% 100% at 0% 50%)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80"
                alt="Completed"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="flex-1 px-6 py-4">
            <p className="text-white/90 text-sm font-medium mb-1">Completed</p>
            <p className="text-5xl font-bold text-white mb-1">9</p>
            <p className="text-xs text-white/80 font-medium">Last 2 weeks ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}