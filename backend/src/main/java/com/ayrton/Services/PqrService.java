package com.ayrton.Services;

import com.ayrton.Entity.PqrEntity;
import com.ayrton.Repository.PqrRepository;
import com.ayrton.Services.Dao.Idao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PqrService implements Idao<PqrEntity, Long> {
    @Autowired
    private PqrRepository pqrRepository;

    // FindAll
    @Override
    public Page<PqrEntity> findAll(PageRequest pageable) {
        return pqrRepository.findAll(pageable);
    }

    // FindAll (without pagination)
    @Override
    public List<PqrEntity> getAll() {
        return pqrRepository.findAll();
    }

    // GetById
    @Override
    public PqrEntity getById(Long id) {
        Optional<PqrEntity> challenge = pqrRepository.findById(id);
        return challenge.orElse(null);
    }

    // Create
    @Transactional
    @Override
    public PqrEntity create(PqrEntity entity) {
        if (entity.getId() != null && pqrRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("El pqr con ID " + entity.getId() + " ya existe.");
        }
        return pqrRepository.save(entity);
    }

    // Update
    @Transactional
    @Override
    public PqrEntity update(PqrEntity entity) {
        if (entity.getId() == null || !pqrRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("No se puede actualizar una pqr que no existe o sin ID.");
        }
        return pqrRepository.save(entity);
    }

    // Delete
    @Transactional
    @Override
    public void delete(Long id) {
        pqrRepository.deleteById(id);
    }
}