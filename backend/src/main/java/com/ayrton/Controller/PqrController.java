package com.ayrton.Controller;

import com.ayrton.Business.PqrBusiness;
import com.ayrton.Dto.PqrDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("api/pqr")
public class PqrController {

    @Autowired
    private PqrBusiness pqrBusiness;
/*
    // 1. Obtener una lista de todos los PQRS (con paginación)
    @GetMapping
    public ResponseEntity<?> findAll(@RequestParam int page, @RequestParam int size) {
        try {
            PageRequest pageable = PageRequest.of(page, size);
            Page<PqrDto> result = pqrBusiness.findAll(pageable);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener los PQRS: " + e.getMessage());
        }
    }

    // 2. Obtener un PQR por su ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            PqrDto result = pqrBusiness.getById(id);
            return ResponseEntity.ok(result);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("PQR no encontrado con ID: " + id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener el PQR: " + e.getMessage());
        }
    }

    // 3. Crear un nuevo PQR
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody PqrDto pqrDto) {
        try {
            PqrDto result = pqrBusiness.save(pqrDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Datos inválidos: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al crear el PQR: " + e.getMessage());
        }
    }

    // 4. Eliminar un PQR por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            pqrBusiness.delete(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("PQR no encontrado con ID: " + id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al eliminar el PQR: " + e.getMessage());
        }
    }
 */
}