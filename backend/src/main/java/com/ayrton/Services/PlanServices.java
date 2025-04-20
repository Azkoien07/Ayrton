package com.ayrton.Services;

import com.ayrton.Entity.PlanEntity;
import com.ayrton.Entity.PlanEntity;
import com.ayrton.Repository.PlanRepository;
import com.ayrton.Services.Dao.Idao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlanServices implements Idao<PlanEntity,Long> {
    @Autowired
    private PlanRepository planRepository;

    // Metodos
    @Override
    public PlanEntity getById(Long id) {
        return null;
    }

    @Override
    public void save(PlanEntity obje) {

    }
    @Override
    public void saveAll(Iterable<PlanEntity> obje) {

    }
    @Override
    public void delete(PlanEntity obje) {

    }
}