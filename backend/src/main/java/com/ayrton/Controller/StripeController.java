package com.ayrton.Controller;

import com.ayrton.Business.StripeBusiness;
import com.ayrton.Dto.ClientSecretResponseDto;
import com.ayrton.Dto.PaymentDto;
import com.ayrton.Utilities.Http.ResponseHttp;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import java.util.Map;

@Controller
public class StripeController {

    private final StripeBusiness stripeBusiness;

    public StripeController(StripeBusiness stripeBusiness) {
        this.stripeBusiness = stripeBusiness;
    }

    @MutationMapping
    public ClientSecretResponseDto createStripePaymentIntent(@Argument("input") PaymentDto dto) {
        try {
            String clientSecret = stripeBusiness.createPaymentIntent(dto);
            if (clientSecret == null) {
                return new ClientSecretResponseDto(null, "500", "Stripe did not return clientSecret");
            }
            return new ClientSecretResponseDto(clientSecret, "200", "Stripe PaymentIntent created successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return new ClientSecretResponseDto(null, "500", "Error creating PaymentIntent: " + e.getMessage());
        }
    }
}