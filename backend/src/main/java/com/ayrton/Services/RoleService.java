package com.ayrton.Services;

import com.ayrton.Entity.RoleEntity;
import com.ayrton.Repository.RoleRepository;
import com.ayrton.Services.Dao.Idao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class RoleService implements Idao<RoleEntity,Long> {
    @Autowired
    private RoleRepository roleRepository;

    // Metodos
    @Override
    public RoleEntity getById(Long id) {
        return null;
    }

    @Override
    public void save(RoleEntity obje) {

    }
    @Override
    public void saveAll(Iterable<RoleEntity> obje) {

    }
    @Override
    public void delete(RoleEntity obje) {

    }
}