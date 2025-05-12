package com.ayrton.Services;

import com.ayrton.Entity.RoleEntity;
import com.ayrton.Entity.RoleEntity;
import com.ayrton.Entity.RoleEntity;
import com.ayrton.Repository.RoleRepository;
import com.ayrton.Services.Dao.Idao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
public class RoleService implements Idao<RoleEntity,Long> {
    @Autowired
    private RoleRepository roleRepository;

    // Metodos

    // FindAll
    @Override
    public Page<RoleEntity> findAll(PageRequest pageable) {
        return roleRepository.findAll(pageable);
    }

    // FindAll (without pagination)
    @Override
    public List<RoleEntity> getAll() {
        return roleRepository.findAll();
    }

    // GetById
    @Override
    public RoleEntity getById(Long id) {
        Optional<RoleEntity> challenge = roleRepository.findById(id);
        return challenge.orElse(null);
    }

    // Create
    @Transactional
    @Override
    public RoleEntity create(RoleEntity entity) {
        if (entity.getId() != null && roleRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("El rol con ID " + entity.getId() + " ya existe.");
        }
        return roleRepository.save(entity);
    }

    // Update
    @Transactional
    @Override
    public RoleEntity update(RoleEntity entity) {
        if (entity.getId() == null || !roleRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("No se puede actualizar un rol que no existe o sin ID.");
        }
        return roleRepository.save(entity);
    }

    // Delete
    @Transactional
    @Override
    public void delete(Long id) {
        roleRepository.deleteById(id);
    }
}