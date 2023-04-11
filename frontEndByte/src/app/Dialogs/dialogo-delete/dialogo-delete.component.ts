import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { Customer } from 'src/app/Interfaces/customer';

@Component({
  selector: 'app-dialogo-delete',
  templateUrl: './dialogo-delete.component.html',
  styleUrls: ['./dialogo-delete.component.css']
})
export class DialogoDeleteComponent implements OnInit{

	constructor(
		private dialogoReferencia:MatDialogRef<DialogoDeleteComponent>,
		@Inject (MAT_DIALOG_DATA) public dataCustomer: Customer

	){}

	ngOnInit(): void {
		 
	}

	confirmarEliminar(){
		if(this.dataCustomer){
			this.dialogoReferencia.close("delete")
		}
	}

}
