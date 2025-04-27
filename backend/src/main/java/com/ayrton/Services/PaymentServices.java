package com.ayrton.Services;

import com.ayrton.Entity.PaymentEntity;
import com.ayrton.Entity.PaymentEntity;
import com.ayrton.Entity.PaymentEntity;
import com.ayrton.Repository.PaymentRepository;
import com.ayrton.Services.Dao.Idao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class PaymentServices implements Idao<PaymentEntity, Long> {
    @Autowired
    private PaymentRepository paymentRepository;

    // Metodos
    @Override
    public Page<PaymentEntity> findAll(PageRequest pageable) {
        return paymentRepository.findAll(pageable);
    }

    @Override
    public PaymentEntity getById(Long id) {
        Optional<PaymentEntity> challenge = paymentRepository.findById(id);
        return challenge.orElse(null);
    }

    @Override
    public PaymentEntity save(PaymentEntity entity) {
        return paymentRepository.save(entity);
    }

    @Transactional
    @Override
    public void create(PaymentEntity entity) {
        if (entity.getId() == null || !paymentRepository.existsById(entity.getId())) {
            paymentRepository.save(entity);
        }
    }

    @Transactional
    @Override
    public void update(PaymentEntity entity) {
        if (entity.getId() != null && paymentRepository.existsById(entity.getId())) {
            paymentRepository.save(entity);
        }
    }

    @Transactional
    @Override
    public void delete(Long id) {
        paymentRepository.deleteById(id);
    }
}