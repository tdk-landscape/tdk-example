import { useState, useEffect } from 'react'

function App() {
  const [appointments, setAppointments] = useState<Array<{ id: number; title: string; time: string }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:4001/api/appointments')
      .then(res => res.json())
      .then(data => {
        setAppointments(data.appointments || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📅 Appointment App</h1>
        <p style={{ color: '#a0a0a0' }}>TDK Example - Scheduling Dashboard</p>
      </div>

      <div style={{ background: '#16213e', borderRadius: '12px', padding: '24px' }}>
        <h2 style={{ marginTop: 0 }}>Today's Appointments</h2>
        {loading ? (
          <p style={{ color: '#a0a0a0' }}>Loading...</p>
        ) : appointments.length > 0 ? (
          appointments.map(appt => (
            <div key={appt.id} style={{ 
              padding: '16px', 
              marginBottom: '12px', 
              background: '#0f3460', 
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>{appt.title}</span>
              <span style={{ color: '#e94560', fontWeight: 'bold' }}>{appt.time}</span>
            </div>
          ))
        ) : (
          <p style={{ color: '#a0a0a0' }}>No appointments today</p>
        )}
      </div>

      <footer style={{ textAlign: 'center', marginTop: '40px', color: '#666' }}>
        <p>Built with 💚 using TDK CLI</p>
      </footer>
    </div>
  )
}

export default App
