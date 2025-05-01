package com.ayrton.Controller;

import com.ayrton.Business.ChallengeBusiness;
import com.ayrton.Dto.ChallengeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/challenge")
public class ChallengeController {

    @Autowired
    private ChallengeBusiness challengeBusiness;
/*
    // 1. Obtener una lista de todos los desafíos (con paginación)
    @GetMapping
    public ResponseEntity<?> findAll(@RequestParam int page, @RequestParam int size) {
        try {
            PageRequest pageable = PageRequest.of(page, size);
            Page<ChallengeDto> result = challengeBusiness.findAll(pageable);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
             .body("Error al obtener los desafíos: " + e.getMessage());
        }
    }

    // 2. Obtener un desafío por su ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            ChallengeDto result = challengeBusiness.getById(id);
            return ResponseEntity.ok(result);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
             .body("Desafío no encontrado con ID: " + id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
             .body("Error al obtener el desafío: " + e.getMessage());
        }
    }

    // 4. Crear un nuevo desafío
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody ChallengeDto challengeDto) {
        try {
            ChallengeDto result = challengeBusiness.save(challengeDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
             .body("Datos inválidos: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
             .body("Error al crear el desafío: " + e.getMessage());
        }
    }

    // 5. Eliminar un desafío por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            challengeBusiness.delete(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
             .body("Desafío no encontrado con ID: " + id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
             .body("Error al eliminar el desafío: " + e.getMessage());
        }
    }
}
 */
}