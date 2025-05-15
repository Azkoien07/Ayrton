package com.ayrton.Utilities.Http;

import org.springframework.http.HttpStatus;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class ResponseHttp {
    public static final String CODE_OK = "200";
    public static final String CODE_BAD = "400";
    public static final String NO_CONTENT = "204";

    // FindAll
    public static Map<String, Object> responseHttpFindAll(Object data, String code, String msm, int size, int page, int items) {
        Map<String, Object> response = new HashMap<>();
        response.put("date", new Date());
        response.put("code", code);
        response.put("message", msm);
        response.put("currentPage", page);
        response.put("totalItems", items);
        response.put("totalPages", size);
        response.put("data", data);

        return response;
    }

    public static Map<String, Object> responseHttpFindAllList(Object data, String code, String msm, int size) {
        Map<String, Object> response = new HashMap<>();
        response.put("date", new Date());
        response.put("code", code);
        response.put("message", msm);
        response.put("totalItems", size);
        response.put("data", data);
        return response;
    }

    // FindById
    public static Map<String, Object> responseHttpFindId(Object data, String code, String msm) {

        Map<String, Object> response = new HashMap<>();
        response.put("date", new Date());
        response.put("code", code);
        response.put("message", msm);
        response.put("data", data);

        return response;
    }

    // Post, Put and Delete
    public static Map<String, Object> responseHttpAction(Long data, String code, String msm) {

        Map<String, Object> response = new HashMap<>();
        response.put("id", data);
        response.put("date", new Date());
        response.put("code", code);
        response.put("message", msm);
        return response;
    }

    // Error
    public static Map<String, Object> responseHttpError(String message, HttpStatus codeMessage) {
        Map<String, Object> response = new HashMap<>();

        response.put("date", new Date());
        response.put("code", codeMessage.value());
        response.put("message", message);

        return response;
    }
}