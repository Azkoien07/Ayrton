package com.ayrton.Services;

import com.ayrton.Entity.RankingEntity;
import com.ayrton.Entity.RankingEntity;
import com.ayrton.Entity.RankingEntity;
import com.ayrton.Repository.RankingRepository;
import com.ayrton.Services.Dao.Idao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
public class RankingServices implements Idao<RankingEntity,Long> {
    @Autowired
    private RankingRepository rankingRepository;

    // Metodos
    @Override
    public Page<RankingEntity> findAll(PageRequest pageable) {
        return rankingRepository.findAll(pageable);
    }

    @Override
    public RankingEntity getById(Long id) {
        Optional<RankingEntity> challenge = rankingRepository.findById(id);
        return challenge.orElse(null);
    }

    @Override
    public RankingEntity save(RankingEntity entity) {
        return rankingRepository.save(entity);
    }

    @Transactional
    @Override
    public void create(RankingEntity entity) {
        if (entity.getId() == null || !rankingRepository.existsById(entity.getId())) {
            rankingRepository.save(entity);
        }
    }

    @Transactional
    @Override
    public void update(RankingEntity entity) {
        if (entity.getId() != null && rankingRepository.existsById(entity.getId())) {
            rankingRepository.save(entity);
        }
    }

    @Transactional
    @Override
    public void delete(Long id) {
        rankingRepository.deleteById(id);
    }
}