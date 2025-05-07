package com.ayrton.Services;

import com.ayrton.Entity.UserEntity;
import com.ayrton.Entity.UserEntity;
import com.ayrton.Repository.UserRepository;
import com.ayrton.Services.Dao.Idao;
import com.ayrton.Entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements Idao<UserEntity,Long> {
    @Autowired
    private UserRepository userRepository;

    // Métodos
    @Override
    public Page<UserEntity> findAll(PageRequest pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    public List<UserEntity> getAll() {
        return userRepository.findAll();
    }

    @Override
    public UserEntity getById(Long id) {
        Optional<UserEntity> challenge = userRepository.findById(id);
        return challenge.orElse(null);
    }

    @Transactional
    @Override
    public UserEntity create(UserEntity entity) {
        if (entity.getId() == null || !userRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("El usuario con ID " + entity.getId() + " ya existe.");
        }
        return userRepository.save(entity);
    }

    @Transactional
    @Override
    public UserEntity update(UserEntity entity) {
        // Aseguramos que tenga ID (para evitar crear en update)
        if (entity.getId() != null && userRepository.existsById(entity.getId())) {
            return userRepository.save(entity);
        } else {
            throw new IllegalArgumentException("No se puede actualizar un usuario que no existe o sin ID.");
        }
    }

    @Transactional
    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}