import React, { useState, useEffect } from 'react';

export default function Dashboard({ navigate }) {
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch profile and tasks from Spring Boot Backend REST APIs
  const fetchData = async () => {
    try {
      setLoading(true);
      const profRes = await fetch('http://localhost:8080/api/profile');
      const profData = await profRes.json();
      setProfile(profData);

      const tasksRes = await fetch('http://localhost:8080/api/tasks');
      const tasksData = await tasksRes.json();
      setTasks(tasksData);
    } catch (err) {
      console.error("Error fetching mock data from Spring Boot API: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const switchProfileState = async (state) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8080/api/profile/select?state=${state}`, {
        method: 'POST'
      });
      const updatedProf = await res.json();
      setProfile(updatedProf);

      // Refetch tasks as they change depending on profile
      const tasksRes = await fetch('http://localhost:8080/api/tasks');
      const tasksData = await tasksRes.json();
      setTasks(tasksData);
    } catch (err) {
      console.error("Error switching profile state: ", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !profile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', gap: 'var(--space-4)' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(0, 242, 254, 0.2)', borderTopColor: 'var(--color-cyan)', borderRadius: '50%', animation: 'pulseGlow 1.5s infinite linear' }}></div>
        <p className="text-muted" style={{ fontSize: 'var(--fs-xs)' }}>Syncing with Cosmic Server...</p>
      </div>
    );
  }

  // Find today's task (first task that is PENDING, or default to first LOCKED, or if all completed, day 60)
  const todayTask = tasks.find(t => t.getStatus() === 'PENDING') || tasks.find(t => t.getStatus() === 'LOCKED') || tasks[tasks.length - 1];

  // Calculations for circular streak progress
  const maxStreak = 60;
  const streakPercent = Math.min(100, (profile.currentStreak / maxStreak) * 100);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (streakPercent / 100) * circumference;

  return (
    <div className="anim-fade-in" style={{ padding: 'var(--space-4)' }}>
      
      {/* 🛠️ PROFILE STATE SWITCHER (FOR TESTING EDGE CASES) */}
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px dashed var(--border-space)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-3)',
        marginBottom: 'var(--space-4)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '10px', color: 'var(--color-cyan)', fontWeight: 'bold', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Test Edge Cases (Profile States)
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button 
            onClick={() => switchProfileState('newbie')} 
            className={`btn ${profile.profileState === 'newbie' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: 'var(--space-1) var(--space-2)', fontSize: '11px', flex: 1 }}
          >
            👶 Newbie
          </button>
          <button 
            onClick={() => switchProfileState('steady')} 
            className={`btn ${profile.profileState === 'steady' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: 'var(--space-1) var(--space-2)', fontSize: '11px', flex: 1 }}
          >
            🔥 Steady
          </button>
          <button 
            onClick={() => switchProfileState('missed')} 
            className={`btn ${profile.profileState === 'missed' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: 'var(--space-1) var(--space-2)', fontSize: '11px', flex: 1 }}
          >
            ⚠️ Missed Day
          </button>
        </div>
      </div>

      {/* Profile Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
        <div>
          {profile.name ? (
            <>
              <h2 style={{ fontSize: 'var(--fs-md)', marginBottom: '2px', fontWeight: 'bold' }}>{profile.name}</h2>
              <p className="text-muted" style={{ fontSize: '11px' }}>{profile.college}</p>
            </>
          ) : (
            <>
              <h2 style={{ fontSize: 'var(--fs-md)', marginBottom: '2px', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>Anonymous Explorer</h2>
              <p className="text-muted" style={{ fontSize: '11px' }}>Profile incomplete. Complete a task to start!</p>
            </>
          )}
          <span className="badge badge-cyan" style={{ fontSize: '9px', marginTop: 'var(--space-2)' }}>{profile.track}</span>
        </div>
        
        {/* XP & Level Panel */}
        <div className="glass-panel" style={{ padding: 'var(--space-2) var(--space-3)', textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{ fontSize: '10px', color: 'var(--color-purple)', fontWeight: 'bold' }}>LVL {profile.level}</span>
          <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 'bold' }}>{profile.xp} <span style={{ fontSize: '9px', color: 'var(--color-text-secondary)' }}>XP</span></span>
        </div>
      </div>

      {/* Floating Peer Activity Bar (Thoughtful Idea) */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(0, 242, 254, 0.08) 0%, rgba(127, 0, 255, 0.08) 100%)',
        border: '1px solid rgba(0, 242, 254, 0.15)',
        borderRadius: 'var(--radius-sm)',
        padding: '6px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-2)',
        marginBottom: 'var(--space-4)'
      }}>
        <span style={{ width: '8px', height: '8px', background: 'var(--color-emerald)', borderRadius: '50%', boxShadow: '0 0 8px var(--color-emerald)', display: 'inline-block' }}></span>
        <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--color-text-primary)' }}>
          248 Indian students are coding right now!
        </span>
      </div>

      {/* Streak Dashboard Circular Tracker & Edge Case Banner */}
      <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-4)', overflow: 'hidden' }}>
        <div className="streak-ring" style={{ flexShrink: 0 }}>
          <svg width="120" height="120">
            <defs>
              <linearGradient id="streak-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-cyan)" />
                <stop offset="100%" stopColor="var(--color-purple)" />
              </linearGradient>
            </defs>
            <circle className="streak-ring-bg" cx="60" cy="60" r={radius} strokeWidth="8" />
            <circle 
              className="streak-ring-progress" 
              cx="60" cy="60" r={radius} 
              strokeWidth="8" 
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '26px', fontWeight: '800', lineHeight: '1', color: profile.currentStreak > 0 ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>
              {profile.currentStreak}
            </span>
            <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--color-text-secondary)', letterSpacing: '0.5px' }}>Streak</span>
          </div>
        </div>

        {/* Motivational Streak Banner */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {profile.profileState === 'newbie' && (
            <>
              <h4 style={{ fontSize: 'var(--fs-sm)', marginBottom: '2px', color: 'var(--color-cyan)' }}>Start Your Journey!</h4>
              <p className="text-muted" style={{ fontSize: '11px', lineHeight: '1.3' }}>Unlock your streak indicator by completing Day 1. Start posting your proof of work!</p>
            </>
          )}
          {profile.profileState === 'steady' && (
            <>
              <h4 style={{ fontSize: 'var(--fs-sm)', marginBottom: '2px', color: 'var(--color-emerald)' }}>You're on Fire! 🔥</h4>
              <p className="text-muted" style={{ fontSize: '11px', lineHeight: '1.3' }}>18-day hot streak maintained. Keep pushing commits to stay visible to recruiters.</p>
            </>
          )}
          {profile.profileState === 'missed' && (
            <>
              <h4 style={{ fontSize: 'var(--fs-sm)', marginBottom: '2px', color: 'var(--color-rose)' }}>Streak Lost! ❄️</h4>
              <p className="text-muted" style={{ fontSize: '11px', lineHeight: '1.3' }}>You missed Day 12. Submit today's task (Day 13) to revive your streak momentum!</p>
            </>
          )}
          
          {/* Streak Rescue Badge status */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
            <span style={{ fontSize: '10px', color: 'var(--color-gold)', background: 'rgba(255, 215, 0, 0.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
              🛡️ Rescue Card: 1 Active
            </span>
          </div>
        </div>
      </div>

      {/* Today's Task Card */}
      {todayTask && (
        <div className="card card-cosmic card-glowing-cyan" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
            <span className="badge badge-cyan">Day {todayTask.dayId} · Today's Target</span>
            <span className="badge badge-purple" style={{ fontSize: '9px' }}>{todayTask.difficulty}</span>
          </div>
          <h3 style={{ fontSize: 'var(--fs-sm)', fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>{todayTask.title}</h3>
          <p className="text-muted" style={{ fontSize: 'var(--fs-xs)', marginBottom: 'var(--space-4)', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {todayTask.description}
          </p>
          <button 
            onClick={() => navigate(`/day/${todayTask.dayId}`)} 
            className="btn btn-primary"
            style={{ padding: 'var(--space-2) var(--space-4)' }}
          >
            Start Day {todayTask.dayId} Challenge ⚡
          </button>
        </div>
      )}

      {/* Interactive 60-Day Progress Grid */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
          <h3 style={{ fontSize: 'var(--fs-md)', fontFamily: 'var(--font-display)' }}>Challenge Calendar</h3>
          <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
            {profile.completedCount}/60 Days Done
          </span>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', justifyContent: 'space-around', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-space)', borderRadius: 'var(--radius-sm)', padding: '6px', marginBottom: 'var(--space-3)', fontSize: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', background: 'rgba(5, 255, 196, 0.2)', border: '1px solid var(--color-emerald)', borderRadius: '2px' }}></span> Done
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', background: 'rgba(0, 242, 254, 0.1)', border: '1px solid var(--color-cyan)', borderRadius: '2px', boxShadow: 'var(--glow-cyan)' }}></span> Active
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', background: 'rgba(255, 51, 102, 0.2)', border: '1px solid var(--color-rose)', borderRadius: '2px' }}></span> Missed
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-space)', borderRadius: '2px' }}></span> Locked
          </div>
        </div>

        {/* Calendar Map */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px' }}>
          {tasks.map((task) => {
            let bg = 'rgba(255, 255, 255, 0.02)';
            let borderColor = 'var(--border-space)';
            let color = 'var(--color-text-secondary)';
            let isClickable = true;
            let glow = 'none';

            if (task.status === 'COMPLETED') {
              bg = 'rgba(5, 255, 196, 0.15)';
              borderColor = 'var(--color-emerald)';
              color = 'var(--color-emerald)';
            } else if (task.status === 'PENDING') {
              bg = 'rgba(0, 242, 254, 0.08)';
              borderColor = 'var(--color-cyan)';
              color = 'var(--color-cyan)';
              glow = '0 0 10px rgba(0, 242, 254, 0.3)';
            } else if (task.status === 'MISSED') {
              bg = 'rgba(255, 51, 102, 0.15)';
              borderColor = 'var(--color-rose)';
              color = 'var(--color-rose)';
            } else {
              // LOCKED
              isClickable = false;
              color = 'var(--color-text-muted)';
            }

            return (
              <button
                key={task.dayId}
                disabled={!isClickable}
                onClick={() => navigate(`/day/${task.dayId}`)}
                style={{
                  height: '42px',
                  background: bg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: 'var(--radius-sm)',
                  color: color,
                  fontWeight: task.status === 'PENDING' ? 'bold' : 'normal',
                  fontSize: 'var(--fs-sm)',
                  cursor: isClickable ? 'pointer' : 'not-allowed',
                  boxShadow: glow,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {task.dayId}
              </button>
            );
          })}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="glass-panel" style={{ padding: 'var(--space-4)' }}>
        <h3 style={{ fontSize: 'var(--fs-md)', borderBottom: '1px solid var(--border-space)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
          Achievements & Badges
        </h3>
        
        {profile.badges.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {profile.badges.map((badge, i) => (
              <span key={i} className="badge badge-gold" style={{ padding: '4px 10px', fontSize: '10px' }}>
                🏅 {badge}
              </span>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 'var(--space-2) 0' }}>
            <span style={{ fontSize: '32px', filter: 'grayscale(1)' }}>🏆</span>
            <p className="text-muted" style={{ fontSize: 'var(--fs-xs)', marginTop: '4px' }}>No achievements unlocked yet. Submit your Day 1 work to claim your first badge!</p>
          </div>
        )}
      </div>

    </div>
  );
}
