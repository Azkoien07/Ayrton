package com.ayrton.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "rankings")
public class RankingEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Columns
    @Column(name = "level", nullable = false)
    private int level;

    @Column(name = "position", nullable = false)
    private int position;

    // Relations
    // 1. (M-M) con challenge
    @ManyToMany(mappedBy = "rankings")
    private Set<ChallengeEntity> challenges;
}