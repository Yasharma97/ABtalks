package com.example.ABtalks.model;

import java.util.List;

public class StudentProfile {
    private String name;
    private String college;
    private String track;
    private int currentStreak;
    private int longestStreak;
    private int completedCount;
    private int missedCount;
    private int totalDays;
    private String profileState; // "newbie", "steady", "missed"
    private int level;
    private int xp;
    private List<String> badges;

    public StudentProfile() {}

    public StudentProfile(String name, String college, String track, int currentStreak, int longestStreak, 
                          int completedCount, int missedCount, int totalDays, String profileState, 
                          int level, int xp, List<String> badges) {
        this.name = name;
        this.college = college;
        this.track = track;
        this.currentStreak = currentStreak;
        this.longestStreak = longestStreak;
        this.completedCount = completedCount;
        this.missedCount = missedCount;
        this.totalDays = totalDays;
        this.profileState = profileState;
        this.level = level;
        this.xp = xp;
        this.badges = badges;
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCollege() { return college; }
    public void setCollege(String college) { this.college = college; }

    public String getTrack() { return track; }
    public void setTrack(String track) { this.track = track; }

    public int getCurrentStreak() { return currentStreak; }
    public void setCurrentStreak(int currentStreak) { this.currentStreak = currentStreak; }

    public int getLongestStreak() { return longestStreak; }
    public void setLongestStreak(int longestStreak) { this.longestStreak = longestStreak; }

    public int getCompletedCount() { return completedCount; }
    public void setCompletedCount(int completedCount) { this.completedCount = completedCount; }

    public int getMissedCount() { return missedCount; }
    public void setMissedCount(int missedCount) { this.missedCount = missedCount; }

    public int getTotalDays() { return totalDays; }
    public void setTotalDays(int totalDays) { this.totalDays = totalDays; }

    public String getProfileState() { return profileState; }
    public void setProfileState(String profileState) { this.profileState = profileState; }

    public int getLevel() { return level; }
    public void setLevel(int level) { this.level = level; }

    public int getXp() { return xp; }
    public void setXp(int xp) { this.xp = xp; }

    public List<String> getBadges() { return badges; }
    public void setBadges(List<String> badges) { this.badges = badges; }
}
