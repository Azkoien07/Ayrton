package com.ayrton.Business;

import com.ayrton.Dto.VoucherDto;
import com.ayrton.Entity.VoucherEntity;
import com.ayrton.Services.VoucherService;
import com.ayrton.Utilities.Exception.CustomException;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;


@Component
public class VoucherBusiness {

    private final VoucherService voucherService;
    private final ModelMapper modelMapper = new ModelMapper();

    public VoucherBusiness(VoucherService voucherServices) {
        this.voucherService = voucherServices;
    }


    // Find All
    public Page<VoucherDto> findAll(int page, int size) {
        try {
            PageRequest pageRequest = PageRequest.of(page, size);
            Page<VoucherEntity> voucherEntityPage = voucherService.findAll(pageRequest);
            return voucherEntityPage.map(entity -> modelMapper.map(entity, VoucherDto.class));
        } catch (Exception e) {
            throw new CustomException("Error getting Vouchers: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Find By Id
    public VoucherDto findById(Long id) {
        try {
            VoucherEntity voucher = voucherService.getById(id);
            return modelMapper.map(voucher, VoucherDto.class);
        } catch (Exception e) {
            throw new CustomException("Error getting Voucher: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Add
    public VoucherDto add(VoucherDto voucherDto) {
        try {
            VoucherEntity voucherEntity = modelMapper.map(voucherDto, VoucherEntity.class);
            return modelMapper.map(voucherService.create(voucherEntity), VoucherDto.class);
        } catch (Exception e) {
            throw new CustomException("Error adding Voucher: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Update
    public void update(Long id, VoucherDto voucherDto) {
        try{
            voucherDto.setId(id);
            VoucherEntity voucherEntity = modelMapper.map(voucherDto, VoucherEntity.class);
            voucherService.update(voucherEntity);
        } catch (Exception e) {
            throw new CustomException("Error updating Voucher: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Delete
    public void delete(Long id) {
        try{
            voucherService.delete(id);
        } catch (Exception e) {
            throw new CustomException("Error deleting Voucher: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}