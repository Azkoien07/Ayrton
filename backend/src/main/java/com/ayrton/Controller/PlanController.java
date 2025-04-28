package com.ayrton.Controller;

import com.ayrton.Business.PlanBusiness;
import com.ayrton.Dto.PlanDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/plan")
public class PlanController {
    @Autowired
    private PlanBusiness planBusiness;
    // 1. Obtener una lista de todos los planes (con paginación)
    /*
    @GetMapping
    public Page<PlanDto> findAll(@RequestParam int page, @RequestParam int size) {
        PageRequest pageable = PageRequest.of(page, size);
        return planBusiness.findAll(pageable);
    }

    // 2. Obtener un plan por su ID
    @GetMapping("/{id}")
    public PlanDto getById(@PathVariable Long id) {
        return planBusiness.getById(id);
    }


    // 4. Crear un nuevo plan
    @PostMapping("/create")
    public PlanDto create(@RequestBody PlanDto planDto) {
        return planBusiness.save(planDto);
    }

    // 5. Eliminar un plan por su ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        planBusiness.delete(id);
    }
     */
}