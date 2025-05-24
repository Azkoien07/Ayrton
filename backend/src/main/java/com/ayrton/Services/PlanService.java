package com.ayrton.Services;

import com.ayrton.Entity.PlanEntity;
import com.ayrton.Repository.PlanRepository;
import com.ayrton.Services.Dao.Idao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PlanService implements Idao<PlanEntity,Long> {

    private final PlanRepository planRepository;

    public PlanService(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    // Methods

    @Override
    public Page<PlanEntity> findAll(PageRequest pageable) {
        return planRepository.findAll(pageable);
    }

    @Override
    public List<PlanEntity> getAll() {
        return planRepository.findAll();
    }

    @Override
    public PlanEntity getById(Long id) {
        Optional<PlanEntity> challenge = planRepository.findById(id);
        return challenge.orElse(null);
    }

    @Transactional
    @Override
    public PlanEntity create(PlanEntity entity) {
        if (entity.getId() != null && planRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("El plan con ID " + entity.getId() + " ya existe.");
        }
        return planRepository.save(entity);
    }

    @Transactional
    @Override
    public PlanEntity update(PlanEntity entity) {
        if (entity.getId() == null || !planRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("No se puede actualizar un plan que no existe o sin ID.");
        }
        return planRepository.save(entity);
    }

    @Transactional
    @Override
    public void delete(Long id) {
        planRepository.deleteById(id);
    }
}