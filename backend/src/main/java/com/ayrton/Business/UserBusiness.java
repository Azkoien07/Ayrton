package com.ayrton.Business;

import com.ayrton.Dto.UserDto;
import com.ayrton.Entity.PlanEntity;
import com.ayrton.Entity.RoleEntity;
import com.ayrton.Entity.UserEntity;
import com.ayrton.Repository.PlanRepository;
import com.ayrton.Repository.RoleRepository;
import com.ayrton.Services.UserService;
import com.ayrton.Utilities.Exception.CustomException;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserBusiness {

    private final UserService userService;
    private final ModelMapper modelMapper = new ModelMapper();
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final PlanRepository planRepository;

    public UserBusiness(UserService userService, PasswordEncoder passwordEncoder, RoleRepository roleRepository, PlanRepository planRepository) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.planRepository = planRepository;
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

    // Find ById
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
            UserEntity userEntity = new UserEntity();

            userEntity.setName(userDto.getName());
            userEntity.setEmail(userDto.getEmail());
            userEntity.setUsername(userDto.getUsername());
            userEntity.setPassword(passwordEncoder.encode(userDto.getPassword()));

            // Asignar Plan
            if (userDto.getPlanId() != null) {
                PlanEntity plan = planRepository.findById(userDto.getPlanId())
                        .orElseThrow(() -> new CustomException("Plan no encontrado", HttpStatus.BAD_REQUEST));
                userEntity.setPlan(plan);
            }

            // Asignar Rol
            if (userDto.getRoleId() != null) {
                RoleEntity role = roleRepository.findById(userDto.getRoleId())
                        .orElseThrow(() -> new CustomException("Rol no encontrado", HttpStatus.BAD_REQUEST));
                userEntity.setRole(role);
            }

            UserEntity saved = userService.create(userEntity);
            return modelMapper.map(saved, UserDto.class);
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
