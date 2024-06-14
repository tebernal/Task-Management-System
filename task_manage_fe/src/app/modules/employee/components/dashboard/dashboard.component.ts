import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DemoAngularMaterialModule } from '../../../../DemoAngularMaterialModule';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DemoAngularMaterialModule, ReactiveFormsModule, FormsModule, CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  listOfTasks: any = [];

  constructor(
    private service: EmployeeService,
    private snackBar: MatSnackBar
  ){
    this.getTasks();
  }

  getTasks(){
    this.service.getEmployeeTasksById().subscribe((res)=>{
      console.log(res); 
        this.listOfTasks = res;  
    })
  }
  updateStatus(id:number, status:string){
    this.service.updateStatus(id,status).subscribe((res)=>{
      if(res.id!= null){
        this.snackBar.open("Task status updated successfully", "Close", {duration:5000});
        this.getTasks();
      } else{
        this.snackBar.open("Error while updating task", "Close", {duration:5000});
      }
    })

  }
}
