package com.ayrton.Dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long id;

    @NotNull(message = "El nombre no puede ser nulo")
    private String name;

    @NotNull(message = "El correo electrónico no puede ser nulo.")
    private String email;

    @NotNull(message = "La contrasña del usuario no puede ser nula")
    private String password;

    @NotNull(message = "El nombre de usuario no puede ser nulo.")
    private String username;

    // Relations
    private TaskDto task;

    private Long roleId;

    private PaymentDto payment;

    private PqrDto pqr;

    private Long planId;

}
