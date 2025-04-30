package com.ayrton.Business;

import com.ayrton.Services.PaymentServices;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentBusiness {
    @Autowired
    private final PaymentServices paymentServices;
    private final ModelMapper modelMapper = new ModelMapper();

    public PaymentBusiness(PaymentServices paymentServices) {
        this.paymentServices = paymentServices;
    }
}
