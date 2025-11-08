package com.example.backend.service;

import com.example.backend.dto.ReminderDto;
import com.example.backend.dto.ReminderMapper;
import com.example.backend.entity.Reminder;
import com.example.backend.repository.ReminderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ReminderService {

    private final ReminderRepository reminderRepository;

    @Autowired
    public ReminderService(ReminderRepository reminderRepository) {
        this.reminderRepository = reminderRepository;
    }

    public ReminderDto createReminder(ReminderDto reminderDto) {
        Reminder reminder = reminderRepository.save(ReminderMapper.toEntity(reminderDto));
        return ReminderMapper.toDto(reminder);
    }

    public Iterable<ReminderDto> getReminders() {
        Iterable<Reminder> allReminders = reminderRepository.findAll();
        Iterable<Reminder> filteredReminders = StreamSupport.stream(allReminders.spliterator(), false).filter(reminder -> reminder.getReminderDate().isBefore(LocalDate.now()) || reminder.getReminderDate().isEqual(LocalDate.now())).collect(Collectors.toList());
        return StreamSupport.stream(filteredReminders.spliterator(), false)
                .map(ReminderMapper::toDto).collect(Collectors.toList());
    }

    public void deleteReminder(Integer reminderId) {
        reminderRepository.deleteById(reminderId);
    }
}
