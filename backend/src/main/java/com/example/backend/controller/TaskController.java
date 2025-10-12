package com.example.backend.controller;

import com.example.backend.dto.TaskDto;
import com.example.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskDto> createTask(@RequestBody TaskDto taskDto) {
        return new ResponseEntity<>(taskService.createTask(taskDto), HttpStatus.CREATED);
    }

    @PostMapping("/longterm")
    public ResponseEntity<TaskDto> createLongtermTask(@RequestBody TaskDto taskDto) {
        return new ResponseEntity<>(taskService.createLongtermTask(taskDto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Iterable<TaskDto>> getAllOpenTasks() {
        return new ResponseEntity<>(taskService.getAllOpenTasks(), HttpStatus.OK);
    }

    @GetMapping("/completed")
    public ResponseEntity<Iterable<TaskDto>> getAllCompletedTasks() {
        return new ResponseEntity<>(taskService.getAllCompletedTasks(), HttpStatus.OK);
    }

    @GetMapping("/longterm")
    public ResponseEntity<Iterable<TaskDto>> getAllLongtermTasks() {
        return new ResponseEntity<>(taskService.getAllLongtermTasks(), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDto> updateTask(@PathVariable Integer id, @RequestBody TaskDto taskDto) {
        return new ResponseEntity<>(taskService.updateTask(id, taskDto), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Integer id) {
        taskService.deleteTask(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
