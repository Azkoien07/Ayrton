package com.ayrton.Auth.Dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class LoginDto {
    private String email;
    private String password;
}
