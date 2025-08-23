package com.example.backend.service;

import com.example.backend.dto.ToDoDto;
import com.example.backend.dto.ToDoMapper;
import com.example.backend.entity.ToDo;
import com.example.backend.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ToDoService {

    private final ToDoRepository toDoRepository;

    @Autowired
    public ToDoService(ToDoRepository toDoRepository) {
        this.toDoRepository = toDoRepository;
    }

    public ToDoDto createToDo(ToDoDto toDoDto) {
        ToDo createdToDo = toDoRepository.save(ToDoMapper.toEntity(toDoDto));
        return ToDoMapper.toDto(createdToDo);
    }

    public Iterable<ToDoDto> getAllToDos() {
        Iterable<ToDo> allToDos = toDoRepository.findAll();
        return StreamSupport.stream(allToDos.spliterator(), false)
                .map(ToDoMapper::toDto).collect(Collectors.toList());
    }

//    public ToDoDto getToDoById(Integer id) {
//        ToDo toDo = toDoRepository.findById(id).orElseThrow(() -> new ElementNotFoundException(id));
//        return ToDoMapper.toDto(toDo);
//    }

    public ToDoDto updateToDo(Integer id, ToDoDto toDoDto) {
        toDoDto.setStatus("open");
        ToDo inputToDo = ToDoMapper.toEntity(toDoDto);
        Optional<ToDo> tempToDo = toDoRepository.findById(id);
        if(tempToDo.isEmpty()) {
            return ToDoMapper.toDto(toDoRepository.save(inputToDo));
        } else {
            inputToDo.setId(id);
            return ToDoMapper.toDto(toDoRepository.save(inputToDo));
        }
    }

    public void deleteToDo(Integer id) {
        toDoRepository.deleteById(id);
    }
}
