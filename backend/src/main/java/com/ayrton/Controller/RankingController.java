package com.ayrton.Controller;

import com.ayrton.Business.RankingBusiness;
import com.ayrton.Dto.RankingDto;
import com.ayrton.Utilities.Http.ResponseHttp;
import org.springframework.data.domain.Page;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import java.util.Map;
@Controller
public class RankingController {

    private final RankingBusiness RankingBusiness;

    public RankingController(RankingBusiness rankingBusiness) {
        RankingBusiness = rankingBusiness;
    }

    // 1. FindAll Rankings (GraphQL)
    @QueryMapping
    public Map<String, Object> allRankings(@Argument int page, @Argument int size) {
        try {
            Page<RankingDto> RankingDtoPage = RankingBusiness.findAll(page, size);
            return ResponseHttp.responseHttpFindAll(
                    RankingDtoPage.getContent(),
                    ResponseHttp.CODE_OK,
                    "Query ok",
                    RankingDtoPage.getTotalPages(),
                    page,
                    (int) RankingDtoPage.getTotalElements()
            );
        } catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error retrieving attendances: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 2. FindById Ranking (GraphQL)
    @QueryMapping
    public Map<String, Object> rankingById(@Argument Long id) {
        try {
            RankingDto rankingDto = RankingBusiness.findById(id);
            return ResponseHttp.responseHttpFindId(
                    rankingDto,
                    ResponseHttp.CODE_OK,
                    "Query by id ok"
            );
        } catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error retrieving attendances: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // 4. Add a new Ranking (GraphQL)
    @MutationMapping
    public Map<String, Object> addRanking(@Argument("input") RankingDto rankingDto) {
        try {
            RankingDto rankingDto1 = RankingBusiness.add(rankingDto);
            return ResponseHttp.responseHttpAction(
                    rankingDto1.getId(),
                    ResponseHttp.CODE_OK,
                    "Add ok"
            );
        }catch (Exception e) {
            return ResponseHttp.responseHttpError(
                    "Error adding attendance: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // 5. Update Ranking (GraphQL)
    @MutationMapping
    public Map<String, Object> updateRanking(@Argument Long id, @Argument ("input")RankingDto rankingDto) {
        try {
            RankingBusiness.update(id, rankingDto );
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

    // 5. Delete Ranking By ID (GraphQL)
    @MutationMapping
    public Map<String, Object> deleteRanking(@Argument Long id) {
        try {
            RankingBusiness.delete(id);
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