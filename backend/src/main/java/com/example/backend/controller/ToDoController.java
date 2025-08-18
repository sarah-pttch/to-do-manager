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
        return new ResponseEntity<>(toDoService.createToDo(toDoDto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Iterable<ToDoDto>> getAllToDos() {
        return new ResponseEntity<>(toDoService.getAllToDos(), HttpStatus.OK);
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<ToDoDto> getToDoById(@PathVariable Integer id) {
//        return new ResponseEntity<>(toDoService.getToDoById(id), HttpStatus.FOUND);
//    }

    @PutMapping("/{id}")
    public ResponseEntity<ToDoDto> updateToDo(@PathVariable Integer id, @RequestBody ToDoDto toDoDto) {
        return new ResponseEntity<>(toDoService.updateToDo(id, toDoDto), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteToDo(@PathVariable Integer id) {
        toDoService.deleteToDo(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
