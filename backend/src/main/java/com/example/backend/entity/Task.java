package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.time.LocalDate;
import java.util.Objects;

@Entity
public class Task {
    @Id
    @GeneratedValue
    private Integer id;
    private String status;
    private String title;
    private String category;
    private LocalDate deadline;
    private String notes;

    public Task() {}

    public Task(String title, String category, LocalDate deadline, String notes) {
        this.status = "open";
        this.title = title;
        this.category = category;
        this.deadline = deadline;
        this.notes = notes;
    }

    public Task(String status, String title, String category, LocalDate deadline, String notes) {
        this.status = status;
        this.title = title;
        this.category = category;
        this.deadline = deadline;
        this.notes = notes;
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
        Task task = (Task) o;
        return Objects.equals(id, task.id) && Objects.equals(status, task.status) && Objects.equals(title, task.title) && Objects.equals(category, task.category) && Objects.equals(deadline, task.deadline) && Objects.equals(notes, task.notes);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, status, title, category, deadline, notes);
    }
}
