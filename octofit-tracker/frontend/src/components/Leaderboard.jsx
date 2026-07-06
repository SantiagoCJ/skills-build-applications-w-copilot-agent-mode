import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../lib/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadLeaderboard() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Unable to load leaderboard');
        }

        if (isMounted) {
          setEntries(Array.isArray(data) ? data : data.results || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load leaderboard');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading leaderboard…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      <div className="list-group">
        {entries.map((entry) => (
          <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id || entry.id}>
            <span>{entry.user?.name || 'Unknown user'}</span>
            <span className="badge bg-primary">{entry.score}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Leaderboard;
