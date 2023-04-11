package com.example.apiByte.customers;

import com.example.apiByte.direccion.Direccion;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(name = "customer")
@Entity(name = "customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customer_id;
    private String company_name;
    private String contact_name;
    private String contact_title;
    private String phone;
    private String fax;
    @Embedded
    private Direccion direccion;


    public Customer(DatoRegistrarCustomer datoRegistrarCustomer) {
        this.company_name = datoRegistrarCustomer.company_name();
        this.contact_name = datoRegistrarCustomer.contact_name();
        this.contact_title = datoRegistrarCustomer.contact_title();
        this.direccion = new Direccion(datoRegistrarCustomer.direccion());
        this.phone = datoRegistrarCustomer.phone();
        this.fax = datoRegistrarCustomer.fax();
    }


    public void actualizarDatos(DatoActualizarCustomer datoActualizarCustomer) {
        if(datoActualizarCustomer.company_name() != null) this.company_name = datoActualizarCustomer.company_name();
        if(datoActualizarCustomer.contact_name() != null) this.contact_name = datoActualizarCustomer.contact_name();
        if(datoActualizarCustomer.contact_title() != null) this.contact_title = datoActualizarCustomer.contact_title();
        if(datoActualizarCustomer.phone() != null) this.phone = datoActualizarCustomer.phone();
        if(datoActualizarCustomer.fax() != null) this.fax = datoActualizarCustomer.fax();
        if(datoActualizarCustomer.direccion() != null) this.direccion = direccion.actualizarDireccion(datoActualizarCustomer.direccion());
    }
}
