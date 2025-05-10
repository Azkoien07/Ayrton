package com.ayrton.Controller;

import com.ayrton.Business.TaskBusiness;
import com.ayrton.Dto.TaskDto;
import com.ayrton.Utilities.Http.ResponseHttp;
import org.springframework.data.domain.Page;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;

import java.util.Map;
@Controller
public class TaskController {

    private final TaskBusiness taskBusiness;

    public TaskController(TaskBusiness taskBusiness) {
        this.taskBusiness = taskBusiness;
    }

    // 1. FindAll Tasks (GraphQL)
    @QueryMapping
    public Map<String, Object> allTasks(@Argument int page, @Argument int size) {
        try {
            Page<TaskDto> taskDtoPage = taskBusiness.findAll(page, size);
            return ResponseHttp.responseHttpFindAll(
                    taskDtoPage.getContent(),
                    ResponseHttp.CODE_OK,
                    "Query ok",
                    taskDtoPage.getTotalPages(),
                    page,
                    (int) taskDtoPage.getTotalElements()
            );
        } catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error retrieving attendances: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 2. FindById Task (GraphQL)
    @QueryMapping
    public Map<String, Object> taskById(@Argument Long id) {
        try {
            TaskDto taskDto = taskBusiness.findById(id);
            return ResponseHttp.responseHttpFindId(
                    taskDto,
                    ResponseHttp.CODE_OK,
                    "Query by id ok"
            );
        } catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error retrieving attendances: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // 4. Add a new Task (GraphQL)
    @MutationMapping
    public Map<String, Object> addTask(@Argument("input") TaskDto taskDto) {
        try {
            TaskDto taskDto1 = taskBusiness.add(taskDto);
            return ResponseHttp.responseHttpAction(
                    taskDto1.getId(),
                    ResponseHttp.CODE_OK,
                    "Add ok"
            );
        }catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error adding attendance: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // 5. Update Task (GraphQL)
    @MutationMapping
    public Map<String, Object> updateTask(@Argument Long id, @Argument ("input")TaskDto taskDto) {
        try {
            taskBusiness.update(id, taskDto );
            return ResponseHttp.responseHttpAction(
                    id,
                    ResponseHttp.CODE_OK,
                    "Update ok"
            );
        }
        catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error updating attendance: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // 5. Delete Task By ID (GraphQL)
    @MutationMapping
    public Map<String, Object> deleteTask(@Argument Long id) {
        try {
            taskBusiness.delete(id);
            return ResponseHttp.responseHttpAction(
                    id,
                    ResponseHttp.CODE_OK,
                    "Delete ok"
            );
        }
        catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error deleting attendance: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}