package com.ayrton.Dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoleDto {
    private Long id;

    @NotNull(message = "El nombre del rol no puede ser nulo.")
    private String name;

    @NotNull(message = "El nivel de acceso no puede ser nulo.")
    private int accessLevel;

    // Relations
    @NotNull(message = "El usuario asociado al rol no puede ser nulo.")
    private UserDto user;
}