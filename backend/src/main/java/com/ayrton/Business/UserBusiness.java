package com.ayrton.Business;

import com.ayrton.Services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserBusiness {
    @Autowired
    private UserService userService;
    private final ModelMapper modelMapper = new ModelMapper();
}
