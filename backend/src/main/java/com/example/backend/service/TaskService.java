package com.example.backend.service;

import com.example.backend.dto.TaskDto;
import com.example.backend.dto.TaskMapper;
import com.example.backend.entity.Task;
import com.example.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public TaskDto createTask(TaskDto taskDto) {
        Task createdTask = taskRepository.save(TaskMapper.toEntity(taskDto));
        return TaskMapper.toDto(createdTask);
    }

    public Iterable<TaskDto> getAllTasks() {
        Iterable<Task> allTasks = taskRepository.findAll();
        return StreamSupport.stream(allTasks.spliterator(), false)
                .map(TaskMapper::toDto).collect(Collectors.toList());
    }

//    public TaskDto getTaskById(Integer id) {
//        Task task = taskRepository.findById(id).orElseThrow(() -> new ElementNotFoundException(id));
//        return TaskMapper.toDto(task);
//    }

    public TaskDto updateTask(Integer id, TaskDto taskDto) {
        Task inputTask = TaskMapper.toEntity(taskDto);
        Optional<Task> tempTask = taskRepository.findById(id);
        if(tempTask.isEmpty()) {
            return TaskMapper.toDto(taskRepository.save(inputTask));
        } else {
            inputTask.setId(id);
            return TaskMapper.toDto(taskRepository.save(inputTask));
        }
    }

    public void deleteTask(Integer id) {
        taskRepository.deleteById(id);
    }
}
