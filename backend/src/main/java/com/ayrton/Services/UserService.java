package com.ayrton.Services;

import com.ayrton.Entity.UserEntity;
import com.ayrton.Repository.UserRepository;
import com.ayrton.Services.Dao.Idao;
import com.ayrton.Entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService implements Idao<UserEntity,Long> {
    @Autowired
    private UserRepository userRepository;

    // Metodos
    @Override
    public Page<UserEntity> findAll(PageRequest pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    public UserEntity getById(Long id) {
        Optional<UserEntity> challenge = userRepository.findById(id);
        return challenge.orElse(null);
    }

    @Override
    public UserEntity save(UserEntity entity) {
        return userRepository.save(entity);
    }
    @Transactional
    @Override
    public void create(UserEntity entity) {
        if (entity.getId() == null || !userRepository.existsById(entity.getId())) {
            userRepository.save(entity);
        }
    }

    @Transactional
    @Override
    public void update(UserEntity entity) {
        if (entity.getId() != null && userRepository.existsById(entity.getId())) {
            userRepository.save(entity);
        }
    }

    @Transactional
    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}