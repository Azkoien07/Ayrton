package com.ayrton.Controller;

import com.ayrton.Business.RoleBusiness;
import com.ayrton.Dto.RoleDto;
import com.ayrton.Utilities.Http.ResponseHttp;
import org.springframework.data.domain.Page;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;

import java.util.Map;
@Controller
public class RoleController {

    private final RoleBusiness roleBusiness;

    public RoleController(RoleBusiness roleBusiness) {
        this.roleBusiness = roleBusiness;
    }

    // 1. FindAll Roles (GraphQL)
    @QueryMapping
    public Map<String, Object> allRoles(@Argument int page, @Argument int size) {
        try {
            Page<RoleDto> roleDtoPage = roleBusiness.findAll(page, size);
            return ResponseHttp.responseHttpFindAll(
                    roleDtoPage.getContent(),
                    ResponseHttp.CODE_OK,
                    "Query ok",
                    roleDtoPage.getTotalPages(),
                    page,
                    (int) roleDtoPage.getTotalElements()
            );
        } catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error retrieving attendances: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 2. FindById Role (GraphQL)
    @QueryMapping
    public Map<String, Object> roleById(@Argument Long id) {
        try {
            RoleDto roleDto = roleBusiness.findById(id);
            return ResponseHttp.responseHttpFindId(
                    roleDto,
                    ResponseHttp.CODE_OK,
                    "Query by id ok"
            );
        } catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error retrieving attendances: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // 4. Add a new Role (GraphQL)
    @MutationMapping
    public Map<String, Object> addRole(@Argument("input") RoleDto roleDto) {
        try {
            RoleDto roleDto1 = roleBusiness.add(roleDto);
            return ResponseHttp.responseHttpAction(
                    roleDto1.getId(),
                    ResponseHttp.CODE_OK,
                    "Add ok"
            );
        }catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error adding attendance: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // 5. Update Role (GraphQL)
    @MutationMapping
    public Map<String, Object> updateRole(@Argument Long id, @Argument ("input")RoleDto roleDto) {
        try {
            roleBusiness.update(id, roleDto );
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

    // 5. Delete Role By ID (GraphQL)
    @MutationMapping
    public Map<String, Object> deleteRole(@Argument Long id) {
        try {
            roleBusiness.delete(id);
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