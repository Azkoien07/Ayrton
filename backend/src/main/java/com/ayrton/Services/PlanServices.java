package com.ayrton.Services;

import com.ayrton.Entity.PlanEntity;
import com.ayrton.Entity.PlanEntity;
import com.ayrton.Entity.PlanEntity;
import com.ayrton.Repository.PlanRepository;
import com.ayrton.Services.Dao.Idao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class PlanServices implements Idao<PlanEntity,Long> {
    @Autowired
    private PlanRepository planRepository;

    // Metodos
    @Override
    public Page<PlanEntity> findAll(PageRequest pageable) {
        return planRepository.findAll(pageable);
    }

    @Override
    public PlanEntity getById(Long id) {
        Optional<PlanEntity> challenge = planRepository.findById(id);
        return challenge.orElse(null);
    }

    @Transactional
    @Override
    public void create(PlanEntity entity) {
        if (entity.getId() == null || !planRepository.existsById(entity.getId())) {
            planRepository.save(entity);
        }
    }

    @Transactional
    @Override
    public void update(PlanEntity entity) {
        if (entity.getId() != null && planRepository.existsById(entity.getId())) {
            planRepository.save(entity);
        }
    }

    @Transactional
    @Override
    public void delete(Long id) {
        planRepository.deleteById(id);
    }
}