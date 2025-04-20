package com.ayrton.Services;

import com.ayrton.Entity.VoucherEntity;
import com.ayrton.Entity.VoucherEntity;
import com.ayrton.Repository.VoucherRepository;
import com.ayrton.Services.Dao.Idao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VoucherService implements Idao<VoucherEntity,Long> {

    @Autowired
    private VoucherRepository voucherRepository;

    // Metodos
    @Override
    public VoucherEntity getById(Long id) {
        return null;
    }

    @Override
    public void save(VoucherEntity obje) {

    }
    @Override
    public void saveAll(Iterable<VoucherEntity> obje) {

    }
    @Override
    public void delete(VoucherEntity obje) {

    }
}