import React, { useState } from 'react';

const ReminderModal = ({ contest, onClose }) => {
  const [reminderTime, setReminderTime] = useState('15');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSetReminder = () => {
    const contestTime = new Date(contest.startTime);
    const reminderTimeMs =
      contestTime.getTime() - parseInt(reminderTime, 10) * 60 * 1000;

    if (!('Notification' in window)) {
      alert('This browser does not support desktop notifications');
      return;
    }

    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        // Save reminder in localStorage
        const reminders = JSON.parse(
          localStorage.getItem('contestReminders') || '[]'
        );
        reminders.push({
          contestId: contest.id,
          contestName: contest.name,
          reminderTime: reminderTimeMs,
          platform: contest.platform
        });
        localStorage.setItem('contestReminders', JSON.stringify(reminders));

        // Schedule the notification and alarm sound
        const timeUntilReminder = reminderTimeMs - Date.now();
        if (timeUntilReminder > 0) {
          setTimeout(() => {
            new Notification(`Contest Reminder: ${contest.name}`, {
              body: `The contest starts in ${reminderTime} minutes on ${contest.platform}!`
            });
            // Play alarm sound – ensure you have alarm.mp3 in your public folder
            const alarm = new Audio('/alarm.mp3');
            alarm.play();
          }, timeUntilReminder);
        }

        setShowSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Set Reminder</h2>
        <div className="modal-body">
          <label>Remind me before:</label>
          <select
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </div>

        {showSuccess && (
          <div className="success-message">
            Reminder set successfully!
          </div>
        )}

        <div className="modal-actions">
          <button onClick={onClose} className="btn-cancel">
            Cancel
          </button>
          <button onClick={handleSetReminder} className="btn-set">
            Set Reminder
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReminderModal;
