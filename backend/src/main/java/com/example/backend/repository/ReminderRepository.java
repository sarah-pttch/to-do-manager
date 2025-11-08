package com.example.backend.repository;

import com.example.backend.entity.Reminder;
import org.springframework.data.repository.CrudRepository;

public interface ReminderRepository extends CrudRepository<Reminder, Integer> {
}
