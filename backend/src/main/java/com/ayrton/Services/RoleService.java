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
    @Override
    public Page<RoleEntity> findAll(PageRequest pageable) {
        return roleRepository.findAll(pageable);
    }

    @Override
    public List<RoleEntity> getAll() {
        return roleRepository.findAll();
    }

    @Override
    public RoleEntity getById(Long id) {
        Optional<RoleEntity> challenge = roleRepository.findById(id);
        return challenge.orElse(null);
    }

    @Transactional
    @Override
    public void create(RoleEntity entity) {
        if (entity.getId() == null || !roleRepository.existsById(entity.getId())) {
            roleRepository.save(entity);
        }
    }

    @Transactional
    @Override
    public void update(RoleEntity entity) {
        if (entity.getId() != null && roleRepository.existsById(entity.getId())) {
            roleRepository.save(entity);
        }
    }

    @Transactional
    @Override
    public void delete(Long id) {
        roleRepository.deleteById(id);
    }
}