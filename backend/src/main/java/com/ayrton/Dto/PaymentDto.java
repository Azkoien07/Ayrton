package com.ayrton.Dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDto {
    private Long id;

    @NotNull(message = "El monto de la compra no puede ser nulo.")
    private double purchaseAmount;

    @NotNull(message = "El método de pago no puede ser nulo.")
    private String paymentMethod;

    // Relations
    @NotNull(message = "El usuario asociado al pago no puede ser nulo.")
    private UserDto user;

    @NotNull(message = "El voucher asociado al pago no puede ser nulo.")
    private VoucherDto voucher;
}