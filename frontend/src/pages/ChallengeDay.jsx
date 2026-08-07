import React, { useState, useEffect } from 'react';

export default function ChallengeDay({ dayId, navigate }) {
  const [task, setTask] = useState(null);
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const fetchTaskDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8080/api/tasks/${dayId}`);
      const data = await res.json();
      setTask(data);
      
      if (data) {
        setGithubUrl(data.githubUrl || '');
        setLinkedinUrl(data.linkedinUrl || '');
      }
    } catch (err) {
      console.error("Error fetching task details: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, [dayId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setSubmitting(true);

    try {
      const res = await fetch(`http://localhost:8080/api/tasks/${dayId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ githubUrl, linkedinUrl })
      });
      const data = await res.json();

      if (data.success) {
        setSuccessMsg(data.message);
        setShowConfetti(true);
        // Refetch details to update state to COMPLETED
        await fetchTaskDetails();
        // Hide success message/confetti after a delay and auto navigate
        setTimeout(() => {
          setShowConfetti(false);
          navigate('/dashboard');
        }, 3000);
      } else {
        setErrorMsg(data.message);
      }
    } catch (err) {
      setErrorMsg("Failed to submit. Check if Spring Boot server is running on port 8080.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', gap: 'var(--space-4)' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(0, 242, 254, 0.2)', borderTopColor: 'var(--color-cyan)', borderRadius: '50%', animation: 'pulseGlow 1.5s infinite linear' }}></div>
        <p className="text-muted" style={{ fontSize: 'var(--fs-xs)' }}>Loading Task Coordinates...</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
        <h3 style={{ color: 'var(--color-rose)' }}>Day Coordinates Not Found</h3>
        <p className="text-muted" style={{ fontSize: 'var(--fs-xs)', marginBottom: 'var(--space-4)' }}>This challenge day is currently locked or doesn't exist yet.</p>
        <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">Go to Dashboard</button>
      </div>
    );
  }

  const isCompleted = task.status === 'COMPLETED';
  const isMissed = task.status === 'MISSED';

  return (
    <div className="anim-fade-in" style={{ padding: 'var(--space-4)', position: 'relative' }}>
      
      {/* Confetti Celebration Overlay */}
      {showConfetti && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(6, 6, 9, 0.95)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          textAlign: 'center',
          padding: 'var(--space-6)',
          animation: 'fadeIn 0.3s forwards'
        }}>
          <span style={{ fontSize: '64px', animation: 'float 2s infinite' }}>🎉</span>
          <h2 className="text-gradient-cyan-purple" style={{ fontSize: 'var(--fs-xl)', fontWeight: 'bold', marginTop: 'var(--space-4)' }}>Day Completed!</h2>
          <p style={{ color: 'var(--color-emerald)', fontSize: 'var(--fs-base)', marginTop: 'var(--space-2)' }}>{successMsg}</p>
          <p className="text-muted" style={{ fontSize: 'var(--fs-xs)', marginTop: 'var(--space-8)' }}>Redirecting back to dashboard...</p>
        </div>
      )}

      {/* Header and Back navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
        <button 
          onClick={() => navigate('/dashboard')} 
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            fontSize: '18px',
            padding: '4px'
          }}
        >
          ←
        </button>
        <h2 style={{ fontSize: 'var(--fs-md)', margin: 0, fontWeight: 'bold' }}>Challenge Day {task.dayId}</h2>
        <span className="badge badge-cyan" style={{ marginLeft: 'auto' }}>{task.difficulty}</span>
      </div>

      {/* Task Guidelines card */}
      <div className="glass-panel" style={{ marginBottom: 'var(--space-4)' }}>
        <h3 style={{ fontSize: 'var(--fs-base)', marginBottom: 'var(--space-2)' }}>{task.title}</h3>
        <p className="text-muted" style={{ fontSize: 'var(--fs-xs)', lineHeight: '1.4', marginBottom: 'var(--space-4)' }}>
          {task.description}
        </p>

        <h4 style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-cyan)', marginBottom: 'var(--space-1)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Acceptance Criteria
        </h4>
        <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-start', fontSize: '11px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-space)', borderRadius: 'var(--radius-sm)', padding: 'var(--space-2)' }}>
          <span style={{ color: 'var(--color-cyan)' }}>👉</span>
          <p className="text-muted">{task.challenge}</p>
        </div>
      </div>

      {/* Submission Status Alerts */}
      {isCompleted && (
        <div className="card-cosmic card-glowing-emerald" style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
          <div style={{ fontSize: '24px' }}>✅</div>
          <div>
            <h4 style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-emerald)', marginBottom: '2px' }}>Day Complete!</h4>
            <p className="text-muted" style={{ fontSize: '11px' }}>Your daily proof of work has been submitted and verified.</p>
          </div>
        </div>
      )}

      {isMissed && (
        <div className="card-cosmic card-glowing-rose" style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
          <div style={{ fontSize: '24px' }}>❄️</div>
          <div>
            <h4 style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-rose)', marginBottom: '2px' }}>Missed Deadline!</h4>
            <p className="text-muted" style={{ fontSize: '11px' }}>You missed the midnight window. However, you can submit code now to reactivate your streak and recover!</p>
          </div>
        </div>
      )}

      {/* Submission Form */}
      <div className="glass-panel" style={{ position: 'relative' }}>
        <h3 style={{ fontSize: 'var(--fs-sm)', marginBottom: 'var(--space-3)' }}>
          {isCompleted ? 'Your Submissions' : 'Submit Proof of Work'}
        </h3>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          
          {/* GitHub Input */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-1)', fontWeight: '500' }}>
              GitHub Repository or Commit Link
            </label>
            <input 
              type="url" 
              placeholder="e.g. https://github.com/username/project/commit/..."
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              disabled={isCompleted || submitting}
              className="glass-input"
              required
            />
          </div>

          {/* LinkedIn Input */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-1)', fontWeight: '500' }}>
              LinkedIn Learning Post Link
            </label>
            <input 
              type="url" 
              placeholder="e.g. https://linkedin.com/posts/username-activity-..."
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              disabled={isCompleted || submitting}
              className="glass-input"
              required
            />
          </div>

          {/* Messages */}
          {errorMsg && (
            <div style={{ color: 'var(--color-rose)', fontSize: '11px', padding: '6px', background: 'rgba(255,51,102,0.05)', borderRadius: '4px', border: '1px solid rgba(255,51,102,0.1)' }}>
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Submit Button */}
          {!isCompleted ? (
            <button 
              type="submit" 
              disabled={submitting}
              className="btn btn-emerald"
              style={{ marginTop: 'var(--space-2)' }}
            >
              {submitting ? 'Verifying Commits...' : 'Submit Verification 🚀'}
            </button>
          ) : (
            <button 
              type="button" 
              onClick={() => navigate('/dashboard')}
              className="btn btn-secondary"
              style={{ marginTop: 'var(--space-2)' }}
            >
              Back to Dashboard
            </button>
          )}

        </form>
      </div>

    </div>
  );
}
