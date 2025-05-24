package com.ayrton.Controller;

import com.ayrton.Business.PlanBusiness;
import com.ayrton.Dto.PlanDto;
import com.ayrton.Utilities.Http.ResponseHttp;
import org.springframework.data.domain.Page;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import java.util.Map;
@Controller
public class PlanController {

    private final PlanBusiness planBusiness;

    public PlanController(PlanBusiness planBusiness) {
        this.planBusiness = planBusiness;
    }

    // 1. FindAll Plans (GraphQL)
    @QueryMapping
    public Map<String, Object> allPlans(@Argument int page, @Argument int size) {
        try {
            Page<PlanDto> planDtoPage = planBusiness.findAll(page, size);
            return ResponseHttp.responseHttpFindAll(
                    planDtoPage.getContent(),
                    ResponseHttp.CODE_OK,
                    "Query ok",
                    planDtoPage.getTotalPages(),
                    page,
                    (int) planDtoPage.getTotalElements()
            );
        } catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error retrieving payments: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 2. FindById Plan (GraphQL)
    @QueryMapping
    public Map<String, Object> planById(@Argument Long id) {
        try {
            PlanDto planDto = planBusiness.findById(id);
            return ResponseHttp.responseHttpFindId(
                    planDto,
                    ResponseHttp.CODE_OK,
                    "Query by id ok"
            );
        } catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error retrieving payment: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // 3. Add a new Plan (GraphQL)
    @MutationMapping
    public Map<String, Object> addPlan(@Argument("input") PlanDto planDto) {
        try {
            PlanDto planDto1 = planBusiness.add(planDto);
            return ResponseHttp.responseHttpAction(
                    planDto1.getId(),
                    ResponseHttp.CODE_OK,
                    "Add ok"
            );
        }catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error adding payment: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // 4. Update Plan (GraphQL)
    @MutationMapping
    public Map<String, Object> updatePlan(@Argument Long id, @Argument ("input")PlanDto planDto) {
        try {
            planBusiness.update(id, planDto );
            return ResponseHttp.responseHttpAction(
                    id,
                    ResponseHttp.CODE_OK,
                    "Update ok"
            );
        }
        catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error updating payments: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // 5. Delete Plan By ID (GraphQL)
    @MutationMapping
    public Map<String, Object> deletePlan(@Argument Long id) {
        try {
            planBusiness.delete(id);
            return ResponseHttp.responseHttpAction(
                    id,
                    ResponseHttp.CODE_OK,
                    "Delete ok"
            );
        }
        catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error deleting payment: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}