package com.ayrton.Services;

import com.ayrton.Entity.VoucherEntity;
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

import java.util.List;
import java.util.Optional;

@Service
public class VoucherService implements Idao<VoucherEntity,Long> {

    @Autowired
    private VoucherRepository voucherRepository;

    // Métodos
    @Override
    public Page<VoucherEntity> findAll(PageRequest pageable) {
        return voucherRepository.findAll(pageable);
    }

    @Override
    public List<VoucherEntity> getAll() {
        return voucherRepository.findAll();
    }

    @Override
    public VoucherEntity getById(Long id) {
        Optional<VoucherEntity> challenge = voucherRepository.findById(id);
        return challenge.orElse(null);
    }

    @Transactional
    @Override
    public VoucherEntity create(VoucherEntity entity) {
        if (entity.getId() == null || !voucherRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("El voucher con ID " + entity.getId() + " ya existe.");
        }
        return voucherRepository.save(entity);
    }

    @Transactional
    @Override
    public VoucherEntity update(VoucherEntity entity) {
        if (entity.getId() != null && voucherRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("No se puede actualizar un voucher que no existe o sin ID.");
        }
        return voucherRepository.save(entity);
    }

    @Transactional
    @Override
    public void delete(Long id) {
        voucherRepository.deleteById(id);
    }
}