package com.ayrton.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PqrDto {
    private Long id;
    private String typePqr;
    private String title;
    private String description;
    private String argument;
    private String answer;
    private String state;
}
