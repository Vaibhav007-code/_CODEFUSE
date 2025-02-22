import React, { useState } from 'react';
import ReminderModal from './ReminderModal';
import { formatDate } from '../utils/dateUtils';

const HackathonCard = ({ hackathon }) => {
  const [showReminder, setShowReminder] = useState(false);

  // Guard: if hackathon is missing or missing expected properties, render nothing.
  if (!hackathon || typeof hackathon.online === 'undefined') return null;

  // Prepare data for the reminder modal with clear participation instructions.
  const hackathonForReminder = {
    ...hackathon,
    platform: hackathon.online
      ? 'Online – Participate Virtually'
      : `On-site – Attend in ${hackathon.city}, ${hackathon.country}`
  };

  return (
    <div className="contest-card" style={{ borderLeft: `4px solid #6b5b95` }}>
      <div className="card-header">
        <h3>{hackathon.name}</h3>
        <span className="platform-tag" style={{ backgroundColor: hackathon.online ? '#4CAF50' : '#f15a24' }}>
          {hackathon.online
            ? 'Online – Participate Virtually'
            : `On-site – Attend in ${hackathon.city}`}
        </span>
      </div>
      
      <div className="time-details">
        <div className="time-item">
          <span>🕒 Starts:</span>
          <time>{formatDate(hackathon.startTime)}</time>
        </div>
        <div className="time-item">
          <span>🏁 Ends:</span>
          <time>{formatDate(hackathon.endTime)}</time>
        </div>
      </div>
      
      <div className="location-details">
        <span><strong>Country:</strong> {hackathon.country}</span>
        {!hackathon.online && (
          <span><strong>City:</strong> {hackathon.city}</span>
        )}
      </div>

      <div className="card-actions">
        <a
          href={hackathon.url}
          target="_blank"
          rel="noopener noreferrer"
          className="participate-btn"
        >
          Learn More
        </a>
        <button className="reminder-btn" onClick={() => setShowReminder(true)}>
          ⏰ Set Reminder
        </button>
      </div>
      
      {showReminder && (
        <ReminderModal contest={hackathonForReminder} onClose={() => setShowReminder(false)} />
      )}
    </div>
  );
};

export default HackathonCard;
