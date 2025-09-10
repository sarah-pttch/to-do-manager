package com.example.backend.dto;

import com.example.backend.entity.Task;

public class TaskMapper {

    public static TaskDto toDto(Task task) {
        TaskDto dto = new TaskDto();
        dto.setId(task.getId());
        dto.setStatus(task.getStatus());
        dto.setTitle(task.getTitle());
        dto.setCategory(task.getCategory());
        dto.setDeadline(task.getDeadline());
        dto.setNotes(task.getNotes());
        return dto;
    }

    public static Task toEntity(TaskDto dto) {
        Task task = new Task();
        task.setStatus(dto.getStatus());
        task.setTitle(dto.getTitle());
        task.setCategory(dto.getCategory());
        task.setDeadline(dto.getDeadline());
        task.setNotes(dto.getNotes());
        return task;
    }
}
