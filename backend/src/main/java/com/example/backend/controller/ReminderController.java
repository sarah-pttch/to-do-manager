package com.example.backend.controller;

import com.example.backend.dto.ReminderDto;
import com.example.backend.service.ReminderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/reminders")
public class ReminderController {

    @Autowired
    ReminderService reminderService;

    @PostMapping
    public ResponseEntity<ReminderDto> createReminder(@RequestBody ReminderDto reminderDto) {
        return new ResponseEntity<>(reminderService.createReminder(reminderDto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Iterable<ReminderDto>> getReminders() {
        return new ResponseEntity<>(reminderService.getReminders(), HttpStatus.OK);
    }

    @DeleteMapping("/{reminderId}")
    public ResponseEntity<Void> deleteReminder(@PathVariable Integer reminderId) {
        reminderService.deleteReminder(reminderId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
