package com.ayrton.Repository;

import com.ayrton.Entity.RankingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RankingRepository extends JpaRepository<RankingEntity, Long> {

}