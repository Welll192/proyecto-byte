import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import baseUrl from './helper';
import { Observable } from "rxjs"
import { Customer } from "../Interfaces/customer"

@Injectable({
	providedIn: 'root'
})
export class CustomerService {

	constructor(private httpCLient :HttpClient) { }
 

	listarCustomers():Observable<any>{
		return this.httpCLient.get<any>(`${baseUrl}`);
	}

	crearCustomer(modelo: Customer):Observable<any>{
		return this.httpCLient.post<any>(`${baseUrl}`,modelo)
	}

	actualizarCustomer(modelo:Customer):Observable<Customer>{
		return this.httpCLient.put<Customer>(`${baseUrl}`,modelo)
	}
	
	eliminarCustomer(modelo:Customer):Observable<void>{
		return this.httpCLient.delete<void>(`${baseUrl}/${modelo.customer_id}`)
	}

}
