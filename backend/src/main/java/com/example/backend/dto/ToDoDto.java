package com.example.backend.dto;

import java.time.LocalDate;
import java.util.Objects;

public class ToDoDto {
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
        ToDoDto toDoDto = (ToDoDto) o;
        return Objects.equals(id, toDoDto.id) && Objects.equals(status, toDoDto.status) && Objects.equals(title, toDoDto.title) && Objects.equals(category, toDoDto.category) && Objects.equals(deadline, toDoDto.deadline) && Objects.equals(notes, toDoDto.notes);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, status, title, category, deadline, notes);
    }
}
