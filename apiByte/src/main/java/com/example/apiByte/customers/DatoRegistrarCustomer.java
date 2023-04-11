package com.example.apiByte.customers;

import com.example.apiByte.direccion.DatoDireccion;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record DatoRegistrarCustomer(

        @NotBlank
        String company_name,
        @NotBlank
        String contact_name,
        @NotBlank
        String contact_title,
        @NotBlank
        @Pattern(regexp = "^(\\+\\d{1,3}( )?)?((\\(\\d{3}\\))|\\d{3})[- .]?\\d{3}[- .]?\\d{4}$", message = "Formato de teléfono no válido")
        String phone,
        @NotBlank
        String fax,
        @NotNull
        @Valid
        DatoDireccion direccion

) { }
