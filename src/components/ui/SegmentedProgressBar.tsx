import React from "react";

interface ProgressBarProps {
  progress: number; // Progress in percentage (0 to 100)
  segments?: number; // Number of mini-segments (default: 6)
}

const SegmentedProgressBar: React.FC<ProgressBarProps> = ({ progress, segments = 6 }) => {
  const filledSegments = Math.round((progress / 100) * segments); // Calculate filled segments

  // Determine progress color based on % completion
  const progressColor =
    progress < 30 ? "bg-red-500" : progress < 70 ? "bg-yellow-500" : "bg-green-500";

  return (
    <div className="flex w-full h-4 bg-gray-300 rounded-lg overflow-hidden shadow-md">
      {Array.from({ length: segments }).map((_, index) => (
        <div
          key={index}
          className={`w-1/${segments} h-full mx-[1px] ${
            index < filledSegments ? progressColor : "bg-gray-100"
          }`}
        />
      ))}
    </div>
  );
};

export default SegmentedProgressBar;