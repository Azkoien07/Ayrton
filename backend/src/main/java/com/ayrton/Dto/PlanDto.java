package com.ayrton.Dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlanDto {
    private Long id;

    @NotNull(message = "El nombre del plan no puede ser nulo.")
    private String name;

    @NotNull(message = "La descripción del plan no puede ser nula.")
    private String description;

    @NotNull(message = "El precio del plan no puede ser nulo.")
    private double price;

    @NotNull(message = "El estado del plan no puede ser nulo.")
    private boolean state;

    @NotNull(message = "La duración del plan no puede ser nula.")
    private int duration;

    // Relations
    @NotNull(message = "El usuario asociado al plan no puede ser nulo.")
    private UserDto user;
}