package com.example.backend.dto;

import com.example.backend.entity.ToDo;

public class ToDoMapper {

    public static ToDoDto toDto(ToDo toDo) {
        ToDoDto dto = new ToDoDto();
        dto.setId(toDo.getId());
        dto.setStatus(toDo.getStatus());
        dto.setTitle(toDo.getTitle());
        dto.setCategory(toDo.getCategory());
        dto.setDeadline(toDo.getDeadline());
        dto.setNotes(toDo.getNotes());
        return dto;
    }

    public static ToDo toEntity(ToDoDto dto) {
        ToDo toDo = new ToDo();
        toDo.setStatus(dto.getStatus());
        toDo.setTitle(dto.getTitle());
        toDo.setCategory(dto.getCategory());
        toDo.setDeadline(dto.getDeadline());
        toDo.setNotes(dto.getNotes());
        return toDo;
    }
}
