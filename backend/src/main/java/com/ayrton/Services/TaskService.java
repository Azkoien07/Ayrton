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

    // Metodos
    @Override
    public Page<TaskEntity> findAll(PageRequest pageable) {
        return taskRepository.findAll(pageable);
    }

    @Override
    public List<TaskEntity> getAll() {
        return taskRepository.findAll();
    }

    @Override
    public TaskEntity getById(Long id) {
        Optional<TaskEntity> challenge = taskRepository.findById(id);
        return challenge.orElse(null);
    }

    @Transactional
    @Override
    public void create(TaskEntity entity) {
        if (entity.getId() == null || !taskRepository.existsById(entity.getId())) {
            taskRepository.save(entity);
        }
    }

    @Transactional
    @Override
    public void update(TaskEntity entity) {
        if (entity.getId() != null && taskRepository.existsById(entity.getId())) {
            taskRepository.save(entity);
        }
    }

    @Transactional
    @Override
    public void delete(Long id) {
        taskRepository.deleteById(id);
    }
}