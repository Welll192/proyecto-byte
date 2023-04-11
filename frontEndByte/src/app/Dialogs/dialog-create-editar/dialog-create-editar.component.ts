import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms"
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { MatSnackBar } from "@angular/material/snack-bar"
import { Customer } from 'src/app/Interfaces/customer';
import { CustomerService } from "src/app/Services/customer.service"

@Component({
	selector: 'app-dialog-create-editar',
	templateUrl: './dialog-create-editar.component.html',
	styleUrls: ['./dialog-create-editar.component.css'],
})
export class DialogCreateEditarComponent implements OnInit {

	formCustomer: FormGroup;
	botonAccion:String="Save";
	tituloForm: String="New";

	constructor(
		private dialogoReferencia:MatDialogRef<DialogCreateEditarComponent>,
		private formBuilder : FormBuilder,
		private _snackBar: MatSnackBar,
		private _customerService: CustomerService,
		@Inject (MAT_DIALOG_DATA) public dataCustomer: Customer
	){

		this.formCustomer = this.formBuilder.group({
			company_name:["",Validators.required],
			contact_name:["",Validators.required],
			contact_title:["",Validators.required],
			phone:["",Validators.required],
			fax:["",Validators.required],
			address:["",Validators.required],
			city:["",Validators.required],
			region:["",Validators.required],
			postal_code:["",Validators.required],
			country:["",Validators.required]
			  
		})



	}


	mostrarAlerta(message: string, action: string) {
		this._snackBar.open(message, action,{
			horizontalPosition:"end",
			verticalPosition:"top",
			duration:3000
		});
	  }

	  createEditarCustomer(){
		// console.log(this.formCustomer);
		// console.log(this.formCustomer.value);
		const modelo: Customer={
			company_name: this.formCustomer.value.company_name,
			contact_name: this.formCustomer.value.contact_name,
			contact_title: this.formCustomer.value.contact_title,
			phone: this.formCustomer.value.phone,
			fax: this.formCustomer.value.fax,
			direccion:{
				address:  this.formCustomer.value.address,
				city:  this.formCustomer.value.city,
				region:  this.formCustomer.value.region,
				postal_code:  this.formCustomer.value.postal_code,
				country:  this.formCustomer.value.country,
			}
		}
		
		if(this.dataCustomer==null){	
			this._customerService.crearCustomer(modelo).subscribe({
				next:(data)=>{
					this.mostrarAlerta("Customer was created","Done")
					this.dialogoReferencia.close("created")
				},error:(e)=>{

					if(e.error[0].error) this.mostrarAlerta(e.error[0].error,"Error")
					else this.mostrarAlerta(e.error,"Error")
				}
			});
		}else {
			 this._customerService.actualizarCustomer({customer_id:this.dataCustomer.customer_id,...modelo}).subscribe({
				next:(data)=>{
					this.mostrarAlerta("Customer was edited","Done")
					this.dialogoReferencia.close("updated")
				},error:(e)=>{
					this.mostrarAlerta(e.error[0].error,"Error")
				}
			})
		}

	  }

	ngOnInit(): void {
		if(this.dataCustomer){
			this.formCustomer.patchValue({
				company_name: this.dataCustomer.company_name,
				contact_name: this.dataCustomer.contact_name,
				contact_title: this.dataCustomer.contact_title,
				phone: this.dataCustomer.phone,
				fax: this.dataCustomer.fax,
				address: this.dataCustomer.direccion.address,
				city: this.dataCustomer.direccion.city,
				region: this.dataCustomer.direccion.region,
				postal_code: this.dataCustomer.direccion.postal_code,
				country: this.dataCustomer.direccion.country
			})
			this.tituloForm="Edit";
			this.botonAccion="Update";
		}
	}
}
