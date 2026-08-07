import React, { useState, useEffect } from 'react';

export default function Dashboard({ navigate }) {
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // List of all achievements in the system to determine locked vs unlocked states
  const allAchievements = [
    { name: "First Commit", desc: "Unlocked on your first coding submission", icon: "🥈" },
    { name: "7-Day Warrior", desc: "Maintained a streak of 7 consecutive days", icon: "🏅" },
    { name: "14-Day Overlord", desc: "Pushed updates for 14 straight days", icon: "🏆" },
    { name: "LinkedIn Influencer", desc: "Shared 10 learning posts on LinkedIn", icon: "📢" },
    { name: "Late-Night Owl", desc: "Pushed a commit between 11 PM and 2 AM", icon: "🦉" }
  ];

  // Fetch profile and tasks from Spring Boot Backend REST APIs
  const fetchData = async () => {
    try {
      setLoading(true);
      const profRes = await fetch('/api/profile');
      const profData = await profRes.json();
      setProfile(profData);

      const tasksRes = await fetch('/api/tasks');
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
      const res = await fetch(`/api/profile/select?state=${state}`, {
        method: 'POST'
      });
      const updatedProf = await res.json();
      setProfile(updatedProf);

      // Refetch tasks as they change depending on profile
      const tasksRes = await fetch('/api/tasks');
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
  const todayTask = tasks.find(t => t.status === 'PENDING') || tasks.find(t => t.status === 'LOCKED') || tasks[tasks.length - 1];

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
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px dashed var(--border-space)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-3)',
        marginBottom: 'var(--space-4)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ fontSize: '10px', color: 'var(--color-cyan)', fontWeight: 'bold', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Test Edge Cases (Profile States)
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button 
            onClick={() => switchProfileState('newbie')} 
            className={`btn ${profile.profileState === 'newbie' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: 'var(--space-1) var(--space-2)', fontSize: '10px', flex: 1 }}
          >
            👶 Newbie
          </button>
          <button 
            onClick={() => switchProfileState('steady')} 
            className={`btn ${profile.profileState === 'steady' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: 'var(--space-1) var(--space-2)', fontSize: '10px', flex: 1 }}
          >
            🔥 Steady
          </button>
          <button 
            onClick={() => switchProfileState('missed')} 
            className={`btn ${profile.profileState === 'missed' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: 'var(--space-1) var(--space-2)', fontSize: '10px', flex: 1 }}
          >
            ⚠️ Missed Day
          </button>
        </div>
      </div>

      {/* 1. Header (Dynamic details / Empty Profile handling) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
        <div>
          {profile.name ? (
            <>
              <h2 style={{ fontSize: 'var(--fs-md)', marginBottom: '2px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
                {profile.name}
              </h2>
              <p className="text-muted" style={{ fontSize: '11px', margin: 0 }}>
                {profile.college}
              </p>
            </>
          ) : (
            <>
              <h2 style={{ fontSize: 'var(--fs-md)', marginBottom: '2px', color: 'var(--color-text-secondary)', fontStyle: 'italic', fontWeight: '500' }}>
                Anonymous Explorer
              </h2>
              <p className="text-muted" style={{ fontSize: '11px', margin: 0 }}>
                Profile incomplete · Complete Day 1 to set details
              </p>
            </>
          )}
          <span className="badge badge-cyan" style={{ fontSize: '9px', marginTop: '6px' }}>
            {profile.track}
          </span>
        </div>
        
        {/* XP & Level Panel */}
        <div className="glass-panel" style={{ padding: 'var(--space-2) var(--space-3)', textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', background: 'rgba(255,255,255,0.01)' }}>
          <span style={{ fontSize: '10px', color: 'var(--color-purple)', fontWeight: 'bold' }}>LVL {profile.level}</span>
          <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 'bold' }}>
            {profile.xp} <span style={{ fontSize: '9px', color: 'var(--color-text-secondary)' }}>XP</span>
          </span>
        </div>
      </div>

      {/* 2. Active Peers Widget */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(0, 242, 254, 0.06) 0%, rgba(127, 0, 255, 0.06) 100%)',
        border: '1px solid rgba(0, 242, 254, 0.12)',
        borderRadius: 'var(--radius-sm)',
        padding: '6px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-2)',
        marginBottom: 'var(--space-4)'
      }}>
        <span style={{ 
          width: '8px', 
          height: '8px', 
          background: 'var(--color-emerald)', 
          borderRadius: '50%', 
          boxShadow: '0 0 8px var(--color-emerald)', 
          display: 'inline-block' 
        }}></span>
        <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--color-text-primary)' }}>
          248 Indian students are coding right now!
        </span>
      </div>

      {/* 3. Current Streak & Edge Case Banners */}
      <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-4)', overflow: 'hidden' }}>
        <div className="streak-ring" style={{ flexShrink: 0 }}>
          <svg width="110" height="110">
            <circle className="streak-ring-bg" cx="55" cy="55" r={radius} strokeWidth="6" />
            <circle 
              className="streak-ring-progress" 
              cx="55" cy="55" r={radius} 
              strokeWidth="6" 
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{
                stroke: profile.currentStreak > 0 ? 'url(#streak-gradient)' : 'var(--color-text-muted)',
                filter: profile.currentStreak > 0 ? 'drop-shadow(0 0 4px rgba(0,242,254,0.3))' : 'none'
              }}
            />
          </svg>
          <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ 
              fontSize: '24px', 
              fontWeight: '800', 
              lineHeight: '1', 
              color: profile.currentStreak > 0 ? 'var(--color-text-primary)' : 'var(--color-text-muted)' 
            }}>
              {profile.currentStreak}
            </span>
            <span style={{ fontSize: '8px', textTransform: 'uppercase', color: 'var(--color-text-secondary)', letterSpacing: '0.5px' }}>Streak</span>
          </div>
        </div>

        {/* Dynamic Warning/Motivational Banners based on Profile State */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {profile.profileState === 'newbie' && (
            <>
              <h4 style={{ fontSize: 'var(--fs-sm)', marginBottom: '2px', color: 'var(--color-cyan)' }}>Welcome, Explorer! 👋</h4>
              <p className="text-muted" style={{ fontSize: '11px', lineHeight: '1.3', margin: 0 }}>
                Your streak is currently at zero. Submit Day 1's task to launch your streak and unlock details!
              </p>
            </>
          )}

          {profile.profileState === 'steady' && (
            <>
              <h4 style={{ fontSize: 'var(--fs-sm)', marginBottom: '2px', color: 'var(--color-emerald)' }}>Keep the Fire Lit! 🔥</h4>
              <p className="text-muted" style={{ fontSize: '11px', lineHeight: '1.3', margin: 0 }}>
                18-day hot streak maintained. Keep pushing commits to stay visible to recruiters.
              </p>
            </>
          )}

          {profile.profileState === 'missed' && (
            <>
              <h4 style={{ fontSize: 'var(--fs-sm)', marginBottom: '2px', color: 'var(--color-rose)' }}>Streak Frozen ❄️</h4>
              <p className="text-muted" style={{ fontSize: '11px', lineHeight: '1.3', margin: 0 }}>
                You missed Day 12. Submit today's task (Day 13) to revive your streak momentum!
              </p>
            </>
          )}
          
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: '6px' }}>
            <span style={{ fontSize: '9px', color: 'var(--color-gold)', background: 'rgba(255, 215, 0, 0.08)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255, 215, 0, 0.15)' }}>
              🛡️ Streak Rescue: 1 Active
            </span>
          </div>
        </div>
      </div>

      {/* 4. Today's Challenge Card */}
      {todayTask && (
        <div className="card card-cosmic card-glowing-cyan" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
            <span className="badge badge-cyan" style={{ fontSize: '9px' }}>Day {todayTask.dayId} · Today's Target</span>
            <span className="badge badge-purple" style={{ fontSize: '8px' }}>{todayTask.difficulty}</span>
          </div>
          <h3 style={{ fontSize: 'var(--fs-sm)', fontWeight: 'bold', marginBottom: 'var(--space-1)', color: 'var(--color-text-primary)' }}>
            {todayTask.title}
          </h3>
          <p className="text-muted" style={{ fontSize: '11px', marginBottom: 'var(--space-4)', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.4' }}>
            {todayTask.description}
          </p>
          <button 
            onClick={() => navigate(`/day/${todayTask.dayId}`)} 
            className="btn btn-primary"
            style={{ padding: '8px var(--space-4)', fontSize: 'var(--fs-xs)' }}
          >
            Start Day {todayTask.dayId} Challenge ⚡
          </button>
        </div>
      )}

      {/* 5. Progress Map Grid */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
          <h3 style={{ fontSize: 'var(--fs-sm)', fontFamily: 'var(--font-display)', margin: 0 }}>Challenge Calendar</h3>
          <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
            {profile.completedCount}/60 Days Complete
          </span>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', justifyContent: 'space-around', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-space)', borderRadius: 'var(--radius-sm)', padding: '6px', marginBottom: 'var(--space-3)', fontSize: '9px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', background: 'rgba(5, 255, 196, 0.15)', border: '1px solid var(--color-emerald)', borderRadius: '2px' }}></span> Done
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', background: 'rgba(0, 242, 254, 0.08)', border: '1px solid var(--color-cyan)', borderRadius: '2px' }}></span> Active
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', background: 'rgba(255, 51, 102, 0.15)', border: '1px solid var(--color-rose)', borderRadius: '2px' }}></span> Missed
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
              bg = 'rgba(5, 255, 196, 0.1)';
              borderColor = 'var(--color-emerald)';
              color = 'var(--color-emerald)';
            } else if (task.status === 'PENDING') {
              bg = 'rgba(0, 242, 254, 0.06)';
              borderColor = 'var(--color-cyan)';
              color = 'var(--color-cyan)';
              glow = '0 0 8px rgba(0, 242, 254, 0.2)';
            } else if (task.status === 'MISSED') {
              bg = 'rgba(255, 51, 102, 0.1)';
              borderColor = 'var(--color-rose)';
              color = 'var(--color-rose)';
            } else {
              isClickable = false;
              color = 'var(--color-text-muted)';
            }

            return (
              <button
                key={task.dayId}
                disabled={!isClickable}
                onClick={() => navigate(`/day/${task.dayId}`)}
                style={{
                  height: '40px',
                  background: bg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: 'var(--radius-sm)',
                  color: color,
                  fontWeight: task.status === 'PENDING' ? 'bold' : 'normal',
                  fontSize: 'var(--fs-xs)',
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

      {/* 6. Achievement Section (Locked vs Unlocked achievements check) */}
      <div className="glass-panel" style={{ padding: 'var(--space-4)', background: 'rgba(12, 13, 20, 0.3)' }}>
        <h3 style={{ fontSize: 'var(--fs-sm)', borderBottom: '1px solid var(--border-space)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-3)', fontFamily: 'var(--font-display)' }}>
          Achievements & Badges
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {allAchievements.map((badge, i) => {
            const isUnlocked = profile.badges && profile.badges.includes(badge.name);
            return (
              <div 
                key={i} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 'var(--space-3)',
                  opacity: isUnlocked ? 1 : 0.4,
                  transition: 'opacity var(--transition-normal)'
                }}
              >
                <div style={{
                  fontSize: '24px',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isUnlocked ? 'rgba(255, 215, 0, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                  border: isUnlocked ? '1px solid var(--color-gold)' : '1px solid var(--border-space)',
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: isUnlocked ? '0 0 10px rgba(255, 215, 0, 0.15)' : 'none'
                }}>
                  {isUnlocked ? badge.icon : "🔒"}
                </div>
                <div>
                  <h4 style={{ 
                    fontSize: '12px', 
                    margin: 0, 
                    fontWeight: 'bold', 
                    color: isUnlocked ? 'var(--color-gold)' : 'var(--color-text-secondary)'
                  }}>
                    {badge.name} {!isUnlocked && <span style={{ fontSize: '9px', fontWeight: 'normal', color: 'var(--color-text-muted)' }}>(Locked)</span>}
                  </h4>
                  <p className="text-muted" style={{ fontSize: '10px', margin: 0, lineHeight: '1.2' }}>{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
