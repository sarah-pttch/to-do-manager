package com.example.backend.entity;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class Subtask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String status;
    private String description;
    private Integer taskId;

    public Subtask() {}

    public Subtask(String description, Integer taskId) {
        this.status = "open";
        this.description = description;
        this.taskId = taskId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getTaskId() {
        return taskId;
    }

    public void setTaskId(Integer taskId) {
        this.taskId = taskId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Subtask subtask = (Subtask) o;
        return Objects.equals(id, subtask.id) && Objects.equals(status, subtask.status) && Objects.equals(description, subtask.description) && Objects.equals(taskId, subtask.taskId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, status, description, taskId);
    }
}
