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
@Table(name = "challenges")
public class ChallengeEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public enum Category {
        Desarrollo,
        Productividad,
        Eficiencia
    }

    public enum Dificulty {
        Baja,
        Intermedia,
        Alta
    }
    // Columns
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Category category;

    @Column(name = "state", nullable = false)
    private boolean state;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Dificulty dificulty;

    @Column(name = "points")
    private int points;

    // Relations
    // 1. (M-M) con task
    @ManyToMany
    @JoinTable(
            name = "challenge_tasks",
            joinColumns = @JoinColumn(name = "challenge_id"),
            inverseJoinColumns = @JoinColumn(name = "task_id")
    )
    private Set<TaskEntity> tasks;
    // 2. (M-M) con ranking
    @ManyToMany
    @JoinTable(
            name = "challenge_rankings",
            joinColumns = @JoinColumn(name = "challenge_id"),
            inverseJoinColumns = @JoinColumn(name = "ranking_id")
    )
    private Set<RankingEntity> rankings;
}