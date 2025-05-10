package com.ayrton.Controller;

import com.ayrton.Business.VoucherBusiness;
import com.ayrton.Dto.VoucherDto;
import com.ayrton.Utilities.Http.ResponseHttp;
import org.springframework.data.domain.Page;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import java.util.Map;
@Controller
public class VoucherController {

    private final VoucherBusiness voucherBusiness;

    public VoucherController(VoucherBusiness voucherBusiness) {
        this.voucherBusiness = voucherBusiness;
    }

    // 1. FindAll Vouchers (GraphQL)
    @QueryMapping
    public Map<String, Object> allChallenges(@Argument int page, @Argument int size) {
        try {
            Page<VoucherDto> voucherDtoPage = voucherBusiness.findAll(page, size);
            return ResponseHttp.responseHttpFindAll(
                    voucherDtoPage.getContent(),
                    ResponseHttp.CODE_OK,
                    "Query ok",
                    voucherDtoPage.getTotalPages(),
                    page,
                    (int) voucherDtoPage.getTotalElements()
            );
        } catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error retrieving attendances: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 2. FindById Voucher (GraphQL)
    @QueryMapping
    public Map<String, Object> attendanceById(@Argument Long id) {
        try {
            VoucherDto voucherDto = voucherBusiness.findById(id);
            return ResponseHttp.responseHttpFindId(
                    voucherDto,
                    ResponseHttp.CODE_OK,
                    "Query by id ok"
            );
        } catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error retrieving attendances: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // 4. Add a new Voucher (GraphQL)
    @MutationMapping
    public Map<String, Object> addChallenge(@Argument("input") VoucherDto voucherDto) {
        try {
            VoucherDto voucherDto1 = voucherBusiness.add(voucherDto);
            return ResponseHttp.responseHttpAction(
                    voucherDto1.getId(),
                    ResponseHttp.CODE_OK,
                    "Add ok"
            );
        }catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error adding attendance: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // 5. Update Voucher (GraphQL)
    @MutationMapping
    public Map<String, Object> updateChallenge(@Argument Long id, @Argument ("input")VoucherDto voucherDto) {
        try {
            voucherBusiness.update(id, voucherDto );
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

    // 5. Delete Voucher By ID (GraphQL)
    @MutationMapping
    public Map<String, Object> deleteAttendance(@Argument Long id) {
        try {
            voucherBusiness.delete(id);
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