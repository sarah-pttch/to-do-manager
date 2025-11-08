package com.example.backend.dto;

import java.time.LocalDate;
import java.util.Objects;

public class ReminderDto {
    private Integer id;
    private LocalDate reminderDate;
    private Integer taskId;
    private String taskTitle;
    private LocalDate taskDeadline;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDate getReminderDate() {
        return reminderDate;
    }

    public void setReminderDate(LocalDate reminderDate) {
        this.reminderDate = reminderDate;
    }

    public Integer getTaskId() {
        return taskId;
    }

    public void setTaskId(Integer taskId) {
        this.taskId = taskId;
    }

    public String getTaskTitle() {
        return taskTitle;
    }

    public void setTaskTitle(String taskTitle) {
        this.taskTitle = taskTitle;
    }

    public LocalDate getTaskDeadline() {
        return taskDeadline;
    }

    public void setTaskDeadline(LocalDate taskDeadline) {
        this.taskDeadline = taskDeadline;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReminderDto that = (ReminderDto) o;
        return Objects.equals(id, that.id) && Objects.equals(reminderDate, that.reminderDate) && Objects.equals(taskId, that.taskId) && Objects.equals(taskTitle, that.taskTitle) && Objects.equals(taskDeadline, that.taskDeadline);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, reminderDate, taskId, taskTitle, taskDeadline);
    }
}
