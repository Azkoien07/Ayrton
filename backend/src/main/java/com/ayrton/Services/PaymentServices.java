package com.ayrton.Services;

import com.ayrton.Entity.PaymentEntity;
import com.ayrton.Entity.PaymentEntity;
import com.ayrton.Repository.PaymentRepository;
import com.ayrton.Services.Dao.Idao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentServices implements Idao<PaymentEntity,Long> {
    @Autowired
    private PaymentRepository paymentRepository;
    // Metodos
    @Override
    public PaymentEntity getById(Long id) {
        return null;
    }

    @Override
    public void save(PaymentEntity obje) {

    }
    @Override
    public void saveAll(Iterable<PaymentEntity> obje) {

    }
    @Override
    public void delete(PaymentEntity obje) {

    }
}