package com.ayrton.Business;

import com.ayrton.Dto.PaymentDto;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.stereotype.Component;

@Component
public class StripeBusiness {

    public String createPaymentIntent(PaymentDto paymentDto) throws Exception {
        if (paymentDto.getPurchaseAmount() == null || paymentDto.getPurchaseAmount() <= 0) {
            throw new IllegalArgumentException("Monto de compra inválido");
        }

        if (paymentDto.getPaymentMethod() == null) {
            throw new IllegalArgumentException("Método de pago no puede ser null");
        }

        long amountInCents = Math.round(paymentDto.getPurchaseAmount() * 100);

        System.out.println("💰 Creando PaymentIntent con " + amountInCents + " centavos (USD)");
        System.out.println("💳 Método: " + paymentDto.getPaymentMethod().name());

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amountInCents)
                .setCurrency("usd")
                .putMetadata("paymentMethod", paymentDto.getPaymentMethod().name())
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                .setEnabled(true)
                                .build()
                )
                .build();

        PaymentIntent intent = PaymentIntent.create(params);
        System.out.println("✅ PaymentIntent creado: " + intent.getId());
        System.out.println("🔑 clientSecret generado: " + intent.getClientSecret());

        return intent.getClientSecret(); // <- Si esto es null, Stripe falló silenciosamente
    }
}
