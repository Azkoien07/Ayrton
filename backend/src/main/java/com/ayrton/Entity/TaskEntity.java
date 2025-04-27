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
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tasks")
public class TaskEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Enums Personalizados
    public enum Priority {
        Baja,
        Media,
        Alta
    }
    public enum TypeTask {
        Personal,
        Laboral,
        Educativa
    }

    // Columns
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "state", nullable = false)
    private boolean state;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Priority Priority;

    @Enumerated(EnumType.STRING)
    @NotNull
    private TypeTask TypeTask;

    @CreationTimestamp
    @Column(name = "f_creation", updatable = false)
    private LocalDateTime fCreation;

    @Column(name = "f_expiration", nullable = false)
    private LocalDateTime fExpiration;

    @Column(name = "reminder")
    private LocalDateTime reminder;

    // Relations
    // 1. (M-M) con users
    @ManyToMany(mappedBy = "tasks")
    private Set<UserEntity> users;
    // 2. (M-M) con challenges
    @ManyToMany(mappedBy = "tasks")
    private Set<ChallengeEntity> challenges;
}