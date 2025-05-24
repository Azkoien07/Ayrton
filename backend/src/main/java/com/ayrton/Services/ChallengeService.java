package com.ayrton.Services;

import com.ayrton.Entity.ChallengeEntity;
import com.ayrton.Repository.ChallengeRepository;
import com.ayrton.Services.Dao.Idao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ChallengeService implements Idao<ChallengeEntity, Long> {

    private final ChallengeRepository challengeRepository;

    public ChallengeService(ChallengeRepository challengeRepository) {
        this.challengeRepository = challengeRepository;
    }

    // Methods

    // FindAll
    @Override
    public Page<ChallengeEntity> findAll(PageRequest pageable) {
        return challengeRepository.findAll(pageable);
    }

    // FindAll (without pagination)
    @Override
    public List<ChallengeEntity> getAll() {
        return challengeRepository.findAll();
    }

    // GetById
    @Override
    public ChallengeEntity getById(Long id) {
        Optional<ChallengeEntity> challenge = challengeRepository.findById(id);
        return challenge.orElse(null);
    }

    // Create
    @Transactional
    @Override
    public ChallengeEntity create(ChallengeEntity entity) {
        if (entity.getId() != null && challengeRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("El challenge con ID " + entity.getId() + " ya existe.");
        }
        return challengeRepository.save(entity);
    }

    // Update
    @Transactional
    @Override
    public ChallengeEntity update(ChallengeEntity entity) {
        if (entity.getId() == null || !challengeRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("No se puede actualizar un Challenge que no existe o sin ID.");
        }
        return challengeRepository.save(entity);
    }

    // Delete
    @Transactional
    @Override
    public void delete(Long id) {
        challengeRepository.deleteById(id);
    }
}