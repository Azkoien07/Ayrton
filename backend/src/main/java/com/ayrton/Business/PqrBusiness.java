package com.ayrton.Business;

import com.ayrton.Dto.PqrDto;
import com.ayrton.Entity.PqrEntity;
import com.ayrton.Services.PqrService;
import com.ayrton.Utilities.Exception.CustomException;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class PqrBusiness {

    private final PqrService pqrService;
    private final ModelMapper modelMapper = new ModelMapper();

    public PqrBusiness(PqrService pqrService) {
        this.pqrService = pqrService;
    }

    // Validation Object

    // Find All
    public Page<PqrDto> findAll(int page, int size ) {
        try {
            PageRequest pageRequest = PageRequest.of(page, size);
            Page<PqrEntity> pqrEntityPage = pqrService.findAll(pageRequest);
            return pqrEntityPage.map(entity -> modelMapper.map(entity, PqrDto.class));
        } catch (Exception e) {
            throw new CustomException("Error getting Pqrs: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Find By Id
    public PqrDto findById(Long id) {
        try {
            PqrEntity pqrEntity = pqrService.getById(id);
            return modelMapper.map(pqrEntity, PqrDto.class);
        } catch (Exception e) {
            throw new CustomException("Error getting Pqr: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Add
    public PqrDto add(PqrDto pqrDto) {
        try {
            PqrEntity pqrEntity = modelMapper.map(pqrDto, PqrEntity.class);
            return modelMapper.map(pqrService.create(pqrEntity), PqrDto.class);
        } catch (Exception e) {
            throw new CustomException("Error adding Pqr: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Update
    public void update(Long id, PqrDto pqrDto) {
        try {
            pqrDto.setId(id);
            PqrEntity pqrEntity = modelMapper.map(pqrDto, PqrEntity.class);
            pqrService.update(pqrEntity);
        } catch (Exception e) {
            throw new CustomException("Error updating Pqr: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Delete
    public void delete(Long id) {
        try {
            pqrService.delete(id);
        } catch (Exception e) {
            throw new CustomException("Error deleting Pqr: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
