package com.ayrton.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "users")
public class UserEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //Columns
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "username", nullable = false)
    private String username;

    // Relations
    // 1. (M-M) con tasks
    @ManyToMany
    @JoinTable(
            name = "user_tasks",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "task_id")
    )
    private Set<TaskEntity> tasks;

    // 2. (M-1) con role
    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private RoleEntity role;

    // 3. (M-M) con payment
    @ManyToMany
    @JoinTable(
            name = "user_payments",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "payment_id")
    )
    private Set<PaymentEntity> payments;

    // 4. (M-M) con pqrs
    @ManyToMany
    @JoinTable(
            name = "user_pqrs",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "pqr_id")
    )
    private Set<PqrEntity> pqrs;

    // 5. (M-1) con plans
    @ManyToOne
    @JoinColumn(name = "plan_id", nullable = false)
    private PlanEntity plan;
}