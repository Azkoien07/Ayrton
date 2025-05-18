package com.ayrton.Business;

import com.ayrton.Dto.RankingDto;
import com.ayrton.Entity.RankingEntity;
import com.ayrton.Services.RankingService;
import com.ayrton.Utilities.Exception.CustomException;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class RankingBusiness {

    private final RankingService rankingService;
    private final ModelMapper modelMapper = new ModelMapper();

    public RankingBusiness(RankingService rankingService) {
        this.rankingService = rankingService;
    }

    // Validation Object

    // Find All
    public Page<RankingDto> findAll(int page, int size) {
        try {
            PageRequest pageRequest = PageRequest.of(page, size);
            Page<RankingEntity> rankingEntityPage = rankingService.findAll(pageRequest);
            return rankingEntityPage.map(entity -> modelMapper.map(entity, RankingDto.class));
        } catch (Exception e) {
            throw new CustomException("Error getting Rankings: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Find By Id
    public RankingDto findById(Long id) {
        try {
            RankingEntity ranking = rankingService.getById(id);
            return modelMapper.map(ranking, RankingDto.class);
        } catch (Exception e) {
            throw new CustomException("Error getting Ranking: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Add
    public RankingDto add(RankingDto rankingDto) {
        try {
            RankingEntity rankingEntity = modelMapper.map(rankingDto, RankingEntity.class);
            return modelMapper.map(rankingService.create(rankingEntity), RankingDto.class);
        } catch (Exception e) {
            throw new CustomException("Error adding Ranking: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Update
    public void update(Long id, RankingDto rankingDto) {
        try {
            rankingDto.setId(id);
            RankingEntity rankingEntity = modelMapper.map(rankingDto, RankingEntity.class);
            rankingService.update(rankingEntity);
        } catch (Exception e) {
            throw new CustomException("Error updating Ranking: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Delete
    public void delete(Long id) {
        try {
            rankingService.delete(id);
        } catch (Exception e) {
            throw new CustomException("Error deleting Ranking: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}