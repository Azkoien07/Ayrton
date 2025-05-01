package com.ayrton.Auth.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponseDto {
    private String token;  // Token JWT generado
    private String message; // Opcional: mensaje de éxito/error

}