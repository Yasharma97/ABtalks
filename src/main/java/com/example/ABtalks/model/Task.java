package com.example.ABtalks.model;

public class Task {
    private int dayId;
    private String title;
    private String description;
    private String challenge;
    private String difficulty;
    private String status; // "LOCKED", "PENDING", "COMPLETED", "MISSED"
    private String githubUrl;
    private String linkedinUrl;

    public Task() {}

    public Task(int dayId, String title, String description, String challenge, String difficulty, String status) {
        this.dayId = dayId;
        this.title = title;
        this.description = description;
        this.challenge = challenge;
        this.difficulty = difficulty;
        this.status = status;
    }

    // Getters and Setters
    public int getDayId() { return dayId; }
    public void setDayId(int dayId) { this.dayId = dayId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getChallenge() { return challenge; }
    public void setChallenge(String challenge) { this.challenge = challenge; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }

    public String getLinkedinUrl() { return linkedinUrl; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }
}
