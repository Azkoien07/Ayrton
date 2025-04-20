package com.ayrton.Services;

import com.ayrton.Repository.UserRepository;
import com.ayrton.Services.Dao.Idao;
import com.ayrton.Entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements Idao<UserEntity,Long> {
    @Autowired
    private UserRepository userRepository;

    // Metodos
    @Override
    public UserEntity getById(Long id) {
        return null;
    }

    @Override
    public void save(UserEntity obje) {

    }
    @Override
    public void saveAll(Iterable<UserEntity> obje) {

    }
    @Override
    public void delete(UserEntity obje) {

    }
}
