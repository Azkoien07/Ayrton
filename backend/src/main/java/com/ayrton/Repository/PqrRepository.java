package com.ayrton.Repository;

import com.ayrton.Entity.PqrEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PqrRepository extends JpaRepository<PqrEntity, Long> {
}
