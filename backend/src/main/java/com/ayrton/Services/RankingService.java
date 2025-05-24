package com.ayrton.Services;

import com.ayrton.Entity.RankingEntity;
import com.ayrton.Repository.RankingRepository;
import com.ayrton.Services.Dao.Idao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
public class RankingService implements Idao<RankingEntity,Long> {

    private final RankingRepository rankingRepository;

    public RankingService(RankingRepository rankingRepository) {
        this.rankingRepository = rankingRepository;
    }

    // Methods

    // FindAll
    @Override
    public Page<RankingEntity> findAll(PageRequest pageable) {
        return rankingRepository.findAll(pageable);
    }

    // FindAll (without pagination)
    @Override
    public List<RankingEntity> getAll() {
        return rankingRepository.findAll();
    }

    // GetById
    @Override
    public RankingEntity getById(Long id) {
        Optional<RankingEntity> challenge = rankingRepository.findById(id);
        return challenge.orElse(null);
    }

    // Create
    @Transactional
    @Override
    public RankingEntity create(RankingEntity entity) {
        if (entity.getId() != null && rankingRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("El ranking con ID " + entity.getId() + " ya existe.");
        }
        return rankingRepository.save(entity);
    }

    // Update
    @Transactional
    @Override
    public RankingEntity update(RankingEntity entity) {
        if (entity.getId() == null || !rankingRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("No se puede actualizar un ranking que no existe o sin ID.");
        }
        return rankingRepository.save(entity);
    }

    // Delete
    @Transactional
    @Override
    public void delete(Long id) {
        rankingRepository.deleteById(id);
    }
}