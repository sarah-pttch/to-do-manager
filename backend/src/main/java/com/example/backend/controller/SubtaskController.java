package com.example.backend.controller;

import com.example.backend.dto.SubtaskDto;
import com.example.backend.service.SubtaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/subtasks")
public class SubtaskController {

    @Autowired
    SubtaskService subtaskService;

    @PostMapping
    public ResponseEntity<SubtaskDto> createSubtask(@RequestBody SubtaskDto subtaskDto) {
        return new ResponseEntity<>(subtaskService.createSubtask(subtaskDto), HttpStatus.CREATED);
    }
}
