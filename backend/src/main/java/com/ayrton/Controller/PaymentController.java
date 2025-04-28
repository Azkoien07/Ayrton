package com.ayrton.Controller;

import com.ayrton.Business.PaymentBusiness;
import com.ayrton.Dto.PaymentDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    private PaymentBusiness paymentBusiness;
/*
    // 1. Obtener una lista de todos los pagos (con paginación)
    @GetMapping
    public Page<PaymentDto> findAll(@RequestParam int page, @RequestParam int size) {
        PageRequest pageable = PageRequest.of(page, size);
        return paymentBusiness.findAll(pageable);
    }

    // 2. Obtener un pago por su ID
    @GetMapping("/{id}")
    public PaymentDto getById(@PathVariable Long id) {
        return paymentBusiness.getById(id);
    }

    // 4. Crear un nuevo pago
    @PostMapping("/create")
    public PaymentDto create(@RequestBody PaymentDto paymentDto) {
        return paymentBusiness.save(paymentDto);
    }

    // 5. Eliminar un pago por su ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        paymentBusiness.delete(id);
    }
 */
}