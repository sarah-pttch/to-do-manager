package com.example.backend.controller;

import com.example.backend.dto.ToDoDto;
import com.example.backend.service.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/todos")
public class ToDoController {

    @Autowired
    ToDoService toDoService;

    @PostMapping
    public ResponseEntity<ToDoDto> createToDo(@RequestBody ToDoDto toDoDto) {
        System.out.println("method is running");
        return new ResponseEntity<>(toDoService.createToDo(toDoDto), HttpStatus.CREATED);
    }
}
