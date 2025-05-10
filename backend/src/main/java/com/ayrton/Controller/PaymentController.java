package com.ayrton.Controller;

import com.ayrton.Business.PaymentBusiness;
import com.ayrton.Dto.PaymentDto;
import com.ayrton.Utilities.Http.ResponseHttp;
import org.springframework.data.domain.Page;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import java.util.Map;

@Controller
public class PaymentController {

    private final PaymentBusiness paymentBusiness;

    public PaymentController(PaymentBusiness paymentBusiness) {
        this.paymentBusiness = paymentBusiness;
    }

    // 1. FindAll Payments (GraphQL)
    @QueryMapping
    public Map<String, Object> allPayment(@Argument int page, @Argument int size) {
        try {
            Page<PaymentDto> paymentDtoPage = paymentBusiness.findAll(page, size);
            return ResponseHttp.responseHttpFindAll(
                    paymentDtoPage.getContent(),
                    ResponseHttp.CODE_OK,
                    "Query ok",
                    paymentDtoPage.getTotalPages(),
                    page,
                    (int) paymentDtoPage.getTotalElements()
            );
        } catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error retrieving attendances: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 2. FindById Payment (GraphQL)
    @QueryMapping
    public Map<String, Object> paymentById(@Argument Long id) {
        try {
            PaymentDto paymentDto = paymentBusiness.findById(id);
            return ResponseHttp.responseHttpFindId(
                    paymentDto,
                    ResponseHttp.CODE_OK,
                    "Query by id ok"
            );
        } catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error retrieving attendances: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // 4. Add a new Payment (GraphQL)
    @MutationMapping
    public Map<String, Object> addPayment(@Argument("input") PaymentDto paymentDto) {
        try {
            PaymentDto paymentDto1 = paymentBusiness.add(paymentDto);
            return ResponseHttp.responseHttpAction(
                    paymentDto1.getId(),
                    ResponseHttp.CODE_OK,
                    "Add ok"
            );
        }catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error adding attendance: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // 5. Update Payment (GraphQL)
    @MutationMapping
    public Map<String, Object> updatePayment(@Argument Long id, @Argument ("input")PaymentDto paymentDto) {
        try {
            paymentBusiness.update(id, paymentDto );
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

    // 5. Delete Payment By ID (GraphQL)
    @MutationMapping
    public Map<String, Object> deletePayment(@Argument Long id) {
        try {
            paymentBusiness.delete(id);
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