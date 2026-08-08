import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ChallengeDay from './pages/ChallengeDay';
import ConstellationBackground from './components/ConstellationBackground';
import { initialStudentProfiles, baseTasks, generateTasksForState, calculateStreak, calculateLongestStreak, deriveTasksFromProgress } from './mockData';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  // Registration control gate state (defaults to unregistered explorer)
  const [isRegistered, setIsRegistered] = useState(() => {
    return localStorage.getItem('abtalks_is_registered') === 'true';
  });

  // Decoupled student state containing identity and progress (normalized model)
  const [student, setStudent] = useState(() => {
    const savedIdentity = localStorage.getItem('abtalks_student_identity');
    const savedProgress = localStorage.getItem('abtalks_student_progress');
    
    return {
      identity: savedIdentity ? JSON.parse(savedIdentity) : {
        name: "Rohit Sharma",
        college: "Delhi Technological University (DTU)",
        track: "Frontend Web Track"
      },
      progress: savedProgress ? JSON.parse(savedProgress) : {
        currentDay: 1,
        completedDays: [],
        missedDays: [],
        currentStreak: 0,
        previousStreak: 0
      }
    };
  });

  // Edge case preview states switcher selector ('real', 'newbie', 'steady', 'missed')
  const [activePreviewState, setActivePreviewState] = useState("real");

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('abtalks_is_registered', isRegistered);
    localStorage.setItem('abtalks_student_identity', JSON.stringify(student.identity));
    localStorage.setItem('abtalks_student_progress', JSON.stringify(student.progress));
  }, [isRegistered, student]);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Derive active progress depending on Edge Case Preview state
  const baseProgress = isRegistered 
    ? student.progress 
    : {
        currentDay: 19,
        completedDays: Array.from({ length: 18 }, (_, i) => i + 1),
        missedDays: [],
        currentStreak: 18,
        previousStreak: 18
      };

  let activeProgress = { ...baseProgress };

  if (activePreviewState === "newbie") {
    activeProgress = {
      completedDays: [],
      missedDays: [],
      currentDay: 1,
      currentStreak: 0,
      previousStreak: 0
    };
  } else if (activePreviewState === "steady") {
    activeProgress = {
      completedDays: Array.from({ length: 18 }, (_, i) => i + 1),
      missedDays: [],
      currentDay: 19,
      currentStreak: 18,
      previousStreak: 18
    };
  } else if (activePreviewState === "missed") {
    activeProgress = {
      completedDays: Array.from({ length: 11 }, (_, i) => i + 1),
      missedDays: [12],
      currentDay: 13,
      currentStreak: 0,
      previousStreak: 11
    };
  }

  // Derive tasks list dynamically from current active progress state
  const tasks = deriveTasksFromProgress(
    activeProgress.completedDays,
    activeProgress.missedDays,
    activeProgress.currentDay,
    baseTasks
  );

  // Compute metrics dynamically
  const currentStreak = calculateStreak(activeProgress.completedDays, activeProgress.missedDays, activeProgress.currentDay);
  const longestStreak = calculateLongestStreak(activeProgress.completedDays);
  const completedCount = activeProgress.completedDays.length;
  const missedCount = activeProgress.missedDays.length;
  const xp = completedCount * 100;
  const level = Math.floor(xp / 500) + 1;

  // Deriving active badges/achievements based on milestones
  const achievements = [];
  if (completedCount >= 1) achievements.push("First Commit");
  if (currentStreak >= 7) achievements.push("7-Day Warrior");
  if (currentStreak >= 14) achievements.push("14-Day Overlord");
  if (completedCount >= 10) achievements.push("Early Bird");

  // Determine active profileState slug
  let profileState = "newbie";
  if (activeProgress.missedDays.includes(activeProgress.currentDay - 1)) {
    profileState = "missed";
  } else if (completedCount > 0) {
    profileState = "steady";
  }

  const activeIdentity = isRegistered 
    ? student.identity 
    : {
        name: "Aarav Sharma",
        college: "Delhi Technological University (DTU)",
        track: "Frontend Web Track"
      };

  const profile = {
    identity: { ...activeIdentity },
    progress: {
      ...activeProgress,
      currentStreak,
      previousStreak: activePreviewState === "missed" ? 11 : activeProgress.previousStreak,
      longestStreak,
      completedCount,
      missedCount,
      level,
      xp,
      profileState
    },
    achievements,
    activePreviewState // Pass preview identifier down
  };

  // Client-side profile state switching loader
  const switchProfileState = (state) => {
    if (state === "real") {
      setActivePreviewState("real");
    } else if (state === "newbie" || state === "steady" || state === "missed") {
      setActivePreviewState(state);
    }
  };

  // Client-side signup registration setProfile proxy
  const handleSignupProfile = (newProfile) => {
    setStudent({
      identity: {
        name: newProfile.name,
        college: newProfile.college,
        track: newProfile.track
      },
      progress: {
        completedDays: [],
        missedDays: [],
        currentDay: 1,
        currentStreak: 0,
        previousStreak: 0
      },
      achievements: []
    });
    setActivePreviewState("real");
  };

  // Service method to advance time/day for real user testing
  const onAdvanceDay = () => {
    setStudent(prev => {
      const missed = [...prev.progress.missedDays];
      // If the current day is not completed, it is marked as missed
      if (!prev.progress.completedDays.includes(prev.progress.currentDay)) {
        missed.push(prev.progress.currentDay);
      }
      return {
        ...prev,
        progress: {
          ...prev.progress,
          missedDays: missed,
          currentDay: prev.progress.currentDay + 1
        }
      };
    });
  };

  // Client-side submission logic
  const onSubmitSubmission = (dayId, githubUrl, linkedinUrl) => {
    if (!githubUrl || githubUrl.trim() === '' || !githubUrl.includes('github.com')) {
      return { success: false, message: "Please enter a valid GitHub repository or commit URL containing 'github.com'." };
    }
    if (!linkedinUrl || linkedinUrl.trim() === '' || !linkedinUrl.includes('linkedin.com')) {
      return { success: false, message: "Please enter a valid LinkedIn post URL containing 'linkedin.com'." };
    }

    setStudent(prev => {
      const completed = prev.progress.completedDays.includes(dayId)
        ? prev.progress.completedDays
        : [...prev.progress.completedDays, dayId];

      let nextDay = prev.progress.currentDay;
      if (dayId === prev.progress.currentDay) {
        nextDay = prev.progress.currentDay + 1;
      }

      return {
        ...prev,
        progress: {
          ...prev.progress,
          completedDays: completed,
          currentDay: nextDay
        }
      };
    });

    return { success: true, message: `Submission received! Day ${dayId} completed. Streak updated!` };
  };

  // Route resolver helper with registration gate
  const renderView = () => {
    if (currentPath === '/') {
      return (
        <LandingPage 
          navigate={navigate} 
          isRegistered={isRegistered}
          setIsRegistered={setIsRegistered}
          setProfile={handleSignupProfile}
          setTasks={() => {}}
        />
      );
    }

    if (currentPath === '/dashboard') {
      return (
        <Dashboard 
          profile={profile} 
          tasks={tasks} 
          switchProfileState={switchProfileState} 
          onAdvanceDay={onAdvanceDay}
          navigate={navigate} 
        />
      );
    }
    
    const dayMatch = currentPath.match(/^\/day\/(\d+)$/);
    if (dayMatch) {
      const dayId = parseInt(dayMatch[1], 10);
      return (
        <ChallengeDay 
          dayId={dayId} 
          tasks={tasks} 
          onSubmitSubmission={onSubmitSubmission} 
          navigate={navigate} 
        />
      );
    }

    return (
      <LandingPage 
        navigate={navigate} 
        isRegistered={isRegistered}
        setIsRegistered={setIsRegistered}
        setProfile={handleSignupProfile}
        setTasks={() => {}}
      />
    );
  };

  // Determine current active day to highlight in constellation
  let constellationDay = 0;
  let constellationOpacity = 0.85;

  if (isRegistered) {
    if (currentPath.startsWith('/day/')) {
      const match = currentPath.match(/^\/day\/(\d+)$/);
      if (match) {
        constellationDay = parseInt(match[1], 10);
      }
      constellationOpacity = 0.35; // Keep it extremely subtle on task details pages
    } else if (currentPath === '/dashboard') {
      constellationDay = profile.progress.completedCount || 0;
      constellationOpacity = 0.85; // Full visible depth on dashboard
    }
  }

  return (
    <div className="app-container">
      {/* Background Constellation Journey System */}
      <ConstellationBackground currentDay={constellationDay} opacityMultiplier={constellationOpacity} />
      
      {/* Active Screen View with slide/fade page transitions */}
      <div key={currentPath} className="anim-page-transition">
        {renderView()}
      </div>

      {/* Reusable Bottom Navigation Bar (Disabled/redirected on click if unregistered) */}
      <nav className="bottom-nav">
        <button 
          onClick={() => navigate('/')} 
          className={`bottom-nav-item ${currentPath === '/' ? 'active' : ''}`}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Landing</span>
        </button>

        <button 
          onClick={() => navigate('/dashboard')} 
          className={`bottom-nav-item ${currentPath === '/dashboard' ? 'active' : ''}`}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span>Dashboard</span>
        </button>

        <button 
          onClick={() => navigate('/day/12')} 
          className={`bottom-nav-item ${currentPath.startsWith('/day/') ? 'active' : ''}`}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Day 12</span>
        </button>
      </nav>
    </div>
  );
}
