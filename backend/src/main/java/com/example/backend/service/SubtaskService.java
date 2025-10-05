package com.example.backend.service;

import com.example.backend.dto.SubtaskDto;
import com.example.backend.dto.SubtaskMapper;
import com.example.backend.entity.Subtask;
import com.example.backend.repository.SubtaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class SubtaskService {

    private final SubtaskRepository subtaskRepository;

    @Autowired
    public SubtaskService(SubtaskRepository subtaskRepository) {
        this.subtaskRepository = subtaskRepository;
    }

    public SubtaskDto createSubtask(SubtaskDto subtaskDto) {
        subtaskDto.setStatus("open");
        Subtask createdSubtask = subtaskRepository.save(SubtaskMapper.toEntity(subtaskDto));
        return SubtaskMapper.toDto(createdSubtask);
    }

    public Iterable<SubtaskDto> getSubtasksByTaskId(Integer taskId) {
        Iterable<Subtask> subtasks = subtaskRepository.findAllByTaskId(taskId);
        return StreamSupport.stream(subtasks.spliterator(), false)
                .map(SubtaskMapper::toDto).collect(Collectors.toList());
    }

    public void checkOffSubtask(Integer subtaskId) {
        subtaskRepository.updateStatusById(subtaskId);
    }
}
