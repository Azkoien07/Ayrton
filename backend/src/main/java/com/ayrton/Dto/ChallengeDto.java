package com.ayrton.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChallengeDto {
    private Long id;
    private String name;
    private String description;
    private String state;
}
