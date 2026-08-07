import React from 'react';

export default function LandingPage({ navigate }) {
  const tracks = [
    { name: "Frontend Development", desc: "HTML5, CSS3, ES6 JavaScript, React, Tailwind & Vite", icon: "🌐", level: "Beginner to Pro" },
    { name: "Backend Java", desc: "Core Java, OOPs, Spring Boot REST APIs, Gradle, Hibernate & SQL", icon: "☕", level: "Intermediate" },
    { name: "DevOps & Cloud", desc: "Linux bash, Git, Docker, CI/CD, AWS Cloud & Kubernetes", icon: "☁️", level: "Advanced" }
  ];

  return (
    <div className="anim-fade-in" style={{ padding: 'var(--space-4)' }}>
      {/* Title / Logo Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-sm)',
            background: 'linear-gradient(135deg, var(--color-cyan), var(--color-purple))',
            boxShadow: 'var(--glow-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'var(--fs-base)',
            fontWeight: 'bold'
          }}>AB</div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 'bold', fontSize: 'var(--fs-md)', letterSpacing: '1px' }}>
            TALKS
          </span>
        </div>
        <button onClick={() => navigate('/dashboard')} className="btn btn-secondary" style={{ width: 'auto', padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--fs-xs)' }}>
          Enter Dashboard
        </button>
      </div>

      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
        <div className="badge badge-purple" style={{ marginBottom: 'var(--space-3)' }}>⚡ 60-Day Student Coding Challenge</div>
        <h1 style={{ fontSize: 'var(--fs-xxl)', lineHeight: '1.2', fontWeight: '800' }}>
          Build Consistency. <br />
          <span className="text-gradient-cyan-purple">Get Recruiter-Ready.</span>
        </h1>
        <p className="text-muted" style={{ fontSize: 'var(--fs-sm)', marginTop: 'var(--space-3)', padding: '0 var(--space-2)' }}>
          Pick a track, code every day late at night, and maintain a public learning streak. Prove your skills, get visible.
        </p>
        <div style={{ marginTop: 'var(--space-6)' }}>
          <button onClick={() => navigate('/dashboard')} className="btn btn-primary" style={{ padding: 'var(--space-4) var(--space-8)' }}>
            Start the Challenge Free 🚀
          </button>
        </div>
      </div>

      {/* Proof of Work Concept Section */}
      <div className="glass-panel" style={{ marginBottom: 'var(--space-6)' }}>
        <h3 style={{ fontSize: 'var(--fs-md)', borderBottom: '1px solid var(--border-space)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
          How it Works
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <div style={{ color: 'var(--color-cyan)', fontSize: '20px' }}>📦</div>
            <div>
              <h4 style={{ fontSize: 'var(--fs-sm)', marginBottom: '2px' }}>1. Get Your Daily Task</h4>
              <p className="text-muted" style={{ fontSize: 'var(--fs-xs)' }}>Every day, a new coding exercise is unlocked on your track dashboard.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <div style={{ color: 'var(--color-purple)', fontSize: '20px' }}>💻</div>
            <div>
              <h4 style={{ fontSize: 'var(--fs-sm)', marginBottom: '2px' }}>2. Commit Code to GitHub</h4>
              <p className="text-muted" style={{ fontSize: 'var(--fs-xs)' }}>Write the code, push to your public repo, and submit the commit link.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <div style={{ color: 'var(--color-emerald)', fontSize: '20px' }}>📢</div>
            <div>
              <h4 style={{ fontSize: 'var(--fs-sm)', marginBottom: '2px' }}>3. Post Learning on LinkedIn</h4>
              <p className="text-muted" style={{ fontSize: 'var(--fs-xs)' }}>Share your technical insights in a brief daily LinkedIn post to build authority.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tracks Carousel/List */}
      <h3 style={{ fontSize: 'var(--fs-md)', marginBottom: 'var(--space-3)', fontFamily: 'var(--font-display)' }}>Select Your Track</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
        {tracks.map((track, i) => (
          <div key={i} className="card card-cosmic card-interactive" style={{ padding: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--fs-lg)' }}>{track.icon}</span>
              <span className="badge badge-cyan">{track.level}</span>
            </div>
            <h4 style={{ fontSize: 'var(--fs-sm)', fontWeight: 'bold' }}>{track.name}</h4>
            <p className="text-muted" style={{ fontSize: 'var(--fs-xs)' }}>{track.desc}</p>
          </div>
        ))}
      </div>

      {/* Trust & Testimonial Stats */}
      <div style={{ textAlign: 'center', borderTop: '1px solid var(--border-space)', paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-4)' }}>
        <h3 style={{ fontSize: 'var(--fs-md)', color: 'var(--color-text-primary)' }}>Why Indian Students Trust Us</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
          <div className="glass-panel" style={{ padding: 'var(--space-3)' }}>
            <div style={{ fontSize: 'var(--fs-xl)', fontWeight: 'bold', color: 'var(--color-cyan)' }}>15,000+</div>
            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-text-secondary)' }}>Students Joined</div>
          </div>
          <div className="glass-panel" style={{ padding: 'var(--space-3)' }}>
            <div style={{ fontSize: 'var(--fs-xl)', fontWeight: 'bold', color: 'var(--color-purple)' }}>250+</div>
            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-text-secondary)' }}>Recruiters Hiring</div>
          </div>
        </div>
      </div>
    </div>
  );
}
