package com.ayrton.Controller;

import com.ayrton.Business.PqrBusiness;
import com.ayrton.Dto.PqrDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pqr")
public class PqrController {
    @Autowired
    private PqrBusiness pqrBusiness;
    /*
    // 1. Obtener una lista de todos los pqrs (con paginación)
    @GetMapping
    public Page<PqrDto> findAll(@RequestParam int page, @RequestParam int size) {
        PageRequest pageable = PageRequest.of(page, size);
        return pqrBusiness.findAll(pageable);
    }

    // 2. Obtener un pqr por su ID
    @GetMapping("/{id}")
    public PqrDto getById(@PathVariable Long id) {
        return pqrBusiness.getById(id);
    }

    // 4. Crear un nuevo pqr
    @PostMapping("/create")
    public PqrDto create(@RequestBody PqrDto pqrDto) {
        return pqrBusiness.save(pqrDto);
    }

    // 5. Eliminar un pqr por su ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        pqrBusiness.delete(id);
    }
     */
}