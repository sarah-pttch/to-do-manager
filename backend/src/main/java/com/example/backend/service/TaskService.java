package com.example.backend.service;

import com.example.backend.dto.Statistics;
import com.example.backend.dto.TaskDto;
import com.example.backend.dto.TaskMapper;
import com.example.backend.entity.Task;
import com.example.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Collection;
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
        taskDto.setStatus("open");
        taskDto.setCreationDate(LocalDate.now());
        Task createdTask = taskRepository.save(TaskMapper.toEntity(taskDto));
        return TaskMapper.toDto(createdTask);
    }

    public TaskDto createLongtermTask(TaskDto taskDto) {
        taskDto.setStatus("open");
        taskDto.setCreationDate(LocalDate.now());
        taskDto.setDeadline(null);
        Task createdTask = taskRepository.save(TaskMapper.toEntity(taskDto));
        return TaskMapper.toDto(createdTask);
    }

    public Iterable<TaskDto> getAllTasks() {
        Iterable<Task> allTasks = taskRepository.findAll();
        return StreamSupport.stream(allTasks.spliterator(), false)
                .map(TaskMapper::toDto).collect(Collectors.toList());
    }

    public Iterable<TaskDto> getAllOpenTasks() {
        Iterable<Task> allOpenTasks = taskRepository.findAllByStatus("open");
        return StreamSupport.stream(allOpenTasks.spliterator(), false)
                .filter((task) -> task.getDeadline() != null)
                .map(TaskMapper::toDto).collect(Collectors.toList());
    }

    public Iterable<TaskDto> getAllCompletedTasks() {
        Iterable<Task> allCompletedTasks = taskRepository.findAllByStatus("done");
        return StreamSupport.stream(allCompletedTasks.spliterator(), false)
                .map(TaskMapper::toDto).collect(Collectors.toList());
    }

    public Iterable<TaskDto> getAllLongtermTasks() {
        Iterable<Task> allLongtermTasks = taskRepository.findAllByStatusAndDeadline("open", null);
        return StreamSupport.stream(allLongtermTasks.spliterator(), false)
                .map(TaskMapper::toDto).collect(Collectors.toList());
    }

    public TaskDto updateTask(Integer id, TaskDto taskDto) {
        if(taskDto.getStatus().equals("done")) {
            taskDto.setCompletionDate(LocalDate.now());
        }
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

    public Statistics getStatistics() {
        Iterable<Task> allTasks = taskRepository.findAll();
        Iterable<Task> allCompletedTasks = taskRepository.findAllByStatus("done");
        Integer numberTasks = ((Collection<?>) allTasks).size();
        Integer numberCompletedTasks = ((Collection<?>) allCompletedTasks).size();
        Long totalDays = 0L;
        Integer numberInTime = 0;
        for (Task task : allCompletedTasks) {
            totalDays += task.getCreationDate().until(task.getCompletionDate(), ChronoUnit.DAYS);
            if (task.getCompletionDate().isBefore(task.getDeadline()) || task.getCompletionDate().isEqual(task.getDeadline())) {
                numberInTime++;
            }
        }
        return new Statistics(numberTasks, numberCompletedTasks, totalDays, numberInTime);
    }
}
