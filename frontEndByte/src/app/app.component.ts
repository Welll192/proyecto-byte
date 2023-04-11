import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { CustomerService } from "./Services/customer.service"
import {MatDialog} from '@angular/material/dialog';
import  { DialogCreateEditarComponent } from "./Dialogs/dialog-create-editar/dialog-create-editar.component";
import { Customer } from './Interfaces/customer';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { DialogoDeleteComponent } from './Dialogs/dialogo-delete/dialogo-delete.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
	displayedColumns: string[] = ['Company', 'Name', 'Title', 'Phone', "Fax", "Address","City","Region","PC","Country", "Acciones"];
	dataSource = new MatTableDataSource<any>();

	constructor(
    private _customerServicio: CustomerService,
    public dialog: MatDialog,
	private _snackBar: MatSnackBar
	) {}


	crearNuevoCustomer() {
		this.dialog.open(DialogCreateEditarComponent,{
			disableClose: true,
			width:"400px"
		}).afterClosed().subscribe(resultado=>{
			if(resultado==="created"){
				this.mostrarCustomers();
			}
		});
	}
	editarCustomer(dataCustomer: Customer) {
		this.dialog.open(DialogCreateEditarComponent,{
			disableClose: true,
			width:"400px",
			data: dataCustomer
		}).afterClosed().subscribe(resultado=>{
			if(resultado==="updated"){
				this.mostrarCustomers();
			}
		});
	}
	eliminarCustomer(dataCustomer: Customer){
		this.dialog.open(DialogoDeleteComponent,{
			disableClose: true,
			data: dataCustomer
		}).afterClosed().subscribe(resultado=>{
			if(resultado==="delete"){
				this._customerServicio.eliminarCustomer(dataCustomer).subscribe({
					next:(data)=>{
						this.mostrarAlerta("Customer was deleted","Done");
						this.mostrarCustomers();
					},error:(e)=>{
						console.log(e);
						
					}
				});
		
			}
		});
	}
	ngOnInit(): void {
		this.mostrarCustomers()
	}

	@ViewChild(MatPaginator) paginator!: MatPaginator;

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}


	mostrarCustomers(){
		this._customerServicio.listarCustomers().subscribe({
			next:(dataResponse)=>{
				// console.log(dataResponse?.content);
				this.dataSource.data = dataResponse?.content;
			},error:(e)=>{console.log(e);
			}
		})
	}

	mostrarAlerta(message: string, action: string) {
		this._snackBar.open(message, action,{
			horizontalPosition:"end",
			verticalPosition:"top",
			duration:3000
		});
	  }

}
