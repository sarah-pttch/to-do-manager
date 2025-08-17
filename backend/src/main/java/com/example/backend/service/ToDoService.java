package com.example.backend.service;

import com.example.backend.dto.ToDoDto;
import com.example.backend.dto.ToDoMapper;
import com.example.backend.entity.ToDo;
import com.example.backend.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ToDoService {

    private final ToDoRepository toDoRepository;

    @Autowired
    public ToDoService(ToDoRepository toDoRepository) {
        this.toDoRepository = toDoRepository;
    }

    public ToDoDto createToDo(ToDoDto toDoDto) {
        ToDo toDo = ToDoMapper.toEntity(toDoDto);
        ToDo createdToDo = toDoRepository.save(toDo);
        return ToDoMapper.toDto(createdToDo);
    }
}
