package com.example.apiByte.direccion;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record DatoDireccion(

        @NotBlank(message = "Tiene que registrar una direccion ")
        String address,
        @NotBlank(message = "Tiene que registrar una ciudad")
        String city,
        @NotBlank(message = "Tiene que registrar una region")
        String region,
        @NotBlank(message = "Tiene que registrar un codigo postal")
        @Pattern(regexp = "^(?:0[1-9]|[1-4]\\d|5[0-2])\\d{3}$",message = "Formato de código postal inválido")
        String postal_code,
        @NotBlank(message = "Tiene que registrar un pais")
        String country

) { }
