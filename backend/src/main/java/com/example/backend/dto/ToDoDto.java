package com.example.backend.dto;

import java.util.Date;
import java.util.Objects;

public class ToDoDto {
    private Integer id;
    private String title;
    private String category;
    private Date deadline;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ToDoDto toDoDto = (ToDoDto) o;
        return Objects.equals(id, toDoDto.id) && Objects.equals(title, toDoDto.title) && Objects.equals(category, toDoDto.category) && Objects.equals(deadline, toDoDto.deadline);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, category, deadline);
    }
}
