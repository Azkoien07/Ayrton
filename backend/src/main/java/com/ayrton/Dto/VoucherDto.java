package com.ayrton.Dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoucherDto {
    private Long id;

    @NotNull(message = "El código del voucher no puede ser nulo.")
    private String code;

    // Relations
    @NotNull(message = "El pago asociado al voucher no puede ser nulo.")
    private PaymentDto payment;
}
