package com.ayrton.Controller;

import com.ayrton.Business.PaymentBusiness;
import com.ayrton.Dto.PaymentDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("api/payment")
public class PaymentController {

    @Autowired
    private PaymentBusiness paymentBusiness;
/*
    // 1. Obtener una lista de todos los pagos (con paginación)
    @GetMapping
    public ResponseEntity<?> findAll(@RequestParam int page, @RequestParam int size) {
        try {
            PageRequest pageable = PageRequest.of(page, size);
            Page<PaymentDto> result = paymentBusiness.findAll(pageable);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener los pagos: " + e.getMessage());
        }
    }

    // 2. Obtener un pago por su ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            PaymentDto result = paymentBusiness.getById(id);
            return ResponseEntity.ok(result);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Pago no encontrado con ID: " + id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener el pago: " + e.getMessage());
        }
    }

    // 3. Crear un nuevo pago
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody PaymentDto paymentDto) {
        try {
            PaymentDto result = paymentBusiness.save(paymentDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Datos inválidos: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al crear el pago: " + e.getMessage());
        }
    }

    // 4. Eliminar un pago por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            paymentBusiness.delete(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Pago no encontrado con ID: " + id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al eliminar el pago: " + e.getMessage());
        }
    }
 */
}