package com.example.backend.config;

import com.example.backend.entity.Category;
import com.example.backend.entity.Subtask;
import com.example.backend.entity.Task;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.SubtaskRepository;
import com.example.backend.repository.TaskRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataLoader {

    private final TaskRepository taskRepository;
    private final CategoryRepository categoryRepository;
    private final SubtaskRepository subtaskRepository;

    @Autowired
    public DataLoader(TaskRepository taskRepository, CategoryRepository categoryRepository, SubtaskRepository subtaskRepository) {
        this.taskRepository = taskRepository;
        this.categoryRepository = categoryRepository;
        this.subtaskRepository = subtaskRepository;
    }

    @PostConstruct
    private void loadData() {
        taskRepository.save(new Task("Nr1", "Project A", LocalDate.of(2025, 10, 30), ""));
        taskRepository.save(new Task("Nr2", "Urgent", LocalDate.of(2025, 10, 25), "to be finished urgently"));
        taskRepository.save(new Task("Nr3", "Low priority", LocalDate.of(2025, 12, 5), "consult literature"));
        taskRepository.save(new Task("Nr4", "Q1", LocalDate.of(2025, 10, 15), ""));
        taskRepository.save(new Task("Nr5", "Q1", LocalDate.of(2025, 10, 17), "lalalalala"));

        categoryRepository.save(new Category("Urgent"));
        categoryRepository.save(new Category("Low priority"));
        categoryRepository.save(new Category("Q1"));
        categoryRepository.save(new Category("Project A"));
        categoryRepository.save(new Category("Idea"));

        taskRepository.save(new Task("Idea1", "Idea", null, "this is not urgent"));
        taskRepository.save(new Task("Idea2", "Idea", null, "interesting to research, check for literature, case studies, etc., align with teamlead regarding budget"));
        taskRepository.save(new Task("Idea3", "Idea", null, "look into this"));

        Task task = taskRepository.save(new Task("Nr6", "Project A", LocalDate.of(2025, 11, 30), ""));
        subtaskRepository.save(new Subtask("Fire", task.getId()));
        subtaskRepository.save(new Subtask("Water", task.getId()));
        subtaskRepository.save(new Subtask("Sand", task.getId()));
    }
}
