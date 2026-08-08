import React, { useState, useEffect } from 'react';
import { generateTasksForState, baseTasks } from '../mockData';

export default function LandingPage({ navigate, isRegistered, setIsRegistered, setProfile, setTasks }) {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [regName, setRegName] = useState('');
  const [regCollege, setRegCollege] = useState('');
  const [regTrack, setRegTrack] = useState('Frontend Web Track');
  const [validationError, setValidationError] = useState('');

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
      setShowRegisterModal(true);
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
      icon: "🌐",
      desc: "React, Vite, CSS Grid, Framer Motion, Tailwind CSS & SEO",
      level: "Beginner to Pro",
      accent: "var(--color-cyan)",
      borderClass: "card-glowing-cyan"
    },
    {
      id: "backend",
      name: "Backend Java Track",
      icon: "☕",
      desc: "Core Java, OOPs, Spring Boot, JPA Hibernate, Gradle & SQL",
      level: "Intermediate",
      accent: "var(--color-purple)",
      borderClass: "card-glowing-purple"
    },
    {
      id: "devops",
      name: "DevOps & Cloud Track",
      icon: "☁️",
      desc: "Docker, Kubernetes, GitHub Actions, Linux Bash & AWS Cloud",
      level: "Advanced",
      accent: "var(--color-emerald)",
      borderClass: "card-glowing-emerald"
    }
  ];

  const valueProps = [
    {
      step: "01",
      title: "Get Daily Task Coordinates",
      desc: "Receive bite-sized industry-relevant coding problems unlocked every single day at midnight.",
      icon: "📥"
    },
    {
      step: "02",
      title: "Commit to Public GitHub",
      desc: "Push your solutions to Git. Build a verifiable proof of work history that recruiters can verify.",
      icon: "🐙"
    },
    {
      step: "03",
      title: "Publish LinkedIn Daily Log",
      desc: "Share your learnings and build public authority. Get noticed by startup founders and talent acquisition teams.",
      icon: "📢"
    }
  ];

  const testimonials = [
    {
      name: "Rohan Mehta",
      college: "BMS College of Engineering",
      role: "React Dev @ Razorpay",
      text: "ABTalks forced consistency in me. Pushing commits and posting on LinkedIn daily for 60 days made recruiters DM me instead of me applying. Highly recommended!",
      avatar: "👨‍💻",
      borderClass: "card-glowing-cyan"
    },
    {
      name: "Sneha Gupta",
      college: "HBTU Kanpur",
      role: "Java Dev @ Cognizant",
      text: "The late-night gamified streaks kept me coding even after long lectures. Building Spring Boot endpoints gave me real-world design experience.",
      avatar: "👩‍💻",
      borderClass: "card-glowing-purple"
    }
  ];

  const recruiterLogos = [
    { name: "Google", color: "#4285F4" },
    { name: "Microsoft", color: "#F25022" },
    { name: "Amazon", color: "#FF9900" },
    { name: "TCS", color: "#1B365D" },
    { name: "Infosys", color: "#007CC3" },
    { name: "Razorpay", color: "#0052FF" }
  ];

  return (
    <div style={{ padding: 'var(--space-4)', position: 'relative' }}>
      
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

      {/* Header Bar */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'var(--space-8)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <div className="anim-float" style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--color-cyan), var(--color-purple))',
            boxShadow: 'var(--glow-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'var(--fs-md)',
            fontWeight: 'bold',
            color: '#fff'
          }}>
            AB
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: '800', fontSize: 'var(--fs-md)', letterSpacing: '1.5px', margin: 0 }}>
              AB<span className="text-gradient-cyan-purple">TALKS</span>
            </h1>
            <span style={{ fontSize: '8px', color: 'var(--color-text-secondary)', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginTop: '-3px' }}>
              Coding Sandbox
            </span>
          </div>
        </div>
        <button 
          onClick={handleStartAction} 
          className="btn btn-secondary" 
          style={{ width: 'auto', padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--fs-xs)', borderRadius: 'var(--radius-sm)' }}
        >
          {isRegistered ? 'Dashboard →' : 'Register'}
        </button>
      </header>

      {/* Hero Section with staggered card entrance animations */}
      <section style={{ textAlign: 'center', marginBottom: 'var(--space-10)', position: 'relative', zIndex: 5 }}>
        <div className="badge badge-cyan anim-card-entry delay-1" style={{ marginBottom: 'var(--space-4)', padding: '6px 12px', fontSize: '10px' }}>
          ✨ The Ultimate 60-Day Student Coding Challenge
        </div>
        
        <h2 className="anim-card-entry delay-2" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--fs-xxl)',
          lineHeight: '1.2',
          fontWeight: '900',
          marginBottom: 'var(--space-3)'
        }}>
          Build Consistency.<br />
          <span className="text-gradient-cyan-purple">Get Recruiter-Ready.</span>
        </h2>
        
        <p className="text-muted anim-card-entry delay-3" style={{
          fontSize: 'var(--fs-sm)',
          maxWidth: '350px',
          margin: '0 auto var(--space-5)',
          lineHeight: '1.5',
          padding: '0 var(--space-2)'
        }}>
          Pick your track, write clean code every night, and project your progress live to prospective recruiters via Git and LinkedIn.
        </p>

        {/* 🚀 FIRST APPEARANCE: Inline Registration Form (if not registered) */}
        <div className="anim-card-entry delay-4" style={{ width: '100%', maxWidth: '340px', margin: '0 auto' }}>
          {!isRegistered ? (
            <div 
              className="card card-cosmic card-glowing-cyan"
              style={{
                padding: 'var(--space-4)',
                textAlign: 'left',
                background: 'rgba(12, 13, 20, 0.85)',
                border: '1px solid rgba(0, 242, 254, 0.3)',
                boxShadow: 'var(--glow-cyan)'
              }}
            >
              <h3 style={{ fontSize: 'var(--fs-sm)', fontWeight: 'bold', marginBottom: 'var(--space-1)', textAlign: 'center', color: '#fff' }}>
                Quick Initialize Sandbox
              </h3>
              <p className="text-muted" style={{ fontSize: '10px', textAlign: 'center', marginBottom: 'var(--space-3)', lineHeight: '1.3' }}>
                Enter your details coordinates to unlock `/dashboard` and start submitting tasks.
              </p>

              <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <label style={{ fontSize: '9px', fontWeight: 'bold', color: 'var(--color-text-secondary)' }}>Full Name</label>
                  <input 
                    type="text" 
                    className="glass-input" 
                    placeholder="e.g. Rahul Sharma"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    style={{ padding: '8px 10px', fontSize: '11px' }}
                    required
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <label style={{ fontSize: '9px', fontWeight: 'bold', color: 'var(--color-text-secondary)' }}>University / College</label>
                  <input 
                    type="text" 
                    className="glass-input" 
                    placeholder="e.g. AKTU, IMS, DTU"
                    value={regCollege}
                    onChange={(e) => setRegCollege(e.target.value)}
                    style={{ padding: '8px 10px', fontSize: '11px' }}
                    required
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <label style={{ fontSize: '9px', fontWeight: 'bold', color: 'var(--color-text-secondary)' }}>Tech Track</label>
                  <select 
                    className="glass-input"
                    value={regTrack}
                    onChange={(e) => setRegTrack(e.target.value)}
                    style={{ padding: '8px 10px', fontSize: '11px', background: 'var(--bg-space-light)' }}
                  >
                    <option value="Frontend Web Track">🌐 Frontend Web Track</option>
                    <option value="Backend Java Track">☕ Backend Java Track</option>
                    <option value="DevOps & Cloud Track">☁️ DevOps & Cloud Track</option>
                  </select>
                </div>

                {validationError && (
                  <div style={{ fontSize: '9px', color: 'var(--color-rose)', background: 'rgba(255,51,102,0.05)', padding: '4px', borderRadius: '4px', border: '1px solid rgba(255,51,102,0.1)' }}>
                    ⚠️ {validationError}
                  </div>
                )}

                <button type="submit" className="btn btn-primary anim-pulse-glow" style={{ marginTop: '4px', padding: '10px', minHeight: '38px', fontSize: '12px' }}>
                  Launch Sandbox Now 🚀
                </button>
              </form>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <button 
                onClick={() => navigate('/dashboard')} 
                className="btn btn-primary anim-pulse-glow"
                style={{ padding: 'var(--space-3) var(--space-6)', fontSize: 'var(--fs-sm)' }}
              >
                Enter Dashboard ⚡
              </button>
              <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
                You are registered and ready to track commits!
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Value Proposition Grid with staggered cards */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--fs-md)',
          textAlign: 'center',
          marginBottom: 'var(--space-4)'
        }}>
          The 3-Step Proof of Work
        </h3>
        
        <div className="grid-responsive-3">
          {valueProps.map((prop, index) => (
            <div key={index} className="glass-panel anim-card-entry" style={{
              display: 'flex',
              gap: 'var(--space-3)',
              background: 'rgba(12, 13, 20, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.04)',
              animationDelay: `${index * 50 + 200}ms`
            }}>
              <div style={{
                fontSize: 'var(--fs-lg)',
                fontWeight: '800',
                color: 'var(--color-cyan)',
                fontFamily: 'var(--font-display)',
                background: 'rgba(0, 242, 254, 0.05)',
                minWidth: '40px',
                height: '40px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 0 0 10px rgba(0, 242, 254, 0.1)'
              }}>
                {prop.step}
              </div>
              <div>
                <h4 style={{ fontSize: 'var(--fs-sm)', fontWeight: 'bold', marginBottom: '2px', color: 'var(--color-text-primary)' }}>
                  {prop.title}
                </h4>
                <p className="text-muted" style={{ fontSize: 'var(--fs-xs)', lineHeight: '1.4' }}>
                  {prop.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Track Selector Section */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--fs-md)',
          textAlign: 'center',
          marginBottom: 'var(--space-4)'
        }}>
          Select Your Coding Track
        </h3>

        <div className="grid-responsive-3">
          {tracks.map((track) => (
            <div 
              key={track.id} 
              className={`card card-cosmic card-interactive ${track.borderClass}`}
              style={{ padding: 'var(--space-4)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                <span style={{ fontSize: '24px' }}>{track.icon}</span>
                <span className="badge badge-cyan" style={{ fontSize: '9px', textTransform: 'uppercase' }}>
                  {track.level}
                </span>
              </div>
              <h4 style={{ fontSize: 'var(--fs-sm)', fontWeight: 'bold', color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                {track.name}
              </h4>
              <p className="text-muted" style={{ fontSize: 'var(--fs-xs)', marginBottom: 'var(--space-3)', lineHeight: '1.3' }}>
                {track.desc}
              </p>
              <button 
                onClick={handleStartAction}
                className="btn btn-secondary" 
                style={{
                  padding: '6px 12px',
                  fontSize: '11px',
                  borderColor: track.accent,
                  color: track.accent,
                  background: 'rgba(255, 255, 255, 0.01)',
                  width: 'auto',
                  alignSelf: 'flex-start'
                }}
              >
                Explore Track Syllabus
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="glass-panel" style={{
        marginBottom: 'var(--space-8)',
        background: 'linear-gradient(135deg, rgba(12, 13, 20, 0.8) 0%, rgba(6, 6, 9, 0.8) 100%)',
        textAlign: 'center',
        padding: 'var(--space-5)'
      }}>
        <h3 style={{ fontSize: 'var(--fs-sm)', textTransform: 'uppercase', color: 'var(--color-cyan)', letterSpacing: '1px', marginBottom: 'var(--space-4)' }}>
          Alumni Outcomes
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <div style={{ borderRight: '1px solid var(--border-space)', paddingRight: 'var(--space-2)' }}>
            <div style={{ fontSize: 'var(--fs-xl)', fontWeight: 'bold', color: '#fff' }}>8.5 LPA</div>
            <div style={{ fontSize: '9px', color: 'var(--color-text-secondary)' }}>Avg Packages</div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--fs-xl)', fontWeight: 'bold', color: 'var(--color-emerald)' }}>32 LPA</div>
            <div style={{ fontSize: '9px', color: 'var(--color-text-secondary)' }}>Highest Package</div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-space)', marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)' }}>
          <div style={{ fontSize: 'var(--fs-xxl)', fontWeight: 'bold', color: '#fff', lineHeight: '1' }}>94.2%</div>
          <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
            Success Placement Rate
          </div>
        </div>
      </section>

      {/* Recruiter Trust Section */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--fs-sm)',
          textAlign: 'center',
          color: 'var(--color-text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: 'var(--space-3)'
        }}>
          Recruiters Hiring Our Graduates
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--space-2)'
        }}>
          {recruiterLogos.map((logo, index) => (
            <div 
              key={index}
              className="glass-panel"
              style={{
                padding: 'var(--space-2) var(--space-1)',
                textAlign: 'center',
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.03)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '38px'
              }}
            >
              <span style={{
                fontSize: '11px',
                fontWeight: 'bold',
                color: 'var(--color-text-secondary)',
                letterSpacing: '0.5px'
              }}>
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ marginBottom: 'var(--space-10)' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--fs-md)',
          textAlign: 'center',
          marginBottom: 'var(--space-4)'
        }}>
          Placed Students Say
        </h3>

        <div className="grid-responsive-2">
          {testimonials.map((test, index) => (
            <div 
              key={index}
              className={`card card-cosmic ${test.borderClass}`}
              style={{ padding: 'var(--space-4)' }}
            >
              <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                <span style={{ fontSize: '24px' }}>{test.avatar}</span>
                <div>
                  <h4 style={{ fontSize: 'var(--fs-sm)', fontWeight: 'bold', margin: 0 }}>{test.name}</h4>
                  <p className="text-muted" style={{ fontSize: '9px', margin: 0 }}>{test.college} · {test.role}</p>
                </div>
              </div>
              <p className="text-muted" style={{ fontSize: 'var(--fs-xs)', lineHeight: '1.4', fontStyle: 'italic' }}>
                "{test.text}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="glass-panel animate-card-entry" style={{
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(127, 0, 255, 0.1) 0%, rgba(0, 242, 254, 0.08) 100%)',
        border: '1px solid rgba(0, 242, 254, 0.2)',
        padding: 'var(--space-6)',
        marginBottom: 'var(--space-6)'
      }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-lg)', fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>
          Ready to Make the Commitment?
        </h3>
        <p className="text-muted" style={{ fontSize: 'var(--fs-xs)', marginBottom: 'var(--space-5)', lineHeight: '1.4' }}>
          Take the 60-day sandbox challenge. Build credentials, establish streaks, get visible. Start coding tonight.
        </p>
        <button 
          onClick={handleStartAction} 
          className="btn btn-primary"
          style={{ width: '100%', maxWidth: '240px', margin: '0 auto' }}
        >
          {isRegistered ? 'Launch Dashboard 🚀' : 'Enroll in Sandbox Free 🚀'}
        </button>
      </section>

      {/* Footer copyright */}
      <footer style={{ textAlign: 'center', padding: 'var(--space-4) 0', borderTop: '1px solid var(--border-space)' }}>
        <p className="text-muted" style={{ fontSize: '9px', letterSpacing: '0.5px' }}>
          © 2026 ABTalks Coding Sandbox. All rights reserved.
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
          paddingTop: '60px', // Align form above the viewport center
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
