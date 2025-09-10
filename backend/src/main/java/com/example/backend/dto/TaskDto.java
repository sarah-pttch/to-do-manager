package com.example.backend.dto;

import java.time.LocalDate;
import java.util.Objects;

public class TaskDto {
    private Integer id;
    private String status;
    private String title;
    private String category;
    private LocalDate deadline;
    private String notes;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TaskDto taskDto = (TaskDto) o;
        return Objects.equals(id, taskDto.id) && Objects.equals(status, taskDto.status) && Objects.equals(title, taskDto.title) && Objects.equals(category, taskDto.category) && Objects.equals(deadline, taskDto.deadline) && Objects.equals(notes, taskDto.notes);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, status, title, category, deadline, notes);
    }
}
