package com.example.backend.repository;

import com.example.backend.entity.ToDo;
import org.springframework.data.repository.CrudRepository;

public interface ToDoRepository extends CrudRepository<ToDo, Integer> {
}
