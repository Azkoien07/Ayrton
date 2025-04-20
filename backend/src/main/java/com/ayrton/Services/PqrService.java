package com.ayrton.Services;

import com.ayrton.Entity.PqrEntity;
import com.ayrton.Entity.PqrEntity;
import com.ayrton.Repository.PqrRepository;
import com.ayrton.Services.Dao.Idao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PqrService implements Idao<PqrEntity, Long> {
    @Autowired
    private PqrRepository pqrRepository;

    // Metodos
    @Override
    public PqrEntity getById(Long id) {
        return null;
    }

    @Override
    public void save(PqrEntity obje) {

    }

    @Override
    public void saveAll(Iterable<PqrEntity> obje) {

    }

    @Override
    public void delete(PqrEntity obje) {

    }
}