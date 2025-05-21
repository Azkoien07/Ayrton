package com.ayrton.Business;

import com.ayrton.Dto.UserDto;
import com.ayrton.Entity.UserEntity;
import com.ayrton.Services.UserService;
import com.ayrton.Utilities.Exception.CustomException;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class UserBusiness {

    private final UserService userService;
    private final ModelMapper modelMapper = new ModelMapper();

    public UserBusiness(UserService userService) {
        this.userService = userService;
    }

    // Validation Object

    // Find All
    public Page<UserDto> findAll(int page, int size) {
        try {
            PageRequest pageRequest = PageRequest.of(page, size);
            Page<UserEntity> userEntityPage = userService.findAll(pageRequest);
            return userEntityPage.map(entity -> modelMapper.map(entity, UserDto.class));
        } catch (Exception e) {
            throw new CustomException("Error getting Users: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Find By Id
    public UserDto findById(Long id) {
        try {
            UserEntity userEntity = userService.getById(id);
            return modelMapper.map(userEntity, UserDto.class);
        } catch (Exception e) {
            throw new CustomException("Error getting User: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Add
    public UserDto add(UserDto userDto) {
        try {
            UserEntity userEntity = modelMapper.map(userDto, UserEntity.class);
            return modelMapper.map(userService.create(userEntity), UserDto.class);
        } catch (Exception e) {
            throw new CustomException("Error adding User: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Update
    public void update(Long id, UserDto userDto) {
        try{
            userDto.setId(id);
            UserEntity userEntity = modelMapper.map(userDto, UserEntity.class);
            userService.update(userEntity);
        } catch (Exception e) {
            throw new CustomException("Error updating User: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Delete
    public void delete(Long id) {
        try{
            userService.delete(id);
        } catch (Exception e) {
            throw new CustomException("Error deleting User: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
