package com.ayrton.Business;

import com.ayrton.Dto.PaymentDto;
import com.ayrton.Entity.PaymentEntity;
import com.ayrton.Services.PaymentService;
import com.ayrton.Utilities.Exception.CustomException;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class PaymentBusiness {

    private final ModelMapper modelMapper = new ModelMapper();
    private final PaymentService paymentServices;

    public PaymentBusiness(PaymentService paymentService) {
        this.paymentServices = paymentService;
    }


    // Find All
    public Page<PaymentDto> findAll(int page, int size) {
        try {
            PageRequest pageRequest = PageRequest.of(page, size);
            Page<PaymentEntity> paymentEntityPage = paymentServices.findAll(pageRequest);
            return paymentEntityPage.map(entity -> modelMapper.map(entity, PaymentDto.class));
        } catch (Exception e) {
            throw new CustomException("Error getting Payments: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Find By Id
    public PaymentDto findById(Long id) {
        try {
            PaymentEntity payment = paymentServices.getById(id);
            return modelMapper.map(payment, PaymentDto.class);
        } catch (Exception e) {
            throw new CustomException("Error getting Payment: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Add
    public PaymentDto add(PaymentDto paymentDto) {
        try {
            PaymentEntity paymentEntity = modelMapper.map(paymentDto, PaymentEntity.class);
            return modelMapper.map(paymentServices.create(paymentEntity), PaymentDto.class);
        } catch (Exception e) {
            throw new CustomException("Error adding Payment: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Update
    public void update(Long id, PaymentDto paymentDto) {
        try {
            paymentDto.setId(id);
            PaymentEntity paymentEntity = modelMapper.map(paymentDto, PaymentEntity.class);
            paymentServices.update(paymentEntity);
        } catch (Exception e) {
            throw new CustomException("Error updating Payment: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Delete
    public void delete(Long id) {
        try {
            paymentServices.delete(id);
        } catch (Exception e) {
            throw new CustomException("Error deleting Payment: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}