package com.ayrton.Controller;

import com.ayrton.Business.RoleBusiness;
import com.ayrton.Dto.RoleDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("api/role")
public class RoleController {

    @Autowired
    private RoleBusiness roleBusiness;
/*
    // 1. Obtener una lista de todos los roles (con paginación)
    @GetMapping
    public ResponseEntity<?> findAll(@RequestParam int page, @RequestParam int size) {
        try {
            PageRequest pageable = PageRequest.of(page, size);
            Page<RoleDto> result = roleBusiness.findAll(pageable);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener los roles: " + e.getMessage());
        }
    }

    // 2. Obtener un rol por su ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            RoleDto result = roleBusiness.getById(id);
            return ResponseEntity.ok(result);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Rol no encontrado con ID: " + id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener el rol: " + e.getMessage());
        }
    }

    // 3. Crear un nuevo rol
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody RoleDto roleDto) {
        try {
            RoleDto result = roleBusiness.save(roleDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Datos inválidos: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al crear el rol: " + e.getMessage());
        }
    }

    // 4. Eliminar un rol por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            roleBusiness.delete(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Rol no encontrado con ID: " + id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al eliminar el rol: " + e.getMessage());
        }
    }
 */
}