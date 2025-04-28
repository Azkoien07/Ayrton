package com.ayrton.Services;

import com.ayrton.Entity.VoucherEntity;
import com.ayrton.Entity.VoucherEntity;
import com.ayrton.Entity.VoucherEntity;
import com.ayrton.Repository.VoucherRepository;
import com.ayrton.Services.Dao.Idao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class VoucherService implements Idao<VoucherEntity,Long> {

    @Autowired
    private VoucherRepository voucherRepository;

    // Metodos
    @Override
    public Page<VoucherEntity> findAll(PageRequest pageable) {
        return voucherRepository.findAll(pageable);
    }

    @Override
    public VoucherEntity getById(Long id) {
        Optional<VoucherEntity> challenge = voucherRepository.findById(id);
        return challenge.orElse(null);
    }

    @Transactional
    @Override
    public void create(VoucherEntity entity) {
        if (entity.getId() == null || !voucherRepository.existsById(entity.getId())) {
            voucherRepository.save(entity);
        }
    }

    @Transactional
    @Override
    public void update(VoucherEntity entity) {
        if (entity.getId() != null && voucherRepository.existsById(entity.getId())) {
            voucherRepository.save(entity);
        }
    }

    @Transactional
    @Override
    public void delete(Long id) {
        voucherRepository.deleteById(id);
    }
}