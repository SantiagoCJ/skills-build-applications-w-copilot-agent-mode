import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../lib/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadWorkouts() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Unable to load workouts');
        }

        if (isMounted) {
          setWorkouts(Array.isArray(data) ? data : data.results || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load workouts');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading workouts…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-md-6" key={workout._id || workout.id}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="h6 fw-bold">{workout.name}</h3>
                <p className="mb-0 text-muted">Focus: {workout.focus || 'General fitness'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Workouts;
