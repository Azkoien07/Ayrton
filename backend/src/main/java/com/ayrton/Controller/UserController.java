package com.ayrton.Controller;

import com.ayrton.Business.UserBusiness;
import com.ayrton.Dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserBusiness userBusiness;
/*
    // 1. Obtener una lista de todos los usuarios (con paginación)
    @GetMapping
    public Page<UserDto> findAll(@RequestParam int page, @RequestParam int size) {
        PageRequest pageable = PageRequest.of(page, size);
        return userBusiness.findAll(pageable);
    }

    // 2. Obtener un usuario por su ID
    @GetMapping("/{id}")
    public UserDto getById(@PathVariable Long id) {
        return userBusiness.getById(id);
    }

    // 4. Crear un nuevo usuario
    @PostMapping("/create")
    public UserDto create(@RequestBody UserDto userDto) {
        return userBusiness.save(userDto);
    }

    // 5. Eliminar un usuario por su ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userBusiness.delete(id);
    }
 */
}