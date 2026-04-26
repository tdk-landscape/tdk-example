import { useState, useEffect } from 'react'

function App() {
  const [users, setUsers] = useState<Array<{ id: number; email: string; name: string }>>([])
  const [loading, setLoading] = useState(true)
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking')

  useEffect(() => {
    // Check API health
    fetch('http://localhost:4000/health')
      .then(res => res.ok ? setApiStatus('online') : setApiStatus('offline'))
      .catch(() => setApiStatus('offline'))

    // Fetch users
    fetch('http://localhost:4000/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data.users || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch users:', err)
        setLoading(false)
      })
  }, [])

  const containerStyle: React.CSSProperties = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
  }

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '40px',
  }

  const cardStyle: React.CSSProperties = {
    background: '#16213e',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '20px',
  }

  const statusBadgeStyle = (status: typeof apiStatus): React.CSSProperties => ({
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    background: status === 'online' ? '#4ade80' : status === 'checking' ? '#fbbf24' : '#ef4444',
    color: status === 'online' ? '#064e3b' : status === 'checking' ? '#78350f' : '#7f1d1d',
  })

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
  }

  const thStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '12px',
    borderBottom: '2px solid #0f3460',
    color: '#e94560',
  }

  const tdStyle: React.CSSProperties = {
    padding: '12px',
    borderBottom: '1px solid #0f3460',
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>
          🔐 Identity App
        </h1>
        <p style={{ color: '#a0a0a0' }}>
          TDK Example - User Management Dashboard
        </p>
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <h2 style={{ margin: 0 }}>API Status</h2>
          <span style={statusBadgeStyle(apiStatus)}>
            {apiStatus}
          </span>
        </div>
        <p style={{ color: '#a0a0a0', margin: 0 }}>
          Identity API is running at <code style={{ background: '#0f3460', padding: '2px 6px', borderRadius: '4px' }}>http://localhost:4000</code>
        </p>
      </div>

      <div style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>Users</h2>
        {loading ? (
          <p style={{ color: '#a0a0a0' }}>Loading users...</p>
        ) : users.length > 0 ? (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td style={tdStyle}>{user.id}</td>
                  <td style={tdStyle}>{user.name}</td>
                  <td style={tdStyle}>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: '#a0a0a0' }}>No users found</p>
        )}
      </div>

      <div style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a
            href="http://localhost:4000/api/users"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 20px',
              background: '#e94560',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '14px',
            }}
          >
            📋 View API Users
          </a>
          <a
            href="http://localhost:4000/health"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 20px',
              background: '#0f3460',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '14px',
            }}
          >
            🏥 Health Check
          </a>
        </div>
      </div>

      <footer style={{ textAlign: 'center', marginTop: '40px', color: '#666', fontSize: '14px' }}>
        <p>Built with 💚 using TDK CLI + Tilt + Bun + Hono + React</p>
        <p>
          <a href="https://github.com/tdk-landscape/tdk-cli" style={{ color: '#e94560' }}>
            github.com/tdk-landscape/tdk-cli
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
