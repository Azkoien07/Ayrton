package com.ayrton.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlanDto {
    private Long id;
    private String name;
    private String description;
    private double price;
    private boolean state;
    private int duration;
}
