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

    @NotNull(message = "El nombre de usuario no puede ser nulo.")
    private String username;

    @NotNull(message = "El correo electrónico no puede ser nulo.")
    private String email;

    // Relations
    @NotNull(message = "La tarea asociada al usuario no puede ser nula.")
    private TaskDto task;

    @NotNull(message = "El rol asociado al usuario no puede ser nulo.")
    private RoleDto role;

    @NotNull(message = "El pago asociado al usuario no puede ser nulo.")
    private PaymentDto payment;

    @NotNull(message = "La PQR asociada al usuario no puede ser nula.")
    private PqrDto pqr;

    @NotNull(message = "El plan asociado al usuario no puede ser nulo.")
    private PlanDto plan;
}
