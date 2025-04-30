package com.ayrton.Business;

import com.ayrton.Services.RoleService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleBusiness {

    @Autowired
    private final RoleService roleService;
    private final ModelMapper modelMapper = new ModelMapper();

    public RoleBusiness(RoleService roleService) {
        this.roleService = roleService;
    }
}
