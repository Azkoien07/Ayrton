package com.ayrton.Dto;

import com.ayrton.Entity.TaskEntity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto {
    private Long id;

    @NotNull(message = "El nombre de la tarea no puede ser nulo.")
    private String name;

    @NotNull(message = "La descripción de la tarea no puede ser nula.")
    private String description;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "La prioridad de la tarea no puede ser nula.")
    private TaskEntity.Priority Priority;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "El tipo de tarea no puede ser nulo.")
    private TaskEntity.TypeTask TypeTask;

    @NotNull(message = "El estado de la tarea no puede ser nulo.")
    private Boolean state;

    private LocalDateTime fCreation;

    @NotNull(message = "La fecha de expiración no puede ser nula.")
    private LocalDateTime fExpiration;

    private LocalDateTime reminder;

    // Relations
    @NotNull(message = "El usuario asociado a la tarea no puede ser nulo.")
    private UserDto user;

    @NotNull(message = "El desafío asociado a la tarea no puede ser nulo.")
    private ChallengeDto challenge;
}
