package com.example.backend.repository;

import com.example.backend.entity.Subtask;
import org.springframework.data.repository.CrudRepository;

public interface SubtaskRepository extends CrudRepository<Subtask, Integer> {
    Iterable<Subtask> findAllByTaskId(Integer taskId);
}
