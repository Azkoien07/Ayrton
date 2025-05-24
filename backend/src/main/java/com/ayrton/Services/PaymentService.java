package com.ayrton.Services;

import com.ayrton.Entity.PaymentEntity;
import com.ayrton.Repository.PaymentRepository;
import com.ayrton.Services.Dao.Idao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService implements Idao<PaymentEntity, Long> {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    // Methods

    // FindAll
    @Override
    public Page<PaymentEntity> findAll(PageRequest pageable) {
        return paymentRepository.findAll(pageable);
    }

    // FindAll (without pagination)
    @Override
    public List<PaymentEntity> getAll() {
        return paymentRepository.findAll();
    }

    // GetById
    @Override
    public PaymentEntity getById(Long id) {
        Optional<PaymentEntity> payment = paymentRepository.findById(id);
        return payment.orElse(null);
    }

    // Create
    @Transactional
    @Override
    public PaymentEntity create(PaymentEntity entity) {
        if (entity.getId() != null && paymentRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("El pago con ID " + entity.getId() + " ya existe.");
        }
        return paymentRepository.save(entity);
    }

    // Update
    @Transactional
    @Override
    public PaymentEntity update(PaymentEntity entity) {
        if (entity.getId() == null || !paymentRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("No se puede actualizar un pago que no existe o sin ID.");
        }
        return paymentRepository.save(entity);
    }

    // Delete
    @Transactional
    @Override
    public void delete(Long id) {
        paymentRepository.deleteById(id);
    }
}