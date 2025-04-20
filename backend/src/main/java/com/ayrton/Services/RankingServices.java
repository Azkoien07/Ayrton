package com.ayrton.Services;

import com.ayrton.Entity.RankingEntity;
import com.ayrton.Entity.RankingEntity;
import com.ayrton.Repository.RankingRepository;
import com.ayrton.Services.Dao.Idao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class RankingServices implements Idao<RankingEntity,Long> {
    @Autowired
    private RankingRepository rankingRepository;

    // Metodos
    @Override
    public RankingEntity getById(Long id) {
        return null;
    }

    @Override
    public void save(RankingEntity obje) {

    }
    @Override
    public void saveAll(Iterable<RankingEntity> obje) {

    }
    @Override
    public void delete(RankingEntity obje) {

    }
}