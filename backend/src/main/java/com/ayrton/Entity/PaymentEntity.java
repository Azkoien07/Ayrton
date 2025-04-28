package com.ayrton.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "payments")
public class PaymentEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public enum PaymentMethod {
        TarjetaCredito,
        TarjetaDebito,
        Paypal
    }
    // Columns
    @Column(name = "purchase_amount", nullable = false)
    private double purchaseAmount;

    @Enumerated(EnumType.STRING)
    @NotNull
    private PaymentMethod paymentMethod;

    @CreationTimestamp
    @Column(name = "payment_date", updatable = false)
    private LocalDateTime paymentDate;

    // Relations
    // 1. (M-M) con users
    @ManyToMany(mappedBy = "payments")
    private Set<UserEntity> users;
    // 2. (M-1) con voucher
    @ManyToOne
    @JoinColumn(name = "voucher_id", nullable = false)
    private VoucherEntity voucher;
}