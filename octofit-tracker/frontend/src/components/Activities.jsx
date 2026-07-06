import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../lib/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadActivities() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Unable to load activities');
        }

        if (isMounted) {
          setActivities(Array.isArray(data) ? data : data.results || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load activities');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadActivities();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading activities…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      <div className="row g-3">
        {activities.map((activity) => (
          <div className="col-md-6" key={activity._id || activity.id}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="h6 fw-bold">{activity.type}</h3>
                <p className="mb-1">Duration: {activity.duration}</p>
                <p className="mb-0 text-muted">Calories: {activity.calories}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Activities;
