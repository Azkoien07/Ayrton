package com.ayrton.Business;

import com.ayrton.Services.TaskService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskBusiness {
    @Autowired
    private final TaskService taskService;
    private final ModelMapper modelMapper = new ModelMapper();

    public TaskBusiness(TaskService taskService) {
        this.taskService = taskService;
    }
}
