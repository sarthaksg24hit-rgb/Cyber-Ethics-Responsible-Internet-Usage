import { CheckCircle, Clock } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import './ModuleCard.css';

function getDynamicIcon(iconName) {
  if (!iconName) return LucideIcons.BookOpen;

  // Convert icon name to PascalCase component name
  const pascalName = iconName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  return LucideIcons[pascalName] || LucideIcons.BookOpen;
}

export default function ModuleCard({ module, status = 'available', onClick }) {
  const isCompleted = status === 'completed';
  const isAvailable = status === 'available';

  const IconComponent = getDynamicIcon(module?.icon);

  const handleClick = () => {
    if (onClick) {
      onClick(module);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(module);
    }
  };

  return (
    <div
      className={`module-card module-card--${status}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {/* Header */}
      <div className="module-card-header">
        <div className="module-card-icon">
          <IconComponent size={24} />
        </div>

        <span className={`module-card-status module-card-status--${status}`}>
          {isCompleted && <CheckCircle size={12} />}
          {isAvailable && 'Available'}
          {isCompleted && 'Completed'}
        </span>
      </div>

      {/* Content */}
      <h3 className="module-card-title">{module?.title || 'Module'}</h3>
      <p className="module-card-description">
        {module?.description || 'No description available.'}
      </p>

      {/* Footer */}
      <div className="module-card-footer">
        {module?.duration && (
          <span className="module-card-meta">
            <Clock size={14} />
            {module.duration}
          </span>
        )}
        {isCompleted && module?.score !== undefined && (
          <span className="module-card-meta">
            Score: {module.score}%
          </span>
        )}
      </div>
    </div>
  );
}
