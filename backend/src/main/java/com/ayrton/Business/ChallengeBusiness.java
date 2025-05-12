package com.ayrton.Business;

import com.ayrton.Dto.ChallengeDto;
import com.ayrton.Dto.PaymentDto;
import com.ayrton.Entity.ChallengeEntity;
import com.ayrton.Entity.ChallengeEntity;
import com.ayrton.Entity.PaymentEntity;
import com.ayrton.Services.ChallengeService;
import com.ayrton.Utilities.Exception.CustomException;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class ChallengeBusiness {

    private final ChallengeService challengeService;
    private final ModelMapper modelMapper = new ModelMapper();

    public ChallengeBusiness(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }


    // Find All
    public Page<ChallengeDto> findAll(int page, int size) {
        try {
            PageRequest pageRequest = PageRequest.of(page, size);
            Page<ChallengeEntity> challengeEntityPage = challengeService.findAll(pageRequest);
            return challengeEntityPage.map(entity -> modelMapper.map(entity, ChallengeDto.class));
        } catch (Exception e) {
            throw new CustomException("Error getting Challenges: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Find By Id
    public ChallengeDto findById(Long id) {
        try {
            ChallengeEntity payment = challengeService.getById(id);
            return modelMapper.map(payment, ChallengeDto.class);
        } catch (Exception e) {
            throw new CustomException("Error getting Challenge: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Add
    public ChallengeDto add(ChallengeDto challengeDto) {
        try {
            ChallengeEntity challengeEntity = modelMapper.map(challengeDto, ChallengeEntity.class);
            return modelMapper.map(challengeService.create(challengeEntity), ChallengeDto.class);
        } catch (Exception e) {
            throw new CustomException("Error adding Challenge: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Update
    public void update(Long id, ChallengeDto challengeDto) {
        try {
            challengeDto.setId(id);
            ChallengeEntity challengeEntity = modelMapper.map(challengeDto, ChallengeEntity.class);
            challengeService.update(challengeEntity);
        } catch (Exception e) {
            throw new CustomException("Error updating Challenge: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Delete
    public void delete(Long id) {
        try{
            challengeService.getById(id);
        } catch (Exception e) {
            throw new CustomException("Error deleting Challenge: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}