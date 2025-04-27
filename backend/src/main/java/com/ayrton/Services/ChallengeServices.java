package com.ayrton.Services;

import com.ayrton.Entity.ChallengeEntity;
import com.ayrton.Repository.ChallengeRepository;
import com.ayrton.Services.Dao.Idao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class ChallengeServices implements Idao<ChallengeEntity, Long> {

    @Autowired
    private ChallengeRepository challengeRepository;

    // Metodos
    @Override
    public Page<ChallengeEntity> findAll(PageRequest pageable) {
        return challengeRepository.findAll(pageable);
    }

    @Override
    public ChallengeEntity getById(Long id) {
        Optional<ChallengeEntity> challenge = challengeRepository.findById(id);
        return challenge.orElse(null);
    }

    @Transactional
    @Override
    public ChallengeEntity save(ChallengeEntity entity) {
        return challengeRepository.save(entity);
    }

    @Transactional
    @Override
    public void create(ChallengeEntity entity) {
        if (entity.getId() == null || !challengeRepository.existsById(entity.getId())) {
            challengeRepository.save(entity);
        }
    }

    @Transactional
    @Override
    public void update(ChallengeEntity entity) {
        if (entity.getId() != null && challengeRepository.existsById(entity.getId())) {
            challengeRepository.save(entity);
        }
    }

    @Transactional
    @Override
    public void delete(Long id) {
        challengeRepository.deleteById(id);
    }
}