import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { DemoAngularMaterialModule } from '../../../../DemoAngularMaterialModule';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DemoAngularMaterialModule, ReactiveFormsModule, FormsModule, CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  listOfTasks: any = [];
  searchForm!: FormGroup

  constructor(
    private service: AdminService,
    private snackBar: MatSnackBar,
    private fb:FormBuilder
  
  ) {
    this.getTasks();
    this.searchForm = this.fb.group({
      title: [null]
    })
  }
  
  getTasks() {
    this.service.getAllTasks().subscribe((res) => {
      this.listOfTasks = res;
    });
  }
  
  deleteTask(id:number){
    this.service.deleteTask(id).subscribe((res)=>{
      this.snackBar.open("Task deleted successfully","Close",{duration:5000});
      this.getTasks();
    })
  }

  searchTask(){
    this.listOfTasks =[];
    const title = this.searchForm.get('title')!.value;
    console.log(title);
    this.service.searchTask(title).subscribe((res)=>{
      console.log(res);
      this.listOfTasks = res;
    })
  }
}
