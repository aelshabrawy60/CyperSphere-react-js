import { platforms } from "../../../data/platforms";
import PlatformCard from "../PlatformCard/PlatformCard";

const PlatformsViewer = () => {
  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Learning Platforms</h2>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-900"></span>
            <span className="text-sm text-gray-300">Free</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-900"></span>
            <span className="text-sm text-gray-300">Paid</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((platform, index) => (
          <PlatformCard key={index} platform={platform} />
        ))}
      </div>
    </div>
  );
};

export default PlatformsViewer;
