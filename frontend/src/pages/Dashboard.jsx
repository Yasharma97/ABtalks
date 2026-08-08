import React, { useEffect, useState } from 'react';

export default function Dashboard({ profile, tasks, switchProfileState, onAdvanceDay, navigate }) {
  // Key state to force-restart ring drawing animation when student profile configuration shifts
  const [ringKey, setRingKey] = useState(0);
  const [showDevPanel, setShowDevPanel] = useState(false);
  const [showFullGrid, setShowFullGrid] = useState(false);
  const [showAllAchievements, setShowAllAchievements] = useState(false);

  useEffect(() => {
    setRingKey(prev => prev + 1);
  }, [profile.currentStreak]);

  // List of all achievements in the system to determine locked vs unlocked states
  const allAchievements = [
    { name: "First Commit", desc: "Unlocked on your first coding submission", icon: "🥈" },
    { name: "7-Day Warrior", desc: "Maintained a streak of 7 consecutive days", icon: "🏅" },
    { name: "14-Day Overlord", desc: "Pushed updates for 14 straight days", icon: "🏆" },
    { name: "LinkedIn Influencer", desc: "Shared 10 learning posts on LinkedIn", icon: "📢" },
    { name: "Late-Night Owl", desc: "Pushed a commit between 11 PM and 2 AM", icon: "🦉" }
  ];

  // Mock peer activities matching requested formats
  const peerActivities = [
    { name: "Sneha", college: "AKTU", action: "completed Day 12!" },
    { name: "Aman", college: "IMS", action: "completed today tasks!" },
    { name: "Rahul", college: "AKTU", action: "completed Day 12!" },
    { name: "Karan", college: "IMS", action: "completed today tasks!" },
    { name: "Priya", college: "LPU", action: "completed Day 12!" },
    { name: "Amit", college: "IMS", action: "completed today tasks!" }
  ];

  const [activityIndex, setActivityIndex] = useState(0);
  const [isActivityVisible, setIsActivityVisible] = useState(true);

  // Cycle through peer activity events
  useEffect(() => {
    const interval = setInterval(() => {
      setIsActivityVisible(false);
      setTimeout(() => {
        setActivityIndex((prev) => (prev + 1) % peerActivities.length);
        setIsActivityVisible(true);
      }, 500); // time to slide down before switching text
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Find today's task
  const todayTask = tasks.find(t => t.status === 'PENDING') || tasks.find(t => t.status === 'LOCKED') || tasks[tasks.length - 1];

  // Dynamic calculations for warning logs on missed days
  const missedTasks = tasks.filter(t => t.status === 'MISSED');
  const lastMissedDay = missedTasks.length > 0 ? Math.max(...missedTasks.map(t => t.dayId)) : 12;

  let prevStreak = 0;
  let checkDay = lastMissedDay - 1;
  while (checkDay > 0) {
    const t = tasks.find(x => x.dayId === checkDay);
    if (t && t.status === 'COMPLETED') {
      prevStreak++;
      checkDay--;
    } else {
      break;
    }
  }

  // Calculations for circular streak progress
  const maxStreak = 60;
  const streakPercent = Math.min(100, (profile.progress.currentStreak / maxStreak) * 100);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (streakPercent / 100) * circumference;

  const currentPeer = peerActivities[activityIndex];

  // Calculate adjacent 5-day window around currentDay
  const currentDay = profile.progress.currentDay;
  const windowDays = [];
  let start = Math.max(1, currentDay - 2);
  let end = Math.min(60, start + 4);
  if (end === 60) {
    start = Math.max(1, 60 - 4);
  }
  for (let d = start; d <= end; d++) {
    windowDays.push(d);
  }

  // Sort achievements: unlocked first, then locked, showing only 3 initially unless toggled
  const unlockedBadges = allAchievements.filter(b => profile.achievements && profile.achievements.includes(b.name));
  const lockedBadges = allAchievements.filter(b => !profile.achievements || !profile.achievements.includes(b.name));
  const sortedBadges = [...unlockedBadges, ...lockedBadges];
  const displayedAchievements = showAllAchievements ? sortedBadges : sortedBadges.slice(0, 3);

  return (
    <div className="anim-fade-in" style={{ padding: 'var(--space-4) 16px', paddingBottom: '120px' }}>
      
      {/* 🛠️ DEVELOPER/TESTING DEMO PREVIEW COLLAPSIBLE CABINET */}
      <div className="anim-card-entry delay-1" style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px dashed var(--border-space)',
        borderRadius: 'var(--radius-md)',
        padding: '10px 14px',
        marginBottom: 'var(--space-3)'
      }}>
        <button 
          onClick={() => setShowDevPanel(!showDevPanel)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-cyan)',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '9.5px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            padding: 0
          }}
        >
          <span>⚙️ Demo State Settings</span>
          <span>{showDevPanel ? "▲ Close" : "▼ Expand"}</span>
        </button>
        
        {showDevPanel && (
          <div style={{ marginTop: '10px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '8px' }}>
              <button 
                onClick={() => switchProfileState('real')} 
                className={`btn ${profile.activePreviewState === 'real' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '6px var(--space-1)', fontSize: '9px', fontWeight: 'bold' }}
              >
                Real User
              </button>
              <button 
                onClick={() => switchProfileState('newbie')} 
                className={`btn ${profile.activePreviewState === 'newbie' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '6px var(--space-1)', fontSize: '9px', fontWeight: 'bold' }}
              >
                New
              </button>
              <button 
                onClick={() => switchProfileState('steady')} 
                className={`btn ${profile.activePreviewState === 'steady' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '6px var(--space-1)', fontSize: '9px', fontWeight: 'bold' }}
              >
                Active
              </button>
              <button 
                onClick={() => switchProfileState('missed')} 
                className={`btn ${profile.activePreviewState === 'missed' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '6px var(--space-1)', fontSize: '9px', fontWeight: 'bold' }}
              >
                Missed
              </button>
            </div>

            {/* ☀️ ADVANCE DAY ACTION FOR REAL USER STREAK TESTING */}
            {profile.activePreviewState === 'real' && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px' }}>
                <button 
                  onClick={onAdvanceDay}
                  className="btn"
                  style={{ 
                    padding: '4px 10px', 
                    fontSize: '9.5px', 
                    background: 'rgba(5, 255, 196, 0.06)', 
                    border: '1px solid rgba(5, 255, 196, 0.3)', 
                    color: 'var(--color-emerald)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    minHeight: '24px'
                  }}
                >
                  Advance Day ☀️
                </button>
                <span style={{ fontSize: '9px', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                  (Skip active day to simulate streak logic)
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 1. Header (Dynamic details / Empty Profile handling) */}
      <div className="anim-card-entry delay-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
        <div>
          <h2 style={{ fontSize: '18px', margin: '0 0 2px 0', fontWeight: 'bold', color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
            {profile.identity.name || "Rohit Sharma"}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '9px', color: 'var(--color-cyan)', background: 'rgba(0, 242, 254, 0.08)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(0, 242, 254, 0.15)', fontWeight: 'semibold' }}>
              {profile.identity.track}
            </span>
            <span style={{ fontSize: '10px', color: 'var(--color-purple)', fontWeight: 'bold' }}>
              LVL {profile.progress.level} · {profile.progress.xp} XP
            </span>
          </div>
        </div>
      </div>

      {/* 2. Active Peers Live Co-working Space Ticker (Inline Widget) */}
      {currentPeer && (
        <div className="anim-card-entry delay-2" style={{
          background: 'rgba(255, 255, 255, 0.01)',
          border: '1px solid var(--border-space)',
          borderRadius: 'var(--radius-sm)',
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: 'var(--space-3)',
          fontSize: '10px'
        }}>
          <span style={{ 
            width: '6px', 
            height: '6px', 
            background: 'var(--color-emerald)', 
            borderRadius: '50%', 
            boxShadow: '0 0 6px var(--color-emerald)', 
            animation: 'pulseGlow 1.5s infinite linear',
            flexShrink: 0
          }}></span>
          <span style={{ color: 'var(--color-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            ● 248 students coding tonight — <span style={{ color: 'var(--color-cyan)' }}>{currentPeer.name} from {currentPeer.college} {currentPeer.action}</span>
          </span>
        </div>
      )}

      {/* 3. Primary Focus - Today's Challenge Task Card */}
      {todayTask && (
        <div className="card card-cosmic card-glowing-cyan anim-card-entry delay-3" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="badge badge-cyan" style={{ fontSize: '9px', padding: '2px 6px' }}>Day {todayTask.dayId} · Tonight's Target</span>
            <span className="badge badge-purple" style={{ fontSize: '8px', padding: '2px 6px' }}>{todayTask.difficulty}</span>
          </div>
          <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: '4px 0 2px 0', color: 'var(--color-text-primary)', lineHeight: '1.2' }}>
            {todayTask.title}
          </h3>
          <p className="text-muted" style={{ fontSize: '11px', margin: '0 0 var(--space-2) 0', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {todayTask.description}
          </p>
          <button 
            onClick={() => navigate(`/day/${todayTask.dayId}`)} 
            className="btn btn-primary"
            style={{ padding: '10px var(--space-4)', fontSize: '12px', width: '100%', minHeight: '44px', fontWeight: 'bold' }}
          >
            Start Today's Challenge ⚡
          </button>
        </div>
      )}

      {/* 4. Streak Panel */}
      <div className="glass-panel anim-card-entry delay-3" style={{ padding: '14px', marginBottom: 'var(--space-3)', marginLeft: 0, marginRight: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '24px', flexShrink: 0 }}>
            {profile.progress.profileState === 'newbie' ? '🌱' : profile.progress.profileState === 'missed' ? '❄️' : '🔥'}
          </div>
          <div>
            <h4 style={{ fontSize: '13px', margin: '0 0 2px 0', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
              {profile.progress.profileState === 'newbie' && "Start your streak"}
              {profile.progress.profileState === 'steady' && `${profile.progress.currentStreak}-day active streak`}
              {profile.progress.profileState === 'missed' && "Streak paused"}
            </h4>
            <p className="text-muted" style={{ fontSize: '10.5px', margin: 0, lineHeight: '1.3' }}>
              {profile.progress.profileState === 'newbie' && "Complete Day 1 tonight."}
              {profile.progress.profileState === 'steady' && "You're on a roll. Keep tonight's proof alive."}
              {profile.progress.profileState === 'missed' && `Day ${lastMissedDay} was missed. Complete today's task to restart.`}
            </p>
            {profile.progress.profileState === 'missed' && (
              <div style={{ fontSize: '9.5px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                ⏮️ Previous streak: <strong style={{ color: '#fff' }}>{prevStreak} days</strong>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. Progress Map Grid Timeline */}
      <div className="glass-panel anim-card-entry delay-4" style={{ padding: '14px', marginBottom: 'var(--space-3)', marginLeft: 0, marginRight: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h3 style={{ fontSize: '13px', margin: 0, fontWeight: 'bold', fontFamily: 'var(--font-display)' }}>Your Progress</h3>
          <span style={{ fontSize: '11px', color: 'var(--color-cyan)', fontWeight: '600' }}>
            {profile.progress.completedCount} / 60 days ({Math.round((profile.progress.completedCount / 60) * 100)}%)
          </span>
        </div>
        
        {/* Progress Bar */}
        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.04)', borderRadius: '3px', marginBottom: '12px', overflow: 'hidden' }}>
          <div style={{ width: `${(profile.progress.completedCount / 60) * 100}%`, height: '100%', background: 'linear-gradient(90deg, var(--color-cyan) 0%, var(--color-purple) 100%)', borderRadius: '3px', transition: 'width 0.4s ease' }}></div>
        </div>

        {/* Mini 5-Day Scanning Window */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '9.5px', color: 'var(--color-text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Near Targets (Day {start} - {end})</span>
            <button 
              onClick={() => setShowFullGrid(!showFullGrid)}
              style={{ background: 'none', border: 'none', color: 'var(--color-cyan)', padding: 0, cursor: 'pointer', fontSize: '9.5px', fontWeight: 'bold', textDecoration: 'underline' }}
            >
              {showFullGrid ? "Hide Grid" : "Show Full 60-Day Grid"}
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
            {windowDays.map(dayNum => {
              const t = tasks.find(x => x.dayId === dayNum);
              const isCompleted = t && t.status === 'COMPLETED';
              const isCurrent = t && t.status === 'PENDING';
              const isMissed = t && t.status === 'MISSED';
              
              let bgColor = 'rgba(255, 255, 255, 0.01)';
              let borderColor = 'var(--border-space)';
              let textColor = 'var(--color-text-secondary)';
              
              if (isCompleted) {
                bgColor = 'rgba(5, 255, 196, 0.05)';
                borderColor = 'var(--color-emerald)';
                textColor = 'var(--color-emerald)';
              } else if (isCurrent) {
                bgColor = 'rgba(0, 242, 254, 0.08)';
                borderColor = 'var(--color-cyan)';
                textColor = 'var(--color-cyan)';
              } else if (isMissed) {
                bgColor = 'rgba(255, 51, 102, 0.05)';
                borderColor = 'var(--color-rose)';
                textColor = 'var(--color-rose)';
              }

              return (
                <button 
                  key={dayNum}
                  onClick={() => navigate(`/day/${dayNum}`)}
                  style={{
                    flex: 1,
                    height: '32px',
                    borderRadius: '4px',
                    border: `1px solid ${borderColor}`,
                    background: bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: textColor,
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                >
                  {dayNum}
                  {isCompleted && <span style={{ fontSize: '7px', position: 'absolute', bottom: '1px', right: '2px' }}>✓</span>}
                  {isMissed && <span style={{ fontSize: '7px', position: 'absolute', bottom: '1px', right: '2px' }}>✕</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Full Collapsible 60-Day Grid */}
        {showFullGrid && (
          <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-space)', paddingTop: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px' }}>
              {tasks.map((task) => {
                const isCompleted = task.status === 'COMPLETED';
                const isCurrent = task.status === 'PENDING';
                const isMissed = task.status === 'MISSED';
                
                let bgColor = 'rgba(255, 255, 255, 0.01)';
                let borderColor = 'var(--border-space)';
                let textColor = 'var(--color-text-secondary)';
                
                if (isCompleted) {
                  bgColor = 'rgba(5, 255, 196, 0.05)';
                  borderColor = 'var(--color-emerald)';
                  textColor = 'var(--color-emerald)';
                } else if (isCurrent) {
                  bgColor = 'rgba(0, 242, 254, 0.08)';
                  borderColor = 'var(--color-cyan)';
                  textColor = 'var(--color-cyan)';
                } else if (isMissed) {
                  bgColor = 'rgba(255, 51, 102, 0.05)';
                  borderColor = 'var(--color-rose)';
                  textColor = 'var(--color-rose)';
                }

                return (
                  <button 
                    key={task.dayId}
                    onClick={() => navigate(`/day/${task.dayId}`)}
                    style={{
                      height: '32px',
                      background: bgColor,
                      border: `1px solid ${borderColor}`,
                      borderRadius: '4px',
                      color: textColor,
                      fontSize: '11px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {task.dayId}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 6. Achievement Section */}
      <div className="glass-panel anim-card-entry delay-5" style={{ padding: '14px', background: 'rgba(12, 13, 20, 0.3)', margin: 0 }}>
        <h3 style={{ fontSize: '13px', borderBottom: '1px solid var(--border-space)', paddingBottom: '6px', marginBottom: '12px', fontFamily: 'var(--font-display)', fontWeight: 'bold' }}>
          Achievements & Badges
        </h3>
        
        {(!profile.achievements || profile.achievements.length === 0) && (
          <div style={{ 
            fontSize: '11px', 
            color: 'var(--color-text-secondary)', 
            background: 'rgba(255,255,255,0.02)', 
            border: '1px dashed var(--border-space)', 
            borderRadius: 'var(--radius-sm)', 
            padding: '10px', 
            marginBottom: '10px', 
            textAlign: 'center',
            fontStyle: 'italic'
          }}>
            Complete your first challenge to unlock achievements.
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {displayedAchievements.map((badge, i) => {
            const isUnlocked = profile.achievements && profile.achievements.includes(badge.name);
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
                  fontSize: '20px',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isUnlocked ? 'rgba(255, 215, 0, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                  border: isUnlocked ? '1px solid var(--color-gold)' : '1px solid var(--border-space)',
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: isUnlocked ? '0 0 10px rgba(255, 215, 0, 0.15)' : 'none',
                  flexShrink: 0
                }}>
                  {isUnlocked ? badge.icon : "🔒"}
                </div>
                <div>
                  <h4 style={{ 
                    fontSize: '11.5px', 
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

        {allAchievements.length > 3 && (
          <button 
            onClick={() => setShowAllAchievements(!showAllAchievements)}
            className="btn btn-secondary"
            style={{ width: '100%', minHeight: '36px', fontSize: '11px', marginTop: '12px', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            {showAllAchievements ? "Hide Badges" : `Show All Badges (${allAchievements.length})`}
          </button>
        )}
      </div>

    </div>
  );
}

