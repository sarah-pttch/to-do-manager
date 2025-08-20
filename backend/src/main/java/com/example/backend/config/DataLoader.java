package com.example.backend.config;

import com.example.backend.entity.ToDo;
import com.example.backend.repository.ToDoRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataLoader {

    private final ToDoRepository toDoRepository;

    @Autowired
    public DataLoader(ToDoRepository toDoRepository) {
        this.toDoRepository = toDoRepository;
    }

    @PostConstruct
    private void loadData() {
        toDoRepository.save(new ToDo("Nr1", "Important", LocalDate.of(2025, 8, 30)));
        toDoRepository.save(new ToDo("Nr2", "Urgent", LocalDate.of(2025, 8, 25)));
        toDoRepository.save(new ToDo("Nr3", "LowPrio", LocalDate.of(2025, 12, 5)));
        toDoRepository.save(new ToDo("Nr4", "Sprint1", LocalDate.of(2025, 9, 15)));
        toDoRepository.save(new ToDo("Nr5", "Sprint1", LocalDate.of(2025, 9, 17)));
    }
}
