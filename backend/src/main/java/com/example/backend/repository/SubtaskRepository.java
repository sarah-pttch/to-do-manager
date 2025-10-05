package com.example.backend.repository;

import com.example.backend.entity.Subtask;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface SubtaskRepository extends CrudRepository<Subtask, Integer> {
    Iterable<Subtask> findAllByTaskId(Integer taskId);

    @Modifying
    @Transactional
    @Query("UPDATE Subtask x SET x.status = 'done' WHERE x.id = :subtaskId")
    void updateStatusById(@Param("subtaskId") Integer subtaskId);
}
