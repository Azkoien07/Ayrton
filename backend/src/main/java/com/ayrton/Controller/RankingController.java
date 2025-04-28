package com.ayrton.Controller;

import com.ayrton.Business.RankingBusiness;
import com.ayrton.Dto.RankingDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ranking")
public class RankingController {
    @Autowired
    private RankingBusiness rankingBusiness;

    /*
    // 1. Obtener una lista de todos los rankings (con paginación)
    @GetMapping
    public Page<RankingDto> findAll(@RequestParam int page, @RequestParam int size) {
        PageRequest pageable = PageRequest.of(page, size);
        return rankingBusiness.findAll(pageable);
    }

    // 2. Obtener un ranking por su ID
    @GetMapping("/{id}")
    public RankingDto getById(@PathVariable Long id) {
        return rankingBusiness.getById(id);
    }

    // 4. Crear un nuevo ranking
    @PostMapping("/create")
    public RankingDto create(@RequestBody RankingDto rankingDto) {
        return rankingBusiness.save(rankingDto);
    }

    // 5. Eliminar un ranking por su ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        rankingBusiness.delete(id);
    }
     */
}