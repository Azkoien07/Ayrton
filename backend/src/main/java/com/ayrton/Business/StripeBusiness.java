package com.ayrton.Business;

import com.ayrton.Dto.PaymentDto;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.stereotype.Component;

@Component
public class StripeBusiness {
    public String createPaymentIntent(PaymentDto paymentDto) throws Exception {
        long amountInCents = Math.round(paymentDto.getPurchaseAmount() * 100);

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amountInCents)
                .setCurrency("usd")
                .putMetadata("paymentMethod", paymentDto.getPaymentMethod().name())
                .build();
        PaymentIntent intent = PaymentIntent.create(params);
        return intent.getClientSecret();
    }
}