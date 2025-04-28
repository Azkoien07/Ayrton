package com.ayrton.Services;

import com.ayrton.Entity.PqrEntity;
import com.ayrton.Entity.PqrEntity;
import com.ayrton.Entity.PqrEntity;
import com.ayrton.Repository.PqrRepository;
import com.ayrton.Services.Dao.Idao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class PqrService implements Idao<PqrEntity, Long> {
    @Autowired
    private PqrRepository pqrRepository;

    // Metodos
    @Override
    public Page<PqrEntity> findAll(PageRequest pageable) {
        return pqrRepository.findAll(pageable);
    }

    @Override
    public PqrEntity getById(Long id) {
        Optional<PqrEntity> challenge = pqrRepository.findById(id);
        return challenge.orElse(null);
    }

    @Transactional
    @Override
    public void create(PqrEntity entity) {
        if (entity.getId() == null || !pqrRepository.existsById(entity.getId())) {
            pqrRepository.save(entity);
        }
    }

    @Transactional
    @Override
    public void update(PqrEntity entity) {
        if (entity.getId() != null && pqrRepository.existsById(entity.getId())) {
            pqrRepository.save(entity);
        }
    }

    @Transactional
    @Override
    public void delete(Long id) {
        pqrRepository.deleteById(id);
    }
}