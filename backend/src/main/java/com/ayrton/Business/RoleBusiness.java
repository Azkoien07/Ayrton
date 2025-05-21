package com.ayrton.Business;

import com.ayrton.Dto.RoleDto;
import com.ayrton.Entity.RoleEntity;
import com.ayrton.Services.RoleService;
import com.ayrton.Utilities.Exception.CustomException;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class RoleBusiness {

    private final RoleService roleService;
    private final ModelMapper modelMapper = new ModelMapper();

    public RoleBusiness(RoleService roleService) {
        this.roleService = roleService;
    }

    // Validation Object

    // Find All
    public Page<RoleDto> findAll(int page, int size) {
        try {
            PageRequest pageRequest = PageRequest.of(page, size);
            Page<RoleEntity> roleEntityPage = roleService.findAll(pageRequest);
            return roleEntityPage.map(entity -> modelMapper.map(entity, RoleDto.class));
        } catch (Exception e) {
            throw new CustomException("Error getting Roles: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Find By Id
    public RoleDto findById(Long id) {
        try {
            RoleEntity roleEntity = roleService.getById(id);
            return modelMapper.map(roleEntity, RoleDto.class);
        } catch (Exception e) {
            throw new CustomException("Error getting Role: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Add
    public RoleDto add(RoleDto roleDto) {
        try {
            RoleEntity roleEntity = modelMapper.map(roleDto, RoleEntity.class);
            return modelMapper.map(roleService.create(roleEntity), RoleDto.class);
        } catch (Exception e) {
            throw new CustomException("Error adding Role: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Update
    public void update(Long id, RoleDto roleDto) {
        try {
            roleDto.setId(id);
            RoleEntity roleEntity = modelMapper.map(roleDto, RoleEntity.class);
            roleService.update(roleEntity);
        } catch (Exception e) {
            throw new CustomException("Error updating Role: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Delete
    public void delete(Long id) {
        try{
            roleService.delete(id);
        } catch (Exception e) {
            throw new CustomException("Error deleting Role: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}