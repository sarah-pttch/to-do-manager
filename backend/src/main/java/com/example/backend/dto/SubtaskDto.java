package com.example.backend.dto;

import com.example.backend.entity.Task;

import java.util.Objects;

public class SubtaskDto {
    private Integer id;
    private String status;
    private String description;
    private Task task;

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

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SubtaskDto that = (SubtaskDto) o;
        return Objects.equals(id, that.id) && Objects.equals(status, that.status) && Objects.equals(description, that.description) && Objects.equals(task, that.task);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, status, description, task);
    }

    @Override
    public String toString() {
        return "SubtaskDto{" +
                "id=" + id +
                ", status='" + status + '\'' +
                ", description='" + description + '\'' +
                ", task=" + task +
                '}';
    }
}
