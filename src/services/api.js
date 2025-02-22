export const fetchContests = async () => {
  try {
    // Fetch Codeforces contests
    const cfResponse = await fetch('https://codeforces.com/api/contest.list');
    const cfData = await cfResponse.json();
    
    const codeforcesContests = cfData.result
      .filter(c => c.phase === 'BEFORE')
      .map(c => ({
        name: c.name,
        platform: 'Codeforces',
        startTime: c.startTimeSeconds * 1000,
        endTime: (c.startTimeSeconds + c.durationSeconds) * 1000,
        duration: c.durationSeconds,
        url: `https://codeforces.com/contests/${c.id}`
      }));

    // Add other platforms' mock data (replace with real API calls if available)
    const mockContests = [
      {
        name: 'Weekly Contest 350',
        platform: 'LeetCode',
        startTime: Date.now() + 86400000,
        endTime: Date.now() + 86400000 + 7200000,
        duration: 7200,
        url: 'https://leetcode.com/contest'
      },
      {
        name: 'May Cook-Off 2023',
        platform: 'CodeChef',
        startTime: Date.now() + 172800000,
        endTime: Date.now() + 172800000 + 10800000,
        duration: 10800,
        url: 'https://codechef.com'
      }
    ];

    return [...codeforcesContests, ...mockContests].sort((a, b) => a.startTime - b.startTime);
  } catch (error) {
    console.error('Error fetching contests:', error);
    return [];
  }
};

export const fetchHackathons = async () => {
  try {
    // SAMPLE DATA: Replace with a real aggregator API when available.
    const hackathons = [
      {
        id: 1,
        name: 'NASA Space Apps Challenge 2025',
        startTime: '2025-10-03T00:00:00Z',
        endTime: '2025-10-05T23:59:00Z',
        url: 'https://www.spaceappschallenge.org/',
        online: true,
        country: 'Global',
        city: 'Online'
      },
      {
        id: 2,
        name: 'HackMIT 2025',
        startTime: '2025-09-26T12:00:00Z',
        endTime: '2025-09-27T20:00:00Z',
        url: 'https://hackmit.org/',
        online: false,
        country: 'USA',
        city: 'Cambridge'
      },
      {
        id: 3,
        name: 'PennApps 2025',
        startTime: '2025-09-12T18:00:00Z',
        endTime: '2025-09-13T18:00:00Z',
        url: 'https://pennapps.com/',
        online: false,
        country: 'USA',
        city: 'Philadelphia'
      },
      {
        id: 4,
        name: 'AngelHack Global Hackathon 2025',
        startTime: '2025-08-15T08:00:00Z',
        endTime: '2025-08-15T20:00:00Z',
        url: 'https://angelhack.com/',
        online: true,
        country: 'Global',
        city: 'Online'
      },
      {
        id: 5,
        name: 'MLH HackCon 2025',
        startTime: '2025-07-10T09:00:00Z',
        endTime: '2025-07-10T21:00:00Z',
        url: 'https://mlh.io/',
        online: false,
        country: 'UK',
        city: 'London'
      },
      {
        id: 6,
        name: 'Techfest Hackathon 2025',
        startTime: '2025-11-20T10:00:00Z',
        endTime: '2025-11-20T22:00:00Z',
        url: 'https://techfest.org/',
        online: false,
        country: 'India',
        city: 'Mumbai'
      },
      {
        id: 7,
        name: 'HackZurich 2025',
        startTime: '2025-09-01T08:00:00Z',
        endTime: '2025-09-01T20:00:00Z',
        url: 'https://www.hackzurich.com/',
        online: false,
        country: 'Switzerland',
        city: 'Zurich'
      },
      {
        id: 8,
        name: 'Tokyo Hackathon 2025',
        startTime: '2025-10-15T09:00:00Z',
        endTime: '2025-10-15T21:00:00Z',
        url: 'https://tokyohackathon.com/',
        online: false,
        country: 'Japan',
        city: 'Tokyo'
      }
    ];
    return hackathons;
  } catch (error) {
    console.error('Error fetching hackathons:', error);
    return [];
  }
};
