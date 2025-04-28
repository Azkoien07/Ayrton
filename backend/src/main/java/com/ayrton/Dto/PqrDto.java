package com.ayrton.Dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PqrDto {
    private Long id;

    @NotNull(message = "El tipo de PQR no puede ser nulo.")
    private String typePqr;

    @NotNull(message = "El título de la PQR no puede ser nulo.")
    private String title;

    @NotNull(message = "La descripción de la PQR no puede ser nula.")
    private String description;

    @NotNull(message = "El argumento de la PQR no puede ser nulo.")
    private String argument;

    @NotNull(message = "La respuesta de la PQR no puede ser nula.")
    private String answer;

    @NotNull(message = "El estado de la PQR no puede ser nulo.")
    private String state;

    // Relations
    @NotNull(message = "El usuario asociado a la PQR no puede ser nulo.")
    private UserDto user;
}