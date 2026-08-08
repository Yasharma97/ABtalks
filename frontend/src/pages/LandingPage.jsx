import React, { useState, useEffect, useRef } from 'react';
import { generateTasksForState, baseTasks } from '../mockData';

export default function LandingPage({ navigate, isRegistered, setIsRegistered, setProfile, setTasks }) {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [regName, setRegName] = useState('');
  const [regCollege, setRegCollege] = useState('');
  const [regTrack, setRegTrack] = useState('Frontend Web Track');
  const [validationError, setValidationError] = useState('');
  
  const journeyRef = useRef(null);

  const milestoneData = [
    { day: "DAY 01", label: "Start", desc: "Initiate your streak. Build your repository coordinates." },
    { day: "DAY 15", label: "Consistency", desc: "Build coding discipline. Establish nightly habits." },
    { day: "DAY 30", label: "Momentum", desc: "Halfway mark. Solve advanced algorithm coordinates." },
    { day: "DAY 45", label: "Visibility", desc: "Public sharing triggers recruiter interest on LinkedIn." },
    { day: "DAY 60", label: "Recruiter Ready", desc: "Unlock a complete verifiable sandbox profile for jobs." }
  ];

  // Listen to navigation gate events from bottom bar triggers
  useEffect(() => {
    const handleRegisterTrigger = () => {
      setShowRegisterModal(true);
    };
    window.addEventListener('trigger-registration', handleRegisterTrigger);
    return () => window.removeEventListener('trigger-registration', handleRegisterTrigger);
  }, []);

  const handleStartAction = () => {
    if (isRegistered) {
      navigate('/dashboard');
    } else {
      // Scroll to hero/inline registration directly
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Visual focus to name input
      const nameInput = document.getElementById('reg-name-field');
      if (nameInput) nameInput.focus();
    }
  };

  const scrollToJourney = () => {
    if (journeyRef.current) {
      journeyRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!regName.trim()) {
      setValidationError("Please enter your name coordinates.");
      return;
    }
    if (!regCollege.trim()) {
      setValidationError("Please enter your university coordinates.");
      return;
    }

    // Set custom registered profile
    setProfile({
      name: regName.trim(),
      college: regCollege.trim(),
      track: regTrack,
      currentStreak: 0,
      longestStreak: 0,
      completedCount: 0,
      missedCount: 0,
      level: 1,
      xp: 0,
      badges: [],
      profileState: "newbie" // Starts fresh
    });

    // Populate calendar tasks list for newbie state
    setTasks(generateTasksForState('newbie', baseTasks));
    setIsRegistered(true);
    setShowRegisterModal(false);
    navigate('/dashboard');
  };

  const tracks = [
    {
      id: "frontend",
      name: "Frontend Web Track",
      desc: "React, Vite, CSS Grid, animations & SEO",
      level: "Beginner to Pro",
      accent: "var(--color-cyan)"
    },
    {
      id: "backend",
      name: "Backend Java Track",
      desc: "Core Java, OOPs, Spring Boot, JPA & SQL",
      level: "Intermediate",
      accent: "var(--color-purple)"
    },
    {
      id: "devops",
      name: "DevOps & Cloud Track",
      desc: "Docker, Kubernetes, GitHub Actions & AWS Cloud",
      level: "Advanced",
      accent: "var(--color-emerald)"
    }
  ];

  return (
    <div style={{ padding: 'var(--space-4) 18px', paddingBottom: '120px', position: 'relative' }}>
      
      {/* Decorative cosmic nebula light source */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '20%',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(0, 242, 254, 0.15) 0%, rgba(127, 0, 255, 0.05) 70%, transparent 100%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
        zIndex: 0
      }}></div>

      {/* 00 — BRAND BAR */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'var(--space-6)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '4px',
            background: 'linear-gradient(135deg, var(--color-cyan), var(--color-purple))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            fontWeight: 'bold',
            color: '#fff'
          }}>
            AB
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: '800', fontSize: '13px', letterSpacing: '1px', margin: 0 }}>
              AB<span className="text-gradient-cyan-purple">TALKS</span>
            </h1>
          </div>
        </div>
        <button 
          onClick={handleStartAction} 
          className="btn btn-secondary" 
          style={{ width: 'auto', padding: '6px 12px', fontSize: '10px', minHeight: '32px', borderRadius: '4px' }}
        >
          {isRegistered ? 'Dashboard →' : 'Start Day 1'}
        </button>
      </header>

      {/* 01 — HERO */}
      <section style={{ textAlign: 'center', marginBottom: 'var(--space-8)', position: 'relative' }}>
        
        <h2 className="anim-card-entry delay-1" style={{
          fontFamily: 'var(--font-display)',
          fontSize: '26px',
          lineHeight: '1.25',
          fontWeight: '900',
          letterSpacing: '-0.02em',
          marginBottom: 'var(--space-3)',
          textAlign: 'center'
        }}>
          60 NIGHTS.<br />
          60 PROOFS.<br />
          <span className="text-gradient-cyan-purple">ONE VISIBLE TRANSFORMATION.</span>
        </h2>
        
        <p className="text-muted anim-card-entry delay-2" style={{
          fontSize: '12px',
          maxWidth: '320px',
          margin: '0 auto var(--space-4)',
          lineHeight: '1.5'
        }}>
          Build something every day. Prove it with GitHub + LinkedIn. Turn consistency into recruiter-visible proof.
        </p>

        {/* 60-Node Minimal Journey Path */}
        <div className="anim-card-entry delay-2" style={{ margin: 'var(--space-4) 0' }}>
          <div className="journey-node-grid">
            {Array.from({ length: 60 }).map((_, i) => {
              const day = i + 1;
              const isMilestone = [1, 15, 30, 45, 60].includes(day);
              return (
                <div 
                  key={day}
                  className={`journey-node ${isMilestone ? 'milestone' : ''}`}
                  title={`Day ${day}`}
                />
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '270px', margin: '0 auto', fontSize: '8px', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-display)', fontWeight: 'bold', opacity: 0.8 }}>
            <span>Day 01</span>
            <span>Day 15</span>
            <span>Day 30</span>
            <span>Day 45</span>
            <span>Day 60</span>
          </div>
        </div>

        {/* Registration Inline Card (Above the fold/First appearance) */}
        <div className="anim-card-entry delay-3" style={{ width: '100%', maxWidth: '330px', margin: '0 auto' }}>
          {!isRegistered ? (
            <div 
              style={{
                padding: 'var(--space-4)',
                textAlign: 'left',
                background: 'rgba(12, 13, 20, 0.4)',
                border: '1px solid var(--border-space)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <h3 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: 'var(--space-1)', textAlign: 'center', color: '#fff' }}>
                Join the challenge
              </h3>
              <p className="text-muted" style={{ fontSize: '9.5px', textAlign: 'center', marginBottom: 'var(--space-3)' }}>
                Initialize your local profile to start tracking verification streaks.
              </p>

              <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input 
                  id="reg-name-field"
                  type="text" 
                  className="glass-input" 
                  placeholder="Your Name"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  style={{ padding: '8px 10px', fontSize: '11px', minHeight: '36px' }}
                  required
                />

                <input 
                  type="text" 
                  className="glass-input" 
                  placeholder="Your College / University"
                  value={regCollege}
                  onChange={(e) => setRegCollege(e.target.value)}
                  style={{ padding: '8px 10px', fontSize: '11px', minHeight: '36px' }}
                  required
                />

                <select 
                  className="glass-input"
                  value={regTrack}
                  onChange={(e) => setRegTrack(e.target.value)}
                  style={{ padding: '8px 10px', fontSize: '11px', minHeight: '36px', background: 'var(--bg-space-light)' }}
                >
                  <option value="Frontend Web Track">Frontend Web Track</option>
                  <option value="Backend Java Track">Backend Java Track</option>
                  <option value="DevOps & Cloud Track">DevOps & Cloud Track</option>
                </select>

                {validationError && (
                  <div style={{ fontSize: '9px', color: 'var(--color-rose)', background: 'rgba(255,51,102,0.04)', padding: '4px', borderRadius: '4px' }}>
                    ⚠️ {validationError}
                  </div>
                )}

                <button type="submit" className="btn btn-primary" style={{ marginTop: '4px', padding: '10px', minHeight: '44px', fontSize: '12px' }}>
                  Start Day 1 →
                </button>
              </form>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button 
                onClick={() => navigate('/dashboard')} 
                className="btn btn-primary anim-pulse-glow"
                style={{ minHeight: '44px', fontSize: '12px' }}
              >
                Enter Dashboard ⚡
              </button>
            </div>
          )}
          
          <button 
            onClick={scrollToJourney}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-cyan)',
              fontSize: '10px',
              marginTop: '12px',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Explore the Journey
          </button>
        </div>
      </section>

      {/* 02 — THE 60-NIGHT JOURNEY (HORIZONTAL LIST TIMELINE) */}
      <section ref={journeyRef} style={{ marginBottom: 'var(--space-8)', borderTop: '1px solid var(--border-space)', paddingTop: 'var(--space-6)' }}>
        <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--color-cyan)', fontWeight: 'bold', letterSpacing: '1px' }}>
          02 · Milestones
        </span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', marginTop: '4px', marginBottom: 'var(--space-4)' }}>
          The 60-Night Journey
        </h3>

        {/* Horizontal scroll container mapping all points at once with connecting line decorators */}
        <div className="horizontal-journey-track" style={{ marginTop: 'var(--space-4)' }}>
          {milestoneData.map((m, idx) => (
            <div key={idx} className="horizontal-journey-item">
              
              {/* Connecting line to the next circle node */}
              {idx < milestoneData.length - 1 && (
                <div style={{
                  position: 'absolute',
                  left: '26px',
                  top: '13px',
                  width: '100%',
                  height: '1px',
                  background: 'linear-gradient(90deg, var(--color-cyan) 0%, var(--color-purple) 100%)',
                  opacity: 0.35,
                  zIndex: 1
                }}></div>
              )}

              {/* Milestone Indicator Node */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', zIndex: 2, marginBottom: '10px' }}>
                <div style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'rgba(0, 242, 254, 0.08)',
                  border: '1px solid var(--color-cyan)',
                  color: 'var(--color-cyan)',
                  fontSize: '9px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--glow-cyan)'
                }}>
                  {m.day.split(' ')[1]}
                </div>
                <span className="badge badge-purple" style={{ fontSize: '8px', padding: '1px 5px' }}>
                  {m.label}
                </span>
              </div>

              {/* Milestone details description card */}
              <div style={{ paddingRight: '12px' }}>
                <h4 style={{ fontSize: '11px', fontWeight: 'bold', color: '#fff', margin: '0 0 3px' }}>
                  {m.day}
                </h4>
                <p className="text-muted" style={{ fontSize: '10px', margin: 0, lineHeight: '1.4' }}>
                  {m.desc}
                </p>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 03 — BUILD → PROVE → SHOW */}
      <section style={{ marginBottom: 'var(--space-8)', borderTop: '1px solid var(--border-space)', paddingTop: 'var(--space-6)' }}>
        <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--color-purple)', fontWeight: 'bold', letterSpacing: '1px' }}>
          03 · Loop
        </span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', marginTop: '4px', marginBottom: 'var(--space-4)' }}>
          Build · Prove · Show
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'baseline' }}>
            <span style={{ fontSize: '18px', fontFamily: 'var(--font-display)', fontWeight: '900', color: 'var(--color-cyan)', width: '20px' }}>01</span>
            <div>
              <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: '#fff' }}>BUILD</h4>
              <p className="text-muted" style={{ margin: 0, fontSize: '11px', marginTop: '2px' }}>Complete today's task.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'baseline' }}>
            <span style={{ fontSize: '18px', fontFamily: 'var(--font-display)', fontWeight: '900', color: 'var(--color-purple)', width: '20px' }}>02</span>
            <div>
              <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: '#fff' }}>PROVE</h4>
              <p className="text-muted" style={{ margin: 0, fontSize: '11px', marginTop: '2px' }}>Submit your GitHub commit.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'baseline' }}>
            <span style={{ fontSize: '18px', fontFamily: 'var(--font-display)', fontWeight: '900', color: 'var(--color-emerald)', width: '20px' }}>03</span>
            <div>
              <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: '#fff' }}>SHOW</h4>
              <p className="text-muted" style={{ margin: 0, fontSize: '11px', marginTop: '2px' }}>Share your progress on LinkedIn.</p>
            </div>
          </div>
        </div>

        <div style={{ 
          marginTop: 'var(--space-5)', 
          padding: '10px', 
          borderLeft: '2px solid var(--color-cyan)',
          background: 'rgba(255,255,255,0.01)',
          fontSize: '11px',
          fontStyle: 'italic',
          color: 'var(--color-text-secondary)'
        }}>
          "60 nights later → a visible body of work."
        </div>
      </section>

      {/* 04 — CHOOSE YOUR TRACK */}
      <section style={{ marginBottom: 'var(--space-8)', borderTop: '1px solid var(--border-space)', paddingTop: 'var(--space-6)' }}>
        <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--color-emerald)', fontWeight: 'bold', letterSpacing: '1px' }}>
          04 · Tracks
        </span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', marginTop: '4px', marginBottom: 'var(--space-4)' }}>
          Choose Your Track
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {tracks.map((track) => (
            <div 
              key={track.id} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '12px 14px', 
                background: 'rgba(255, 255, 255, 0.01)', 
                border: '1px solid var(--border-space)', 
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <div>
                <h4 style={{ fontSize: '12px', margin: 0, fontWeight: 'bold', color: '#fff' }}>{track.name}</h4>
                <p className="text-muted" style={{ fontSize: '10px', margin: 0, marginTop: '2px' }}>
                  {track.desc} · <span style={{ color: track.accent, fontWeight: 'bold' }}>{track.level}</span>
                </p>
              </div>
              <button 
                onClick={handleStartAction}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--color-cyan)',
                  fontSize: '14px',
                  cursor: 'pointer',
                  padding: '8px'
                }}
              >
                →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 05 — YOUR WORK BECOMES VISIBLE */}
      <section style={{ marginBottom: 'var(--space-8)', borderTop: '1px solid var(--border-space)', paddingTop: 'var(--space-6)' }}>
        <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--color-cyan)', fontWeight: 'bold', letterSpacing: '1px' }}>
          05 · Outcomes
        </span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', marginTop: '4px', marginBottom: 'var(--space-4)' }}>
          Your Work Becomes Visible
        </h3>

        <div style={{ display: 'flex', justifyContent: 'space-around', margin: '16px 0', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '26px', fontWeight: '900', fontFamily: 'var(--font-display)', color: '#fff', lineHeight: '1' }}>60</div>
            <div style={{ fontSize: '9px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginTop: '4px' }}>Days</div>
          </div>
          <div>
            <div style={{ fontSize: '26px', fontWeight: '900', fontFamily: 'var(--font-display)', color: 'var(--color-purple)', lineHeight: '1' }}>60+</div>
            <div style={{ fontSize: '9px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginTop: '4px' }}>Proofs</div>
          </div>
          <div>
            <div style={{ fontSize: '26px', fontWeight: '900', fontFamily: 'var(--font-display)', color: 'var(--color-emerald)', lineHeight: '1' }}>1</div>
            <div style={{ fontSize: '9px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginTop: '4px' }}>Streak</div>
          </div>
        </div>
      </section>

      {/* 06 — LATE-NIGHT COMMUNITY */}
      <section style={{ marginBottom: 'var(--space-8)', borderTop: '1px solid var(--border-space)', paddingTop: 'var(--space-6)' }}>
        <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--color-purple)', fontWeight: 'bold', letterSpacing: '1px' }}>
          06 · Midnight Activity
        </span>
        
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', marginTop: '4px', marginBottom: '6px' }}>
          While the campus sleeps,<br />
          your streak is still moving.
        </h3>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '4px', 
          background: 'rgba(0, 242, 254, 0.03)', 
          border: '1px solid rgba(0, 242, 254, 0.1)', 
          borderRadius: '4px',
          padding: '10px 14px',
          marginTop: 'var(--space-3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 'bold', color: 'var(--color-cyan)' }}>
            <span style={{ width: '6px', height: '6px', background: 'var(--color-emerald)', borderRadius: '50%', boxShadow: '0 0 6px var(--color-emerald)' }}></span>
            🌙 248 students coding tonight
          </div>
          <p style={{ fontSize: '10px', color: 'var(--color-text-secondary)', margin: 0 }}>
            Someone from AKTU just completed Day 11.
          </p>
        </div>
      </section>

      {/* 07 — ONE STUDENT STORY */}
      <section style={{ marginBottom: 'var(--space-8)', borderTop: '1px solid var(--border-space)', paddingTop: 'var(--space-6)' }}>
        <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--color-emerald)', fontWeight: 'bold', letterSpacing: '1px' }}>
          07 · Proof Over Talk
        </span>
        
        <div style={{ marginTop: 'var(--space-3)' }}>
          <p style={{
            fontSize: '15px',
            fontFamily: 'var(--font-display)',
            fontWeight: '600',
            lineHeight: '1.4',
            color: '#fff',
            fontStyle: 'italic',
            margin: '0 0 10px'
          }}>
            "I stopped saying I was learning development. After 60 days, I had proof."
          </p>
          <span style={{ fontSize: '11px', color: 'var(--color-cyan)', fontWeight: 'bold' }}>
            — Rohan Mehta
          </span>
          <span style={{ fontSize: '10px', color: 'var(--color-text-secondary)' }}>
            {" "}· Backend Track Placement
          </span>
        </div>
      </section>

      {/* 08 — FINAL CTA */}
      <section style={{ 
        textAlign: 'center', 
        borderTop: '1px solid var(--border-space)', 
        paddingTop: 'var(--space-6)',
        marginBottom: 'var(--space-4)'
      }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>
          Your first proof starts tonight.
        </h3>
        <p className="text-muted" style={{ fontSize: '11px', marginBottom: 'var(--space-4)' }}>
          Day 1 is waiting. Take the streak challenge.
        </p>
        <button 
          onClick={handleStartAction} 
          className="btn btn-primary anim-pulse-glow"
          style={{ width: '100%', maxWidth: '280px', margin: '0 auto', minHeight: '44px' }}
        >
          Start the 60-Day Challenge →
        </button>
      </section>

      {/* Footer copyright */}
      <footer style={{ textAlign: 'center', padding: 'var(--space-4) 0', borderTop: '1px solid var(--border-space)', opacity: 0.6 }}>
        <p style={{ fontSize: '8px', color: 'var(--color-text-secondary)', letterSpacing: '0.5px', margin: 0 }}>
          © 2026 ABTalks Coding Sandbox.
        </p>
      </footer>

      {/* 🚀 FALLBACK REGISTER POPUP MODAL (Kept for secondary triggers) */}
      {showRegisterModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(6, 6, 9, 0.85)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          zIndex: 2000,
          padding: 'var(--space-4)',
          paddingTop: '60px',
          animation: 'fadeIn 200ms ease-out forwards'
        }}>
          <div 
            className="card card-cosmic card-glowing-cyan"
            style={{
              width: '100%',
              maxWidth: '350px',
              padding: 'var(--space-5)',
              position: 'relative',
              animation: 'cardSlideIn 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
          >
            <button 
              onClick={() => setShowRegisterModal(false)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                color: 'var(--color-text-secondary)',
                fontSize: '18px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>

            <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 'bold', marginBottom: 'var(--space-2)', textAlign: 'center' }}>
              Initialize Coding Sandbox
            </h3>
            <p className="text-muted" style={{ fontSize: '11px', textAlign: 'center', marginBottom: 'var(--space-4)' }}>
              Configure your credentials to track commits and streak badges.
            </p>

            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--color-text-secondary)' }}>Full Name</label>
                <input 
                  type="text" 
                  className="glass-input" 
                  placeholder="e.g. Rahul Sharma"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--color-text-secondary)' }}>University / College</label>
                <input 
                  type="text" 
                  className="glass-input" 
                  placeholder="e.g. AKTU, IMS, DTU..."
                  value={regCollege}
                  onChange={(e) => setRegCollege(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--color-text-secondary)' }}>Select Coding Track</label>
                <select 
                  className="glass-input"
                  value={regTrack}
                  onChange={(e) => setRegTrack(e.target.value)}
                  style={{ background: 'var(--bg-space-light)', cursor: 'pointer' }}
                >
                  <option value="Frontend Web Track">🌐 Frontend Web Track</option>
                  <option value="Backend Java Track">☕ Backend Java Track</option>
                  <option value="DevOps & Cloud Track">☁️ DevOps & Cloud Track</option>
                </select>
              </div>

              {validationError && (
                <div style={{ fontSize: '10px', color: 'var(--color-rose)', background: 'rgba(255,51,102,0.05)', padding: '6px', borderRadius: '4px', border: '1px solid rgba(255,51,102,0.1)' }}>
                  ⚠️ {validationError}
                </div>
              )}

              <button type="submit" className="btn btn-primary anim-pulse-glow" style={{ marginTop: 'var(--space-2)', padding: 'var(--space-3)' }}>
                Launch 60-Day Sandbox 🚀
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
