package com.ayrton.Services;

import com.ayrton.Entity.TaskEntity;
import com.ayrton.Entity.TaskEntity;
import com.ayrton.Entity.TaskEntity;
import com.ayrton.Repository.TaskRepository;
import com.ayrton.Services.Dao.Idao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService implements Idao<TaskEntity,Long> {
    @Autowired
    private TaskRepository taskRepository;

    // Métodos

    // FindAll
    @Override
    public Page<TaskEntity> findAll(PageRequest pageable) {
        return taskRepository.findAll(pageable);
    }

    // FindAll (without pagination)
    @Override
    public List<TaskEntity> getAll() {
        return taskRepository.findAll();
    }

    // GetById
    @Override
    public TaskEntity getById(Long id) {
        Optional<TaskEntity> challenge = taskRepository.findById(id);
        return challenge.orElse(null);
    }

    // Delete
    @Transactional
    @Override
    public TaskEntity create(TaskEntity entity) {
        if (entity.getId() == null || !taskRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("La tarea con ID " + entity.getId() + " ya existe.");
        }
        return taskRepository.save(entity);
    }

    // Update
    @Transactional
    @Override
    public TaskEntity update(TaskEntity entity) {
        if (entity.getId() != null && taskRepository.existsById(entity.getId())) {
            throw new IllegalArgumentException("No se puede actualizar una tarea que no existe o sin ID.");
        }
        return taskRepository.save(entity);
    }

    // Delete
    @Transactional
    @Override
    public void delete(Long id) {
        taskRepository.deleteById(id);
    }
}