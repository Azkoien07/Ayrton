package com.ayrton.Controller;

import com.ayrton.Business.UserBusiness;
import com.ayrton.Dto.UserDto;
import com.ayrton.Utilities.Http.ResponseHttp;
import org.springframework.data.domain.Page;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import java.util.Map;
@Controller
public class UserController {

    private final UserBusiness userBusiness;

    public UserController(UserBusiness userBusiness) {
        this.userBusiness = userBusiness;
    }

    // 1. FindAll Users (GraphQL)
    @QueryMapping
    public Map<String, Object> allUsers(@Argument int page, @Argument int size) {
        try {
            Page<UserDto> userDtoPage = userBusiness.findAll(page, size);
            return ResponseHttp.responseHttpFindAll(
                    userDtoPage.getContent(),
                    ResponseHttp.CODE_OK,
                    "Query ok",
                    userDtoPage.getTotalPages(),
                    page,
                    (int) userDtoPage.getTotalElements()
            );
        } catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error retrieving attendances: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 2. FindById User (GraphQL)
    @QueryMapping
    public Map<String, Object> userById(@Argument Long id) {
        try {
            UserDto userDto = userBusiness.findById(id);
            return ResponseHttp.responseHttpFindId(
                    userDto,
                    ResponseHttp.CODE_OK,
                    "Query by id ok"
            );
        } catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error retrieving attendances: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // 4. Add a new User (GraphQL)
    @MutationMapping
    public Map<String, Object> addUser(@Argument("input") UserDto userDto) {
        try {
            UserDto userDto1 = userBusiness.add(userDto);
            return ResponseHttp.responseHttpAction(
                    userDto1.getId(),
                    ResponseHttp.CODE_OK,
                    "Add ok"
            );
        }catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error adding attendance: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // 5. Update User (GraphQL)
    @MutationMapping
    public Map<String, Object> updateUser(@Argument Long id, @Argument ("input")UserDto userDto) {
        try {
            userBusiness.update(id, userDto );
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

    // 5. Delete User By ID (GraphQL)
    @MutationMapping
    public Map<String, Object> deleteUser(@Argument Long id) {
        try {
            userBusiness.delete(id);
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