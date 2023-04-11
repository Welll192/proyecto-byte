package com.example.apiByte.direccion;


import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class Direccion {

    private String address;

    private String city;

    private String region;

    private String postal_code;

    private String country;


    public Direccion(DatoDireccion direccion) {
        this.address = direccion.address();
        this.country = direccion.country();
        this.city = direccion.city();
        this.postal_code = direccion.postal_code();
        this.region = direccion.region();
    }

    public Direccion actualizarDireccion(DatoDireccion direccion) {
        this.region = direccion.region();
        this.city = direccion.city();
        this.country = direccion.country();
        this.address = direccion.address();
        this.postal_code = direccion.postal_code();
        return this;
    }
}
