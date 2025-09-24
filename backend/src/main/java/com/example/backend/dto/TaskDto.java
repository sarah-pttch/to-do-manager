package com.example.backend.dto;

import com.example.backend.entity.Subtask;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

public class TaskDto {
    private Integer id;
    private String status;
    private LocalDate creationDate;
    private LocalDate completionDate;
    private String title;
    private String category;
    private LocalDate deadline;
    private String notes;
    private List<Subtask> subtasks;

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

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getCompletionDate() {
        return completionDate;
    }

    public void setCompletionDate(LocalDate completionDate) {
        this.completionDate = completionDate;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public List<Subtask> getSubtasks() {
        return subtasks;
    }

    public void setSubtasks(List<Subtask> subtasks) {
        this.subtasks = subtasks;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TaskDto taskDto = (TaskDto) o;
        return Objects.equals(id, taskDto.id) && Objects.equals(status, taskDto.status) && Objects.equals(creationDate, taskDto.creationDate) && Objects.equals(completionDate, taskDto.completionDate) && Objects.equals(title, taskDto.title) && Objects.equals(category, taskDto.category) && Objects.equals(deadline, taskDto.deadline) && Objects.equals(notes, taskDto.notes) && Objects.equals(subtasks, taskDto.subtasks);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, status, creationDate, completionDate, title, category, deadline, notes, subtasks);
    }
}
