package com.example.backend.repository;

import com.example.backend.entity.Task;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;

public interface TaskRepository extends CrudRepository<Task, Integer> {
    Iterable<Task> findAllByStatus(String status);
    Iterable<Task> findAllByStatusAndDeadline(String status, LocalDate deadline);
}
