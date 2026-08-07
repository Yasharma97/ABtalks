package com.example.ABtalks.controller;

import com.example.ABtalks.model.StudentProfile;
import com.example.ABtalks.model.Task;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.*;

import java.io.InputStream;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ChallengeController {

    private StudentProfile activeProfile;
    private List<Task> tasks = new ArrayList<>();
    private List<Task> baseTasks = new ArrayList<>();
    
    private Map<String, StudentProfile> profiles = new HashMap<>();

    public ChallengeController() {
        loadMockData();
    }

    private void loadMockData() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            ClassPathResource resource = new ClassPathResource("mockData.json");
            InputStream is = resource.getInputStream();
            JsonNode root = mapper.readTree(is);

            // 1. Load profiles from JSON
            JsonNode profilesNode = root.get("studentProfiles");
            profiles.put("newbie", mapper.treeToValue(profilesNode.get("newStudent"), StudentProfile.class));
            profiles.put("steady", mapper.treeToValue(profilesNode.get("activeStreakStudent"), StudentProfile.class));
            profiles.put("missed", mapper.treeToValue(profilesNode.get("missedStreakStudent"), StudentProfile.class));

            // 2. Load the 60 base tasks from JSON
            JsonNode daysNode = root.get("challengeDays");
            List<Task> loadedTasks = mapper.readerForListOf(Task.class).readValue(daysNode);
            baseTasks = new ArrayList<>(loadedTasks);

            // Set default profile
            activeProfile = profiles.get("steady");
            generateTasksForState("steady");
        } catch (Exception e) {
            e.printStackTrace();
            // Fallback initialization in case of error
            activeProfile = new StudentProfile("", "", "Frontend Track", 0, 0, 0, 0, 60, "newbie", 1, 0, new ArrayList<>());
        }
    }

    private void generateTasksForState(String state) {
        tasks.clear();
        for (Task baseTask : baseTasks) {
            Task task = new Task();
            task.setDayId(baseTask.getDayId());
            task.setTitle(baseTask.getTitle());
            task.setDescription(baseTask.getDescription());
            task.setChallenge(baseTask.getChallenge());
            task.setDifficulty(baseTask.getDifficulty());
            
            String status = "LOCKED";
            String github = "";
            String linkedin = "";

            int day = baseTask.getDayId();

            if (state.equals("steady")) {
                if (day <= 18) {
                    status = "COMPLETED";
                    github = baseTask.getGithubUrl() != null ? baseTask.getGithubUrl() : "https://github.com/aaravsharma/abtalks-60day/commit/d2" + day + "fbf8e";
                    linkedin = baseTask.getLinkedinUrl() != null ? baseTask.getLinkedinUrl() : "https://linkedin.com/posts/aarav-sharma-day" + day;
                } else if (day == 19) {
                    status = "PENDING";
                }
            } else if (state.equals("newbie")) {
                if (day == 1) {
                    status = "PENDING";
                }
            } else if (state.equals("missed")) {
                if (day <= 11) {
                    status = "COMPLETED";
                    github = "https://github.com/priyankap/60days/commit/f4" + day + "bb82d";
                    linkedin = "https://linkedin.com/posts/priyanka-p-day" + day;
                } else if (day == 12) {
                    status = "MISSED";
                } else if (day == 13) {
                    status = "PENDING";
                }
            }
            
            task.setStatus(status);
            task.setGithubUrl(github);
            task.setLinkedinUrl(linkedin);
            tasks.add(task);
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
            activeProfile.setCurrentStreak(1);
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
