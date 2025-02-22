import { useState } from 'react';
import ReminderModal from './ReminderModal';
import { formatDate } from '../utils/dateUtils';

const platformColors = {
  Codeforces: '#f15a24',
  LeetCode: '#ffa116',
  CodeChef: '#7b2e26',
  HackerRank: '#2ec866'
};

const ContestCard = ({ contest }) => {
  const [showReminder, setShowReminder] = useState(false);

  return (
    <div
      className={`contest-card ${showReminder ? 'modal-open' : ''}`}
      style={{ borderLeft: `4px solid ${platformColors[contest.platform]}` }}
    >
      <div className="card-header">
        <h3>{contest.name}</h3>
        <span
          className="platform-tag"
          style={{ backgroundColor: platformColors[contest.platform] }}
        >
          {contest.platform}
        </span>
      </div>

      <div className="time-details">
        <div className="time-item">
          <span>🕒 Starts:</span>
          <time>{formatDate(contest.startTime)}</time>
        </div>
        <div className="time-item">
          <span>🏁 Ends:</span>
          <time>{formatDate(contest.endTime)}</time>
        </div>
        <div className="time-item">
          <span>⏳ Duration:</span>
          <span>
            {Math.floor(contest.duration / 3600)}h{' '}
            {(contest.duration % 3600) / 60}m
          </span>
        </div>
      </div>

      <div className="card-actions">
        <a
          href={contest.url}
          target="_blank"
          rel="noopener noreferrer"
          className="participate-btn"
        >
          Participate Now
        </a>
        <button className="reminder-btn" onClick={() => setShowReminder(true)}>
          ⏰ Set Reminder
        </button>
      </div>

      {showReminder && (
        <ReminderModal contest={contest} onClose={() => setShowReminder(false)} />
      )}
    </div>
  );
};

export default ContestCard;
