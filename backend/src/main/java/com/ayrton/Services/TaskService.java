package com.ayrton.Services;

import com.ayrton.Entity.TaskEntity;
import com.ayrton.Repository.TaskRepository;
import com.ayrton.Services.Dao.Idao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService implements Idao<TaskEntity,Long> {
    @Autowired
    private TaskRepository taskRepository;

    // Metodos
    @Override
    public TaskEntity getById(Long id) {
        return null;
    }

    @Override
    public void save(TaskEntity obje) {

    }
    @Override
    public void saveAll(Iterable<TaskEntity> obje) {

    }
    @Override
    public void delete(TaskEntity obje) {

    }
}