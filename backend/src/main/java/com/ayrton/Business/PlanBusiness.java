package com.ayrton.Business;

import com.ayrton.Dto.PlanDto;
import com.ayrton.Entity.PlanEntity;
import com.ayrton.Services.PlanService;
import com.ayrton.Utilities.Exception.CustomException;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class PlanBusiness {

    private final PlanService planService;
    private final ModelMapper modelMapper = new ModelMapper();

    public PlanBusiness(PlanService planService) {
        this.planService = planService;
    }


    // Find All
    public Page<PlanDto> findAll(int page, int size) {
        try {
            PageRequest pageRequest = PageRequest.of(page, size);
            Page<PlanEntity> planEntityPage = planService.findAll(pageRequest);
            return planEntityPage.map(entity -> modelMapper.map(entity, PlanDto.class));
        } catch (Exception e) {
            throw new CustomException("Error getting Administrative: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Find By Id
    public PlanDto findById(Long id) {
        try {
            PlanEntity plan = planService.getById(id);
            return modelMapper.map(plan, PlanDto.class);
        } catch (Exception e) {
            throw new CustomException("Error getting Administrative: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Add
    public PlanDto add(PlanDto planDto) {
        try {
            PlanEntity planEntity = modelMapper.map(planDto, PlanEntity.class);
            return modelMapper.map(planService.create(planEntity), PlanDto.class);
        } catch (Exception e) {
            throw new CustomException("Error adding Administrative: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Update
    public void update(Long id, PlanDto planDto) {
        try{
            planDto.setId(id);
            PlanEntity planEntity = modelMapper.map(planDto, PlanEntity.class);
            planService.update(planEntity);
        } catch (Exception e) {
            throw new CustomException("Error updating Administrative: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Delete
    public void delete(Long id) {
        try{
            planService.getById(id);
        } catch (Exception e) {
            throw new CustomException("Error deleting Administrative: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}