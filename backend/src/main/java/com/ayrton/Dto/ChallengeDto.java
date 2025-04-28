package com.ayrton.Dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChallengeDto {
    private Long id;

    @NotNull(message = "El nombre del desafío no puede ser nulo.")
    private String name;

    @NotNull(message = "La descripción del desafío no puede ser nula.")
    private String description;

    @NotNull(message = "El estado del desafío no puede ser nulo.")
    private String state;

    // Relations
    @NotNull(message = "La tarea asociada al desafío no puede ser nula.")
    private TaskDto task;

    @NotNull(message = "El ranking asociado al desafío no puede ser nulo.")
    private RankingDto ranking;
}
