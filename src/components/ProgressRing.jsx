import { useEffect, useState } from 'react';
import './ProgressRing.css';

export default function ProgressRing({
  percentage = 0,
  size = 120,
  strokeWidth = 8,
  color,
  label,
  showPercent = true,
}) {
  const [offset, setOffset] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const strokeColor =
    color ||
    (percentage >= 80
      ? 'var(--accent-green)'
      : percentage >= 60
      ? 'var(--accent-blue)'
      : percentage >= 40
      ? 'var(--accent-orange)'
      : 'var(--accent-red)');

  useEffect(() => {
    const timer = setTimeout(() => {
      const progress = Math.min(Math.max(percentage, 0), 100);
      setOffset(circumference - (progress / 100) * circumference);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage, circumference]);

  const fontSize = size * 0.22;

  return (
    <div className="progress-ring-wrapper">
      <div className="progress-ring-container" style={{ width: size, height: size }}>
        <svg
          className="progress-ring-svg"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            className="progress-ring-bg"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <circle
            className="progress-ring-fill"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke={strokeColor}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ filter: `drop-shadow(0 0 6px ${strokeColor})` }}
          />
        </svg>
        {showPercent && (
          <div className="progress-ring-text">
            <span className="progress-ring-percentage" style={{ fontSize }}>
              {Math.round(percentage)}
              <span className="progress-ring-percent-sign">%</span>
            </span>
          </div>
        )}
      </div>
      {label && <span className="progress-ring-label">{label}</span>}
    </div>
  );
}
