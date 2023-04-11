package com.example.apiByte.controllers;

import com.example.apiByte.customers.Customer;
import com.example.apiByte.customers.CustomerRepository;
import com.example.apiByte.customers.DatoActualizarCustomer;
import com.example.apiByte.customers.DatoRegistrarCustomer;
import com.example.apiByte.direccion.Direccion;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    private CustomerRepository customerRepository;

    public CustomerController(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

    // Crear customer
    @PostMapping
    public ResponseEntity crearCustomer(@RequestBody @Valid DatoRegistrarCustomer datoRegistrarCustomer){

        Customer customer = customerRepository.getReferenceByPhone(datoRegistrarCustomer.phone());
        if(customer==null){
            customerRepository.save(new Customer(datoRegistrarCustomer));
            return  ResponseEntity.ok().build();
        }else {
            return ResponseEntity.badRequest().body("Phone number already registered");
        }

    }

    // Listar customer
    @GetMapping
    public Page<Customer> listarCustomer(Pageable paginacion){
        return customerRepository.findAll(paginacion);
    }

    // eliminar customer
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity eliminarCustomer(@PathVariable Long id){

        Customer customer = customerRepository.getReferenceById(id);
        System.out.println(customer);
        customerRepository.delete(customer);
        return ResponseEntity.noContent().build();

    }

    // actualizar customer

    @PutMapping
    @Transactional
    public ResponseEntity<Customer> actualizarCustomer(@RequestBody @Valid DatoActualizarCustomer datoActualizarCustomer){

            System.out.println(datoActualizarCustomer);

            Customer customer = customerRepository.getReferenceById(datoActualizarCustomer.customer_id());
            customer.actualizarDatos(datoActualizarCustomer);

            Customer customerActualizado = new Customer(customer.getCustomer_id(), customer.getCompany_name(),
                                                        customer.getContact_name(),customer.getContact_title(),
                                                        customer.getPhone(),customer.getFax(), new Direccion(
                                                                customer.getDireccion().getAddress(),customer.getDireccion().getCity(),
                                                                customer.getDireccion().getRegion(),customer.getDireccion().getPostal_code(),
                                                                customer.getDireccion().getPostal_code()));

            return ResponseEntity.ok(customerActualizado);

    }
    

}
