package com.example.backend.dto;

public record Statistics(
    Integer numberTasks,
    Integer numberCompletedTasks,
    Long totalDays,
    Integer numberInTime,
    Double averageDaysSurpassed
) {}
