package com.example.backend.dto;

import com.example.backend.entity.Subtask;

public class SubtaskMapper {

    public static SubtaskDto toDto(Subtask subtask) {
        SubtaskDto dto = new SubtaskDto();
        dto.setId(subtask.getId());
        dto.setStatus(subtask.getStatus());
        dto.setDescription(subtask.getDescription());
        dto.setTaskId(subtask.getTaskId());
        return dto;
    }

    public static Subtask toEntity(SubtaskDto dto) {
        Subtask subtask = new Subtask();
        subtask.setStatus(dto.getStatus());
        subtask.setDescription(dto.getDescription());
        subtask.setTaskId(dto.getTaskId());
        return subtask;
    }
}
