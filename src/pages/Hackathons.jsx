import React, { useState, useEffect } from 'react';
import HackathonCard from '../components/HackathonCard';
import { fetchHackathons } from '../services/api';

const Hackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [filteredHackathons, setFilteredHackathons] = useState([]);
  const [countryFilter, setCountryFilter] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');
  // Default "All" now means active hackathons (i.e. not ended)
  const [statusFilter, setStatusFilter] = useState('All');

  // Function to load hackathons
  const loadHackathons = () => {
    fetchHackathons().then((data) => {
      setHackathons(data);
      setFilteredHackathons(data);
    });
  };

  useEffect(() => {
    loadHackathons();
    // Auto-refresh hackathon data every 5 minutes (300,000 ms)
    const interval = setInterval(loadHackathons, 300000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    filterHackathons();
  }, [countryFilter, cityFilter, statusFilter, hackathons]);

  const getStatus = (hackathon) => {
    const now = Date.now();
    const start = new Date(hackathon.startTime).getTime();
    const end = new Date(hackathon.endTime).getTime();
    if (now < start) return 'Upcoming';
    else if (now >= start && now <= end) return 'Running';
    else return 'Ended';
  };

  const filterHackathons = () => {
    let filtered = hackathons;
    if (countryFilter !== 'All') {
      filtered = filtered.filter(h => h.country === countryFilter);
    }
    if (cityFilter !== 'All') {
      filtered = filtered.filter(h => h.city === cityFilter);
    }
    // When "All" is selected, only show active hackathons (Upcoming or Running)
    if (statusFilter === 'All') {
      filtered = filtered.filter(h => {
        const status = getStatus(h);
        return status === 'Upcoming' || status === 'Running';
      });
    } else if (statusFilter === 'Upcoming' || statusFilter === 'Running' || statusFilter === 'Ended') {
      filtered = filtered.filter(h => getStatus(h) === statusFilter);
    }
    setFilteredHackathons(filtered);
  };

  // Unique list of countries
  const countries = Array.from(new Set(hackathons.map(h => h.country).filter(Boolean)));
  // Unique list of cities for the selected country
  const cities = countryFilter === 'All'
    ? []
    : Array.from(new Set(
        hackathons.filter(h => h.country === countryFilter)
                  .map(h => h.city)
                  .filter(Boolean)
      ));

  return (
    <div className="container">
      <h2 className="section-title">Hackathons</h2>
      <div className="filters">
        <select
          value={countryFilter}
          onChange={(e) => {
            setCountryFilter(e.target.value);
            setCityFilter('All');
          }}
        >
          <option value="All">All Countries</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        {countryFilter !== 'All' && (
          <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
            <option value="All">All Cities</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        )}
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All (Active)</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Running">Running</option>
          <option value="Ended">Ended</option>
        </select>
      </div>
      <div className="contest-grid">
        {filteredHackathons.length > 0 ? (
          filteredHackathons.map((hackathon, index) => (
            <HackathonCard key={hackathon.id || index} hackathon={hackathon} />
          ))
        ) : (
          <p>No hackathons found.</p>
        )}
      </div>
    </div>
  );
};

export default Hackathons;
