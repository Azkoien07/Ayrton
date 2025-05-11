package com.ayrton.Controller;

import com.ayrton.Business.ChallengeBusiness;
import com.ayrton.Dto.ChallengeDto;
import com.ayrton.Utilities.Http.ResponseHttp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@Controller
public class ChallengeController {
    private final ChallengeBusiness challengeBusiness;

    public ChallengeController(ChallengeBusiness challengeBusiness) {
        this.challengeBusiness = challengeBusiness;
    }

    // 1. FindAll Challenge (GraphQL)
    @QueryMapping
    public Map<String, Object> allChallenges(@Argument int page, @Argument int size) {
        try {
            Page<ChallengeDto> challengeDtoPage = challengeBusiness.findAll(page, size);
            return ResponseHttp.responseHttpFindAll(
                    challengeDtoPage.getContent(),
                    ResponseHttp.CODE_OK,
                    "Query ok",
                    challengeDtoPage.getTotalPages(),
                    page,
                    (int) challengeDtoPage.getTotalElements()
            );
        } catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error retrieving attendances: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 2. FindById Challenge (GraphQL)
    @QueryMapping
    public Map<String, Object> challengeById(@Argument Long id) {
        try {
            ChallengeDto challengeDto = challengeBusiness.findById(id);
            return ResponseHttp.responseHttpFindId(
                    challengeDto,
                    ResponseHttp.CODE_OK,
                    "Query by id ok"
            );
        } catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error retrieving attendances: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // 4. Add a new Challenge (GraphQL)
    @MutationMapping
    public Map<String, Object> addChallenge(@Argument("input") ChallengeDto challengeDto) {
        try {
            ChallengeDto challengeDto1 = challengeBusiness.add(challengeDto);
            return ResponseHttp.responseHttpAction(
                    challengeDto1.getId(),
                    ResponseHttp.CODE_OK,
                    "Add ok"
            );
        }catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error adding attendance: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // 5. Update Challenge (GraphQL)
    @MutationMapping
    public Map<String, Object> updateChallenge(@Argument Long id, @Argument ("input")ChallengeDto challengeDto) {
        try {
            challengeBusiness.update(id, challengeDto );
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

    // 5. Delete Challenge By ID (GraphQL)
    @MutationMapping
    public Map<String, Object> deleteChallenge(@Argument Long id) {
        try {
            challengeBusiness.delete(id);
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
