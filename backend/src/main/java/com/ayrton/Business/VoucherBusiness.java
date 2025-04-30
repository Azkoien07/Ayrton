package com.ayrton.Business;

import com.ayrton.Services.VoucherService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VoucherBusiness {
    @Autowired
    private final VoucherService voucherService;
    private final ModelMapper modelMapper = new ModelMapper();

    public VoucherBusiness(VoucherService voucherService) {
        this.voucherService = voucherService;
    }
}
