package com.ayrton.Controller;

import com.ayrton.Business.TaskBusiness;
import com.ayrton.Dto.TaskDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/task")
public class TaskController {
    @Autowired
    private TaskBusiness taskBusiness;
/*
    // 1. Obtener una lista de todas las tareas (con paginación)
    @GetMapping
    public Page<TaskDto> findAll(@RequestParam int page, @RequestParam int size) {
        PageRequest pageable = PageRequest.of(page, size);
        return taskBusiness.findAll(pageable);
    }

    // 2. Obtener una tarea por su ID
    @GetMapping("/{id}")
    public TaskDto getById(@PathVariable Long id) {
        return taskBusiness.getById(id);
    }

    // 4. Crear una nueva tarea
    @PostMapping("/create")
    public TaskDto create(@RequestBody TaskDto taskDto) {
        return taskBusiness.save(taskDto);
    }

    // 5. Eliminar una tarea por su ID
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        taskBusiness.delete(id);
    }
 */
}