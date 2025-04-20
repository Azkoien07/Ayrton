package com.ayrton.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class VoucherEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Columns
    @Column(name = "code", nullable = false)
    private String code;

    // Relations
    // 1. (1-M) con payment
    @OneToMany(mappedBy = "voucher")
    private List<PaymentEntity> payments;
}