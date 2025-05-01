package com.ayrton.Controller;

import com.ayrton.Business.PlanBusiness;
import com.ayrton.Dto.PlanDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("api/plan")
public class PlanController {

    @Autowired
    private PlanBusiness planBusiness;
/*
    // 1. Obtener una lista de todos los planes (con paginación)
    @GetMapping
    public ResponseEntity<?> findAll(@RequestParam int page, @RequestParam int size) {
        try {
            PageRequest pageable = PageRequest.of(page, size);
            Page<PlanDto> result = planBusiness.findAll(pageable);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener los planes: " + e.getMessage());
        }
    }

    // 2. Obtener un plan por su ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            PlanDto result = planBusiness.getById(id);
            return ResponseEntity.ok(result);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Plan no encontrado con ID: " + id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener el plan: " + e.getMessage());
        }
    }

    // 3. Crear un nuevo plan
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody PlanDto planDto) {
        try {
            PlanDto result = planBusiness.save(planDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Datos inválidos: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al crear el plan: " + e.getMessage());
        }
    }

    // 4. Eliminar un plan por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            planBusiness.delete(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Plan no encontrado con ID: " + id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al eliminar el plan: " + e.getMessage());
        }
    }
 */
}