package com.ayrton.Business;

import com.ayrton.Dto.TaskDto;
import com.ayrton.Entity.TaskEntity;
import com.ayrton.Services.TaskService;
import com.ayrton.Utilities.Exception.CustomException;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;


@Component
public class TaskBusiness {

    private final TaskService taskService;
    private final ModelMapper modelMapper = new ModelMapper();

    public TaskBusiness(TaskService taskService) {
        this.taskService = taskService;
    }

    // Find All
    public Page<TaskDto> findAll(int page, int size) {
        try {
            PageRequest pageRequest = PageRequest.of(page, size);
            Page<TaskEntity> taskEntityPage = taskService.findAll(pageRequest);
            return taskEntityPage.map(entity -> modelMapper.map(entity, TaskDto.class));
        } catch (Exception e) {
            throw new CustomException("Error getting Administrative: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Find By Id
    public TaskDto findById(Long id) {
        try {
            TaskEntity task = taskService.getById(id);
            return modelMapper.map(task, TaskDto.class);
        } catch (Exception e) {
            throw new CustomException("Error getting Administrative: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Add
    public TaskDto add(TaskDto taskDto) {
        try {
            TaskEntity taskEntity = modelMapper.map(taskDto, TaskEntity.class);
            return modelMapper.map(taskService.create(taskEntity), TaskDto.class);
        } catch (Exception e) {
            throw new CustomException("Error adding Administrative: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Update
    public void update(Long id, TaskDto taskDto) {
        try{
            taskDto.setId(id);
            TaskEntity taskEntity = modelMapper.map(taskDto, TaskEntity.class);
            taskService.update(taskEntity);
        } catch (Exception e) {
            throw new CustomException("Error updating Administrative: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Delete
    public void delete(Long id) {
        try{
            taskService.delete(id);
        } catch (Exception e) {
            throw new CustomException("Error deleting Administrative: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}