package com.example.apiByte.HandleErrors;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class tratadorDeErrores {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity trataError404(){
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity trataError400(MethodArgumentNotValidException e){

        var errores = e.getFieldErrors().stream().map(DatosErrorValidacion::new).toList();

        return ResponseEntity.badRequest().body(errores);
    }

    private record DatosErrorValidacion(String field, String error){

        public DatosErrorValidacion(FieldError fieldError){
            this(fieldError.getField(), fieldError.getDefaultMessage());
        }

    }
}
