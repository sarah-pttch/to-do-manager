package com.example.backend.config;

import com.example.backend.entity.Category;
import com.example.backend.entity.Subtask;
import com.example.backend.entity.Task;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.TaskRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@Component
public class DataLoader {

    private final TaskRepository taskRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public DataLoader(TaskRepository taskRepository, CategoryRepository categoryRepository) {
        this.taskRepository = taskRepository;
        this.categoryRepository = categoryRepository;
    }

    @PostConstruct
    private void loadData() {
        taskRepository.save(new Task("Nr1", "Project A", LocalDate.of(2025, 9, 30), "", Collections.emptyList()));
        taskRepository.save(new Task("Nr2", "Urgent", LocalDate.of(2025, 9, 25), "to be finished urgently", Collections.emptyList()));
        taskRepository.save(new Task("Nr3", "Low priority", LocalDate.of(2025, 12, 5), "consult literature", Collections.emptyList()));
        taskRepository.save(new Task("Nr4", "Q1", LocalDate.of(2025, 10, 15), "", Collections.emptyList()));
        taskRepository.save(new Task("Nr5", "Q1", LocalDate.of(2025, 10, 17), "lalalalala", Collections.emptyList()));

        categoryRepository.save(new Category("Urgent"));
        categoryRepository.save(new Category("Low priority"));
        categoryRepository.save(new Category("Q1"));
        categoryRepository.save(new Category("Project A"));

        Task task = new Task("Nr6", "Project A", LocalDate.of(2025, 9, 30), "", Collections.emptyList());
        Subtask fire = new Subtask("Fire", task);
        Subtask water = new Subtask("Water", task);
        Subtask sand = new Subtask("Sand", task);
        task.setSubtasks(List.of(fire, water, sand));
        taskRepository.save(task);
    }
}
