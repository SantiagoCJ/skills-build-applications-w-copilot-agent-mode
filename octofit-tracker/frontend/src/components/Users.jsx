import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../lib/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Unable to load users');
        }

        if (isMounted) {
          setUsers(Array.isArray(data) ? data : data.results || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load users');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadUsers();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading users…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      <div className="row g-3">
        {users.map((user) => (
          <div className="col-md-6 col-xl-4" key={user._id || user.id || user.email}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="h6 fw-bold">{user.name}</h3>
                <p className="mb-1">{user.email}</p>
                <p className="mb-0 text-muted">Goal: {user.fitnessGoal || 'Not set'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Users;
