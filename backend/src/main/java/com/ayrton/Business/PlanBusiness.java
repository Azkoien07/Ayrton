package com.ayrton.Business;

import com.ayrton.Services.PlanServices;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlanBusiness {
    @Autowired
    private final PlanServices planServices;
    private final ModelMapper modelMapper = new ModelMapper();

    public PlanBusiness(PlanServices planServices) {
        this.planServices = planServices;
    }
}
