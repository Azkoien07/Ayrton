package com.ayrton.Services;

import com.ayrton.Entity.ChallengeEntity;
import com.ayrton.Entity.ChallengeEntity;
import com.ayrton.Repository.ChallengeRepository;
import com.ayrton.Services.Dao.Idao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChallengeServices implements Idao<ChallengeEntity,Long> {
    @Autowired
    private ChallengeRepository challengeRepository;

    // Metodos
    @Override
    public ChallengeEntity getById(Long id) {
        return null;
    }

    @Override
    public void save(ChallengeEntity obje) {

    }
    @Override
    public void saveAll(Iterable<ChallengeEntity> obje) {

    }
    @Override
    public void delete(ChallengeEntity obje) {

    }
}