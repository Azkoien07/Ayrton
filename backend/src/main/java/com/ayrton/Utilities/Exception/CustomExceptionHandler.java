package com.ayrton.Utilities.Exception;

import com.ayrton.Utilities.Http.ResponseHttp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> handleCustomException(CustomException e){
        return new ResponseEntity<>(ResponseHttp.responseHttpError("¡ERROR! " + e.getMessage(), e.getHttpStatus()), e.getHttpStatus());
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Object> handleMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException ex, WebRequest request) {
        return new ResponseEntity<>(ResponseHttp.responseHttpError("¡ERROR! " + "Invalid parameter type.", HttpStatus.BAD_REQUEST), HttpStatus.BAD_REQUEST);
    }
}
