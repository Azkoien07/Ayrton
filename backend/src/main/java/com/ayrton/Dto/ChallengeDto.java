package com.ayrton.Dto;

import com.ayrton.Entity.ChallengeEntity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    @Enumerated(EnumType.STRING)
    @NotNull(message = "La categoria del desafio no puede ser nula")
    private ChallengeEntity.Category category;

    @NotNull(message = "El estado del desafío no puede ser nulo.")
    private String state;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "La dificultad del desafio no puede ser nula")
    private ChallengeEntity.Dificulty dificulty;

    // Relations
    @NotNull(message = "La tarea asociada al desafío no puede ser nula.")
    private TaskDto task;

    @NotNull(message = "El ranking asociado al desafío no puede ser nulo.")
    private RankingDto ranking;
}
