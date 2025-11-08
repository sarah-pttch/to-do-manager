package com.example.backend.dto;

import com.example.backend.entity.Reminder;

public class ReminderMapper {

    public static ReminderDto toDto(Reminder reminder) {
        ReminderDto dto = new ReminderDto();
        dto.setId(reminder.getId());
        dto.setReminderDate(reminder.getReminderDate());
        dto.setTaskId(reminder.getTaskId());
        dto.setTaskTitle(reminder.getTaskTitle());
        dto.setTaskDeadline(reminder.getTaskDeadline());
        return dto;
    }

    public static Reminder toEntity(ReminderDto dto) {
        Reminder reminder = new Reminder();
        reminder.setReminderDate(dto.getReminderDate());
        reminder.setTaskId(dto.getTaskId());
        reminder.setTaskTitle(dto.getTaskTitle());
        reminder.setTaskDeadline(dto.getTaskDeadline());
        return reminder;
    }
}
