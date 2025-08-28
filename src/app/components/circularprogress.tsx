// app/components/CircularProgress.tsx
'use client';

import { useEffect, useState } from 'react';

interface CircularProgressProps {
  score: number;
  size?: number;
  color?: 'green' | 'orange' | 'red';
  strokeWidth?: number;
}

const CircularProgress = ({ 
  score, 
  size = 100, 
  color = 'green', 
  strokeWidth = 8 
}: CircularProgressProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const colors = {
    green: '#10B981',
    orange: '#F59E0B',
    red: '#EF4444',
  };

  const backgroundColors = {
    green: '#D1FAE5',
    orange: '#FEF3C7',
    red: '#FEE2E2',
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColors[color]}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors[color]}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      {/* Score text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span 
          className="font-bold text-gray-800"
          style={{ fontSize: size / 5 }}
        >
          {Math.round(animatedScore)}
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;