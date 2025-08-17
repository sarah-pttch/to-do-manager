package com.example.backend.dto;

import com.example.backend.entity.ToDo;

public class ToDoMapper {

    public static ToDoDto toDto(ToDo toDo) {
        ToDoDto dto = new ToDoDto();
        dto.setId(toDo.getId());
        dto.setTitle(toDo.getTitle());
        dto.setCategory(toDo.getCategory());
        dto.setDeadline(toDo.getDeadline());
        return dto;
    }

    public static ToDo toEntity(ToDoDto dto) {
        ToDo toDo = new ToDo();
        toDo.setTitle(dto.getTitle());
        toDo.setCategory(dto.getCategory());
        toDo.setDeadline(dto.getDeadline());
        return toDo;
    }
}
