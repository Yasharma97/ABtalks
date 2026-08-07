import React, { useState, useEffect } from 'react';

// --- REUSABLE UI COMPONENTS ---

const Card = ({ children, variant = 'cosmic', style = {}, ...props }) => {
  const className = variant === 'glowing-cyan' 
    ? 'card card-cosmic card-glowing-cyan' 
    : (variant === 'glowing-rose' ? 'card card-cosmic card-glowing-rose' : 'card card-cosmic');
  
  return (
    <div className={className} style={{ padding: 'var(--space-4)', ...style }} {...props}>
      {children}
    </div>
  );
};

const Badge = ({ children, type = 'cyan', style = {} }) => {
  const className = `badge badge-${type}`;
  return (
    <span className={className} style={style}>
      {children}
    </span>
  );
};

const InputField = ({ label, icon, ...props }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: '500' }}>
        <span>{icon}</span>
        {label}
      </label>
      <input className="glass-input" {...props} />
    </div>
  );
};

const ChecklistItem = ({ text, checked, onChange }) => {
  return (
    <label style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      fontSize: '11px',
      color: 'var(--color-text-secondary)',
      cursor: 'pointer',
      padding: '4px 0',
      userSelect: 'none'
    }}>
      <input 
        type="checkbox" 
        checked={checked}
        onChange={onChange}
        style={{
          width: '14px',
          height: '14px',
          accentColor: 'var(--color-cyan)',
          cursor: 'pointer'
        }}
      />
      <span style={{ textDecoration: checked ? 'line-through' : 'none', opacity: checked ? 0.6 : 1, transition: 'all var(--transition-fast)' }}>
        {text}
      </span>
    </label>
  );
};


// --- MAIN CHALLENGE DAY ROUTE COMPONENT ---

export default function ChallengeDay({ dayId, navigate }) {
  const [task, setTask] = useState(null);
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  // Checklist interactive state
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Configure workspace parameters", done: false },
    { id: 2, text: "Build responsiveness on 390px mobile viewport", done: false },
    { id: 3, text: "Validate API fetching and handle exception returns", done: false },
    { id: 4, text: "Review clean code principles before committing", done: false }
  ]);

  const fetchTaskDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/tasks/${dayId}`);
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

  const toggleChecklist = (id) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, done: !item.done } : item
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setSubmitting(true);

    try {
      const res = await fetch(`/api/tasks/${dayId}/submit`, {
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
        await fetchTaskDetails();
        
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
        <p className="text-muted" style={{ fontSize: 'var(--fs-xs)', marginBottom: 'var(--space-4)' }}>This challenge day is locked.</p>
        <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">Go to Dashboard</button>
      </div>
    );
  }

  const isCompleted = task.status === 'COMPLETED';
  const isMissed = task.status === 'MISSED';

  // Dynamic estimated durations
  const estimatedDuration = dayId <= 15 ? "90 mins" : (dayId <= 40 ? "2 hours" : "3 hours");

  // Dynamic resources list
  const resources = [
    { name: "Official Documentation Guides", link: "https://docs.github.com", icon: "📖" },
    { name: "Clean Code & Refactoring Best Practices", link: "https://javascript.info", icon: "💻" }
  ];

  return (
    <div className="anim-fade-in" style={{ padding: 'var(--space-4)', position: 'relative' }}>
      
      {/* Confetti Celebration Overlay */}
      {showConfetti && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(6, 6, 9, 0.96)',
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
          <p style={{ color: 'var(--color-emerald)', fontSize: 'var(--fs-base)', marginTop: 'var(--space-2)', fontWeight: '500' }}>{successMsg}</p>
          <p className="text-muted" style={{ fontSize: 'var(--fs-xs)', marginTop: 'var(--space-8)' }}>Redirecting back to dashboard...</p>
        </div>
      )}

      {/* Navigation Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
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
        <Badge type="cyan" style={{ marginLeft: 'auto' }}>{task.difficulty}</Badge>
      </div>

      {/* Task Details Card */}
      <Card style={{ marginBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
          <h3 style={{ fontSize: 'var(--fs-base)', margin: 0, fontWeight: 'bold' }}>{task.title}</h3>
          <Badge type="purple">{estimatedDuration}</Badge>
        </div>
        <p className="text-muted" style={{ fontSize: 'var(--fs-xs)', lineHeight: '1.4', marginBottom: 'var(--space-4)' }}>
          {task.description}
        </p>

        {/* Challenge Objective description */}
        <h4 style={{ fontSize: '11px', color: 'var(--color-cyan)', marginBottom: 'var(--space-1)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Challenge Objective
        </h4>
        <div style={{ 
          display: 'flex', 
          gap: 'var(--space-2)', 
          alignItems: 'flex-start', 
          fontSize: '11px', 
          background: 'rgba(255,255,255,0.01)', 
          border: '1px solid var(--border-space)', 
          borderRadius: 'var(--radius-sm)', 
          padding: 'var(--space-2)' 
        }}>
          <span style={{ color: 'var(--color-cyan)' }}>👉</span>
          <p className="text-muted" style={{ margin: 0 }}>{task.challenge}</p>
        </div>
      </Card>

      {/* Checklist section */}
      <Card style={{ marginBottom: 'var(--space-4)' }}>
        <h4 style={{ fontSize: '11px', color: 'var(--color-purple)', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Task Checklist
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {checklist.map(item => (
            <ChecklistItem 
              key={item.id}
              text={item.text}
              checked={item.done}
              onChange={() => toggleChecklist(item.id)}
            />
          ))}
        </div>
      </Card>

      {/* Resources Section */}
      <Card style={{ marginBottom: 'var(--space-4)' }}>
        <h4 style={{ fontSize: '11px', color: 'var(--color-emerald)', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Recommended Resources
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {resources.map((res, index) => (
            <a 
              key={index}
              href={res.link}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '11px',
                color: 'var(--color-cyan)',
                textDecoration: 'none',
                padding: '4px',
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid var(--border-space)',
                borderRadius: 'var(--radius-sm)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <span>{res.icon}</span>
              <span>{res.name}</span>
              <span style={{ marginLeft: 'auto', fontSize: '9px' }}>↗</span>
            </a>
          ))}
        </div>
      </Card>

      {/* Submission Status Alerts */}
      {isCompleted && (
        <Card variant="glowing-emerald" style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          <div style={{ fontSize: '24px' }}>✅</div>
          <div>
            <h4 style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-emerald)', marginBottom: '2px', fontWeight: 'bold' }}>Day Complete!</h4>
            <p className="text-muted" style={{ fontSize: '11px', margin: 0 }}>Your daily proof of work has been submitted and verified.</p>
          </div>
        </Card>
      )}

      {isMissed && (
        <Card variant="glowing-rose" style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          <div style={{ fontSize: '24px' }}>❄️</div>
          <div>
            <h4 style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-rose)', marginBottom: '2px', fontWeight: 'bold' }}>Deadline Missed!</h4>
            <p className="text-muted" style={{ fontSize: '11px', margin: 0 }}>You missed the midnight window. Submit code now to reactivate streak.</p>
          </div>
        </Card>
      )}

      {/* Submission Form */}
      <Card style={{ marginBottom: 'var(--space-6)' }}>
        <h4 style={{ fontSize: 'var(--fs-sm)', marginBottom: 'var(--space-3)', fontFamily: 'var(--font-display)', fontWeight: 'bold' }}>
          {isCompleted ? 'Your Submissions' : 'Submit Proof of Work'}
        </h4>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          
          {/* GitHub Input */}
          <InputField 
            label="GitHub Repository or Commit Link"
            icon="🐙"
            type="url" 
            placeholder="e.g. https://github.com/username/repo/commit/..."
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            disabled={isCompleted || submitting}
            required
          />

          {/* LinkedIn Input */}
          <InputField 
            label="LinkedIn Learning Post Link"
            icon="🔗"
            type="url" 
            placeholder="e.g. https://linkedin.com/posts/username-activity-..."
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            disabled={isCompleted || submitting}
            required
          />

          {/* Error Message */}
          {errorMsg && (
            <div style={{ 
              color: 'var(--color-rose)', 
              fontSize: '11px', 
              padding: '6px 10px', 
              background: 'rgba(255,51,102,0.05)', 
              borderRadius: 'var(--radius-sm)', 
              border: '1px solid rgba(255,51,102,0.1)' 
            }}>
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Submit Action */}
          {!isCompleted ? (
            <button 
              type="submit" 
              disabled={submitting}
              className="btn btn-emerald"
              style={{ marginTop: 'var(--space-2)', padding: 'var(--space-3)' }}
            >
              {submitting ? 'Verifying Coordinates...' : 'Submit Verification 🚀'}
            </button>
          ) : (
            <button 
              type="button" 
              onClick={() => navigate('/dashboard')}
              className="btn btn-secondary"
              style={{ marginTop: 'var(--space-2)', padding: 'var(--space-3)' }}
            >
              Back to Dashboard
            </button>
          )}

        </form>
      </Card>

    </div>
  );
}
