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

    // creates new task
    public TaskDto createTask(TaskDto taskDto) {
        taskDto.setStatus("open");
        taskDto.setCreationDate(LocalDate.now());
        Task createdTask = taskRepository.save(TaskMapper.toEntity(taskDto));
        return TaskMapper.toDto(createdTask);
    }

    // creates longterm task without deadline
    public TaskDto createLongtermTask(TaskDto taskDto) {
        taskDto.setStatus("open");
        taskDto.setCreationDate(LocalDate.now());
        taskDto.setDeadline(null);
        Task createdTask = taskRepository.save(TaskMapper.toEntity(taskDto));
        return TaskMapper.toDto(createdTask);
    }

    // retrieves all tasks
    public Iterable<TaskDto> getAllTasks() {
        Iterable<Task> allTasks = taskRepository.findAll();
        return StreamSupport.stream(allTasks.spliterator(), false)
                .map(TaskMapper::toDto).collect(Collectors.toList());
    }

    // retrieves all open tasks with deadline
    public Iterable<TaskDto> getAllOpenTasks() {
        Iterable<Task> allOpenTasks = taskRepository.findAllByStatus("open");
        return StreamSupport.stream(allOpenTasks.spliterator(), false)
                .filter((task) -> task.getDeadline() != null)
                .map(TaskMapper::toDto).collect(Collectors.toList());
    }

    // retrieves all completed tasks
    public Iterable<TaskDto> getAllCompletedTasks() {
        Iterable<Task> allCompletedTasks = taskRepository.findAllByStatus("done");
        return StreamSupport.stream(allCompletedTasks.spliterator(), false)
                .map(TaskMapper::toDto).collect(Collectors.toList());
    }

    // retrieves all longterm tasks without deadline
    public Iterable<TaskDto> getAllLongtermTasks() {
        Iterable<Task> allLongtermTasks = taskRepository.findAllByStatusAndDeadline("open", null);
        return StreamSupport.stream(allLongtermTasks.spliterator(), false)
                .map(TaskMapper::toDto).collect(Collectors.toList());
    }

    // updates an existing task
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

    // deletes a task
    public void deleteTask(Integer id) {
        taskRepository.deleteById(id);
    }

    public Statistics getStatistics() {
        Iterable<Task> allTasks = taskRepository.findAll();
        Iterable<Task> allDeadlineTasks = StreamSupport.stream(allTasks.spliterator(), false)
                .filter((task) -> task.getDeadline() != null)
                .collect(Collectors.toList());
        Iterable<Task> allCompletedTasks = taskRepository.findAllByStatus("done");
        Iterable<Task> allCompletedDeadlineTasks = StreamSupport.stream(allCompletedTasks.spliterator(), false)
                .filter((task) -> task.getDeadline() != null)
                .collect(Collectors.toList());
        Integer numberDeadlineTasks = ((Collection<?>) allDeadlineTasks).size();
        Integer numberCompletedDeadlineTasks = ((Collection<?>) allCompletedDeadlineTasks).size();
        Long totalDays = 0L;
        Integer numberInTime = 0;
        Long daysSurpassed = 0L;
        for (Task task : allCompletedDeadlineTasks) {
            totalDays += task.getCreationDate().until(task.getCompletionDate(), ChronoUnit.DAYS);
            if (task.getCompletionDate().isBefore(task.getDeadline()) || task.getCompletionDate().isEqual(task.getDeadline())) {
                numberInTime++;
            } else {
                daysSurpassed += task.getDeadline().until(task.getCompletionDate(), ChronoUnit.DAYS);
            }
        }
        Double averageDaysSurpassed = (double) daysSurpassed / (numberCompletedDeadlineTasks - numberInTime);
        return new Statistics(numberDeadlineTasks, numberCompletedDeadlineTasks, totalDays, numberInTime, averageDaysSurpassed);
    }
}
