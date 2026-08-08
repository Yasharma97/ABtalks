import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ChallengeDay from './pages/ChallengeDay';
import { initialStudentProfiles, baseTasks, generateTasksForState } from './mockData';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  // Registration control gate state (defaults to unregistered explorer)
  const [isRegistered, setIsRegistered] = useState(false);

  // React local states replacing backend API syncing
  const [profile, setProfile] = useState(initialStudentProfiles.steady);
  const [tasks, setTasks] = useState(generateTasksForState('steady', baseTasks));

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

  // Client-side profile state switching loader
  const switchProfileState = (state) => {
    if (initialStudentProfiles[state]) {
      setProfile(initialStudentProfiles[state]);
      setTasks(generateTasksForState(state, baseTasks));
    }
  };

  // Client-side submission logic
  const onSubmitSubmission = (dayId, githubUrl, linkedinUrl) => {
    if (!githubUrl || githubUrl.trim() === '' || !githubUrl.includes('github.com')) {
      return { success: false, message: "Please enter a valid GitHub repository or commit URL containing 'github.com'." };
    }
    if (!linkedinUrl || linkedinUrl.trim() === '' || !linkedinUrl.includes('linkedin.com')) {
      return { success: false, message: "Please enter a valid LinkedIn post URL containing 'linkedin.com'." };
    }

    setTasks(prevTasks => prevTasks.map(task => {
      if (task.dayId === dayId) {
        return {
          ...task,
          status: 'COMPLETED',
          githubUrl: githubUrl,
          linkedinUrl: linkedinUrl
        };
      }
      return task;
    }));

    setProfile(prevProf => {
      const updatedCount = prevProf.completedCount + 1;
      let newStreak = prevProf.currentStreak;
      let newProfileState = prevProf.profileState;

      if (prevProf.profileState === 'missed' && dayId === 13) {
        newStreak = 1;
        newProfileState = 'steady';
      } else if (prevProf.profileState === 'newbie') {
        newStreak = 1;
        newProfileState = 'steady';
      } else {
        newStreak = prevProf.currentStreak + 1;
      }

      const longest = Math.max(prevProf.longestStreak, newStreak);
      const updatedBadges = [...prevProf.badges];

      if (updatedCount === 1 && !updatedBadges.includes("First Commit")) {
        updatedBadges.push("First Commit");
      }
      if (newStreak === 7 && !updatedBadges.includes("7-Day Warrior")) {
        updatedBadges.push("7-Day Warrior");
      }

      return {
        ...prevProf,
        name: prevProf.name || "New Coding Warrior",
        college: prevProf.college || "My College",
        completedCount: updatedCount,
        currentStreak: newStreak,
        longestStreak: longest,
        profileState: newProfileState,
        xp: prevProf.xp + 100,
        badges: updatedBadges
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
          setProfile={setProfile}
          setTasks={setTasks}
        />
      );
    }

    // Force redirection back to landing page if user is not registered
    if (!isRegistered) {
      setTimeout(() => navigate('/'), 0);
      return (
        <LandingPage 
          navigate={navigate} 
          isRegistered={isRegistered}
          setIsRegistered={setIsRegistered}
          setProfile={setProfile}
          setTasks={setTasks}
        />
      );
    }

    if (currentPath === '/dashboard') {
      return (
        <Dashboard 
          profile={profile} 
          tasks={tasks} 
          switchProfileState={switchProfileState} 
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
        setProfile={setProfile}
        setTasks={setTasks}
      />
    );
  };

  return (
    <div className="app-container">
      {/* Background Starscape Overlay */}
      <div className="cosmic-stars"></div>
      
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
          onClick={() => {
            if (!isRegistered) {
              // Trigger signup alert or redirect
              navigate('/');
              window.dispatchEvent(new CustomEvent('trigger-registration'));
            } else {
              navigate('/dashboard');
            }
          }} 
          className={`bottom-nav-item ${currentPath === '/dashboard' ? 'active' : ''}`}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span>Dashboard</span>
        </button>

        <button 
          onClick={() => {
            if (!isRegistered) {
              navigate('/');
              window.dispatchEvent(new CustomEvent('trigger-registration'));
            } else {
              navigate('/day/12');
            }
          }} 
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
