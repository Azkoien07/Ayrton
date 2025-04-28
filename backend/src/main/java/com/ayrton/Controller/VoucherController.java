package com.ayrton.Controller;

import com.ayrton.Business.VoucherBusiness;
import com.ayrton.Dto.VoucherDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/voucher")
public class VoucherController {
    @Autowired
    private VoucherBusiness voucherBusiness;
/*
    // 1. Obtener una lista de todos los vouchers (con paginación)
    @GetMapping
    public Page<VoucherDto> findAll(@RequestParam int page, @RequestParam int size) {
        PageRequest pageable = PageRequest.of(page, size);
        return voucherBusiness.findAll(pageable);
    }

    // 2. Obtener un voucher por su ID
    @GetMapping("/{id}")
    public VoucherDto getById(@PathVariable Long id) {
        return voucherBusiness.getById(id);
    }

    // 4. Crear un nuevo voucher
    @PostMapping("/create")
    public VoucherDto create(@RequestBody VoucherDto voucherDto) {
        return voucherBusiness.save(voucherDto);
    }

    // 5. Eliminar un voucher por su ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        voucherBusiness.delete(id);
    }
 */
}