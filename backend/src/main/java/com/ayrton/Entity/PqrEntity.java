package com.ayrton.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "pqrs")
public class PqrEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public enum TypePqr {
        Peticion,
        Queja,
        Reclamo
    }
    // Columns
    @Enumerated(EnumType.STRING)
    @NotNull
    private TypePqr typePqr;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "argument")
    private String argument;

    @Column(name = "answer", nullable = false)
    private String answer;

    @Column(name = "state", nullable = false)
    private boolean state;

    // Relations
    // 1. (M-M) con users
    @ManyToMany(mappedBy = "pqrs")
    private Set<UserEntity> users;
}