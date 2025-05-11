package com.ayrton.Controller;

import com.ayrton.Business.PqrBusiness;
import com.ayrton.Dto.PqrDto;
import com.ayrton.Utilities.Http.ResponseHttp;
import org.springframework.data.domain.Page;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;

import java.util.Map;
@Controller
public class PqrController {

    private final PqrBusiness pqrBusiness;

    public PqrController(PqrBusiness pqrBusiness) {
        this.pqrBusiness = pqrBusiness;
    }

    // 1. FindAll Pqrs (GraphQL)
    @QueryMapping
    public Map<String, Object> allPqrs(@Argument int page, @Argument int size) {
        try {
            Page<PqrDto> pqrDtoPage = pqrBusiness.findAll(page, size);
            return ResponseHttp.responseHttpFindAll(
                    pqrDtoPage.getContent(),
                    ResponseHttp.CODE_OK,
                    "Query ok",
                    pqrDtoPage.getTotalPages(),
                    page,
                    (int) pqrDtoPage.getTotalElements()
            );
        } catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error retrieving pqrs: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 2. FindById Pqr (GraphQL)
    @QueryMapping
    public Map<String, Object> pqrById(@Argument Long id) {
        try {
            PqrDto pqrDto = pqrBusiness.findById(id);
            return ResponseHttp.responseHttpFindId(
                    pqrDto,
                    ResponseHttp.CODE_OK,
                    "Query by id ok"
            );
        } catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error retrieving pqr: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // 3. Add a new Pqr (GraphQL)
    @MutationMapping
    public Map<String, Object> addPqr(@Argument("input") PqrDto pqrDto) {
        try {
            PqrDto pqrDto1 = pqrBusiness.add(pqrDto);
            return ResponseHttp.responseHttpAction(
                    pqrDto1.getId(),
                    ResponseHttp.CODE_OK,
                    "Add ok"
            );
        }catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error adding pqr: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // 4. Update Pqr (GraphQL)
    @MutationMapping
    public Map<String, Object> updatePqr(@Argument Long id, @Argument ("input")PqrDto pqrDto) {
        try {
            pqrBusiness.update(id, pqrDto );
            return ResponseHttp.responseHttpAction(
                    id,
                    ResponseHttp.CODE_OK,
                    "Update ok"
            );
        }
        catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error updating pqr: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // 5. Delete Pqr By ID (GraphQL)
    @MutationMapping
    public Map<String, Object> deletePqr(@Argument Long id) {
        try {
            pqrBusiness.delete(id);
            return ResponseHttp.responseHttpAction(
                    id,
                    ResponseHttp.CODE_OK,
                    "Delete ok"
            );
        }
        catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error deleting pqr: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}