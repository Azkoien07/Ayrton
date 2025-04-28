package com.ayrton.Dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto {
    private Long id;

    @NotNull(message = "El nombre de la tarea no puede ser nulo.")
    private String name;

    @NotNull(message = "La descripción de la tarea no puede ser nula.")
    private String description;

    @NotNull(message = "El estado de la tarea no puede ser nulo.")
    private String state;

    // Relations
    @NotNull(message = "El usuario asociado a la tarea no puede ser nulo.")
    private UserDto user;

    @NotNull(message = "El desafío asociado a la tarea no puede ser nulo.")
    private ChallengeDto challenge;
}
