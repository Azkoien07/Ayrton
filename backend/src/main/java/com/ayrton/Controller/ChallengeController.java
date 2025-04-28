package com.ayrton.Controller;

import com.ayrton.Business.ChallengeBusiness;
import com.ayrton.Dto.ChallengeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/challenge")
public class ChallengeController {

    @Autowired
    private ChallengeBusiness challengeBusiness;
/*
    // 1. Obtener una lista de todos los desafíos (con paginación)
    @GetMapping
    public Page<ChallengeDto> findAll(@RequestParam int page, @RequestParam int size) {
        PageRequest pageable = PageRequest.of(page, size);
        return challengeBusiness.findAll(pageable);
    }

    // 2. Obtener un desafío por su ID
    @GetMapping("/{id}")
    public ChallengeDto getById(@PathVariable Long id) {
        return challengeBusiness.getById(id);
    }

    // 4. Crear un nuevo desafío
    @PostMapping("/create")
    public ChallengeDto create(@RequestBody ChallengeDto challengeDto) {
        return challengeBusiness.save(challengeDto);
    }

    // 5. Eliminar un desafío por su ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        challengeBusiness.delete(id);
    }
 */
}