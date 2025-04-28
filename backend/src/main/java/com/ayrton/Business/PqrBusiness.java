package com.ayrton.Business;

import com.ayrton.Services.PqrService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PqrBusiness {
    @Autowired
    private PqrService pqrService;
    private final ModelMapper modelMapper = new ModelMapper();
}
