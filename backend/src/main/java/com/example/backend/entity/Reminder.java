package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;
import java.util.Objects;

@Entity
public class Reminder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private LocalDate reminderDate;
    private Integer taskId;
    private String taskTitle;
    private LocalDate taskDeadline;

    public Reminder() {}

    public Reminder(LocalDate reminderDate, Integer taskId, String taskTitle, LocalDate taskDeadline) {
        this.reminderDate = reminderDate;
        this.taskId = taskId;
        this.taskTitle = taskTitle;
        this.taskDeadline = taskDeadline;
    }

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
        Reminder reminder = (Reminder) o;
        return Objects.equals(id, reminder.id) && Objects.equals(reminderDate, reminder.reminderDate) && Objects.equals(taskId, reminder.taskId) && Objects.equals(taskTitle, reminder.taskTitle) && Objects.equals(taskDeadline, reminder.taskDeadline);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, reminderDate, taskId, taskTitle, taskDeadline);
    }
}
