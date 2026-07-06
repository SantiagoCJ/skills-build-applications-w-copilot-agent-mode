import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../lib/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadTeams() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Unable to load teams');
        }

        if (isMounted) {
          setTeams(Array.isArray(data) ? data : data.results || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load teams');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTeams();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading teams…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-6" key={team._id || team.id}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="h6 fw-bold">{team.name}</h3>
                <p className="mb-0 text-muted">Members: {team.members?.length || 0}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Teams;
