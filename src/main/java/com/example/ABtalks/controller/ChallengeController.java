package com.example.ABtalks.controller;

import com.example.ABtalks.model.StudentProfile;
import com.example.ABtalks.model.Task;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ChallengeController {

    private StudentProfile activeProfile;
    private List<Task> tasks = new ArrayList<>();
    
    // Cache profiles
    private Map<String, StudentProfile> profiles = new HashMap<>();
    // Store task lists per profile state
    private Map<String, List<Task>> profileTasks = new HashMap<>();

    public ChallengeController() {
        initMockData();
    }

    private void initMockData() {
        // 1. Newbie Profile
        StudentProfile newbie = new StudentProfile(
            "", // Empty profile
            "",
            "Frontend Dev",
            0, 0, 0, 0, 60, "newbie", 
            1, 0, new ArrayList<>()
        );
        profiles.put("newbie", newbie);
        
        // 2. Steady Streak Profile
        List<String> steadyBadges = Arrays.asList("First Commit", "7-Day Warrior", "14-Day Overlord", "LinkedIn Influencer");
        StudentProfile steady = new StudentProfile(
            "Aarav Sharma",
            "Delhi Technological University (DTU)",
            "Full Stack Web Track",
            18, 18, 18, 0, 60, "steady",
            4, 1800, steadyBadges
        );
        profiles.put("steady", steady);

        // 3. Missed Day Profile
        List<String> missedBadges = Arrays.asList("First Commit", "Early Bird");
        StudentProfile missed = new StudentProfile(
            "Priyanka Patel",
            "Vellore Institute of Technology (VIT)",
            "Backend Java Track",
            0, 12, 12, 1, 60, "missed",
            3, 1200, missedBadges
        );
        profiles.put("missed", missed);

        // Set default profile
        activeProfile = profiles.get("steady");
        generateTasksForState("steady");
    }

    private void generateTasksForState(String state) {
        tasks.clear();
        for (int i = 1; i <= 60; i++) {
            String title = getTaskTitle(i);
            String desc = getTaskDesc(i);
            String challenge = getTaskChallenge(i);
            String difficulty = i <= 20 ? "Easy" : (i <= 45 ? "Medium" : "Hard");
            
            String status = "LOCKED";
            String github = "";
            String linkedin = "";

            if (state.equals("steady")) {
                if (i <= 18) {
                    status = "COMPLETED";
                    github = "https://github.com/aaravsharma/abtalks-60day/commit/d2" + i + "fbf8e";
                    linkedin = "https://linkedin.com/posts/aarav-sharma-day" + i;
                } else if (i == 19) {
                    status = "PENDING";
                }
            } else if (state.equals("newbie")) {
                if (i == 1) {
                    status = "PENDING";
                }
            } else if (state.equals("missed")) {
                if (i <= 11) {
                    status = "COMPLETED";
                    github = "https://github.com/priyankap/60days/commit/f4" + i + "bb82d";
                    linkedin = "https://linkedin.com/posts/priyanka-p-day" + i;
                } else if (i == 12) {
                    status = "MISSED";
                } else if (i == 13) {
                    status = "PENDING";
                }
            }
            
            Task task = new Task(i, title, desc, challenge, difficulty, status);
            if (!github.isEmpty()) {
                task.setGithubUrl(github);
                task.setLinkedinUrl(linkedin);
            }
            tasks.add(task);
        }
    }

    private String getTaskTitle(int day) {
        switch (day) {
            case 1: return "Git Started & Workspace Setup";
            case 2: return "HTML5 Semantics & Structure";
            case 3: return "CSS Variables & Layouts";
            case 4: return "Responsive Design & Flexbox";
            case 5: return "CSS Grid & Dashboard Layouts";
            case 6: return "JavaScript ES6 Essentials";
            case 7: return "DOM Manipulation & Event Listeners";
            case 8: return "Simple Interactive Calculator";
            case 9: return "Local Storage & Persistence";
            case 10: return "Asynchronous JavaScript & Promises";
            case 11: return "Fetch API & Public REST Endpoints";
            case 12: return "GitHub Profile Explorer UI";
            case 13: return "Debouncing & Search Optimization";
            case 14: return "ChartJS Data Visualizations";
            case 15: return "Interactive Weather App UI";
            case 16: return "Custom Audio Player Controls";
            case 17: return "Regex Form Validator";
            case 18: return "Kanban Board Drag & Drop";
            case 19: return "Theme Controller & Light Mode";
            case 20: return "Introduction to React and Components";
            default: return "Day " + day + ": Cosmic Challenge";
        }
    }

    private String getTaskDesc(int day) {
        switch (day) {
            case 1: return "Set up your Git workspace, sign in to GitHub, create a repository named 'abtalks-60-day-challenge', and submit your first markdown README file detailing your track goals.";
            case 12: return "Develop a single-page card viewer that queries the public GitHub API for a user, displaying their avatar, repositories, follower counts, and starred repos in a premium glassmorphic grid.";
            default: return "Build a mini application or layout module focusing on writing clean, modular code. Make sure it is fully responsive on mobile screen viewports (390px) and styled using variables.";
        }
    }

    private String getTaskChallenge(int day) {
        switch (day) {
            case 1: return "Create a repo, add index.html, commit, push, write a LinkedIn post stating your track choice, and submit links.";
            case 12: return "Create an input field for a GitHub username, pull user profile via Fetch API, render repositories sorted by stars, and handle errors for non-existent users gracefully.";
            default: return "Write clean code, deploy the result to Vercel/GitHub Pages, write a daily recap post on LinkedIn, and submit the URLs below.";
        }
    }

    @GetMapping("/profile")
    public StudentProfile getProfile() {
        return activeProfile;
    }

    @PostMapping("/profile/select")
    public StudentProfile selectProfile(@RequestParam String state) {
        if (profiles.containsKey(state)) {
            activeProfile = profiles.get(state);
            generateTasksForState(state);
        }
        return activeProfile;
    }

    @GetMapping("/tasks")
    public List<Task> getTasks() {
        return tasks;
    }

    @GetMapping("/tasks/{dayId}")
    public Task getTask(@PathVariable int dayId) {
        return tasks.stream()
                .filter(t -> t.getDayId() == dayId)
                .findFirst()
                .orElse(null);
    }

    @PostMapping("/tasks/{dayId}/submit")
    public Map<String, Object> submitTask(
            @PathVariable int dayId,
            @RequestBody Map<String, String> submission) {
        
        String github = submission.get("githubUrl");
        String linkedin = submission.get("linkedinUrl");
        Map<String, Object> response = new HashMap<>();

        if (github == null || github.trim().isEmpty() || !github.contains("github.com")) {
            response.put("success", false);
            response.put("message", "Please enter a valid GitHub repository or commit URL");
            return response;
        }

        if (linkedin == null || linkedin.trim().isEmpty() || !linkedin.contains("linkedin.com")) {
            response.put("success", false);
            response.put("message", "Please enter a valid LinkedIn post URL");
            return response;
        }

        // Find task and update status
        for (Task task : tasks) {
            if (task.getDayId() == dayId) {
                task.setStatus("COMPLETED");
                task.setGithubUrl(github);
                task.setLinkedinUrl(linkedin);
                break;
            }
        }

        // Update active profile stats
        activeProfile.setCompletedCount(activeProfile.getCompletedCount() + 1);
        activeProfile.setXp(activeProfile.getXp() + 100);
        
        // Handle streak recovery/increment
        if (activeProfile.getProfileState().equals("missed") && dayId == 13) {
            // Recover streak on next pending day submission
            activeProfile.setCurrentStreak(1); // Reset and restart
            activeProfile.setProfileState("steady");
        } else if (activeProfile.getProfileState().equals("newbie")) {
            activeProfile.setCurrentStreak(1);
            activeProfile.setProfileState("steady");
            activeProfile.setName("New Coding Warrior");
            activeProfile.setCollege("My College");
        } else {
            activeProfile.setCurrentStreak(activeProfile.getCurrentStreak() + 1);
            if (activeProfile.getCurrentStreak() > activeProfile.getLongestStreak()) {
                activeProfile.setLongestStreak(activeProfile.getCurrentStreak());
            }
        }

        // Add a new badge if completed 15 days or starting
        if (activeProfile.getCompletedCount() == 1) {
            if (!activeProfile.getBadges().contains("First Commit")) {
                activeProfile.getBadges().add("First Commit");
            }
        }

        response.put("success", true);
        response.put("message", "Submission received! Day " + dayId + " completed. Streak updated!");
        response.put("profile", activeProfile);
        
        return response;
    }
}
