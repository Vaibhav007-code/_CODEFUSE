import React, { useState, useEffect } from 'react';
import ContestCard from '../components/ContestCard';
import { fetchContests } from '../services/api'; // Updated import

const Home = () => {
  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [platformFilter, setPlatformFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    // Use fetchContests instead of getContests
    fetchContests().then((data) => {
      setContests(data);
      setFilteredContests(data);
    });
  }, []);

  useEffect(() => {
    filterContests();
  }, [platformFilter, statusFilter, contests]);

  const getStatus = (contest) => {
    const now = Date.now();
    const start = new Date(contest.startTime).getTime();
    const end = new Date(contest.endTime).getTime();
    if (now < start) {
      return 'Upcoming';
    } else if (now >= start && now <= end) {
      return 'Running';
    } else {
      return 'Ended';
    }
  };

  const filterContests = () => {
    let filtered = contests;
    if (platformFilter !== 'All') {
      filtered = filtered.filter(
        (contest) => contest.platform === platformFilter
      );
    }
    if (statusFilter !== 'All') {
      filtered = filtered.filter(
        (contest) => getStatus(contest) === statusFilter
      );
    }
    setFilteredContests(filtered);
  };

  return (
    <div className="container">
      <h2 className="section-title">Contests</h2>
      <div className="filters">
        <select
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value)}
        >
          <option value="All">All Platforms</option>
          <option value="Codeforces">Codeforces</option>
          <option value="LeetCode">LeetCode</option>
          <option value="CodeChef">CodeChef</option>
          <option value="HackerRank">HackerRank</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Running">Running</option>
          <option value="Ended">Ended</option>
        </select>
      </div>
      <div className="contest-grid">
        {filteredContests.length > 0 ? (
          filteredContests.map((contest, index) => (
            <ContestCard key={contest.id || index} contest={contest} />
          ))
        ) : (
          <p>No contests found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
