package com.ayrton.Controller;

import com.ayrton.Business.RoleBusiness;
import com.ayrton.Dto.RoleDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/role")
public class RoleController {
    @Autowired
    private RoleBusiness roleBusiness;

    /*
    // 1. Obtener una lista de todos los roles (con paginación)
    @GetMapping
    public Page<RoleDto> findAll(@RequestParam int page, @RequestParam int size) {
        PageRequest pageable = PageRequest.of(page, size);
        return roleBusiness.findAll(pageable);
    }

    // 2. Obtener un rol por su ID
    @GetMapping("/{id}")
    public RoleDto getById(@PathVariable Long id) {
        return roleBusiness.getById(id);
    }

    // 4. Crear un nuevo rol
    @PostMapping("/create")
    public RoleDto create(@RequestBody RoleDto roleDto) {
        return roleBusiness.save(roleDto);
    }

    // 5. Eliminar un rol por su ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        roleBusiness.delete(id);
    }
     */
}