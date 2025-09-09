package com.example.backend.config;

import com.example.backend.entity.Category;
import com.example.backend.entity.ToDo;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.ToDoRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataLoader {

    private final ToDoRepository toDoRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public DataLoader(ToDoRepository toDoRepository, CategoryRepository categoryRepository) {
        this.toDoRepository = toDoRepository;
        this.categoryRepository = categoryRepository;
    }

    @PostConstruct
    private void loadData() {
        toDoRepository.save(new ToDo("Nr1", "Project A", LocalDate.of(2025, 8, 30), ""));
        toDoRepository.save(new ToDo("Nr2", "Urgent", LocalDate.of(2025, 8, 25), "to be finished urgently"));
        toDoRepository.save(new ToDo("Nr3", "Low priority", LocalDate.of(2025, 12, 5), "consult literature"));
        toDoRepository.save(new ToDo("Nr4", "Q1", LocalDate.of(2025, 9, 15), ""));
        toDoRepository.save(new ToDo("Nr5", "Q1", LocalDate.of(2025, 9, 17), "lalalalala"));

        categoryRepository.save(new Category("Urgent"));
        categoryRepository.save(new Category("Low priority"));
        categoryRepository.save(new Category("Q1"));
        categoryRepository.save(new Category("Project A"));
    }
}
