package com.ayrton.Dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RankingDto {
    private Long id;

    @NotNull(message = "El nivel no puede ser nulo.")
    private int level;

    @NotNull(message = "La posición no puede ser nula.")
    private int position;

    // Relations
    @NotNull(message = "El desafío asociado al ranking no puede ser nulo.")
    private ChallengeDto challenge;
}
