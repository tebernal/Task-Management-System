import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DemoAngularMaterialModule } from '../../../../DemoAngularMaterialModule';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [DemoAngularMaterialModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.scss'
})
export class UpdateTaskComponent {

 id: number = this.route.snapshot.params["id"];
 updateTaskForm!: FormGroup;
 listOfEmployees: any = [];
 listOfPriorities: any = ["LOW", "MEDIUM", "HIGH"];
 listOfTastStatus: any = ["PENDING","IN_PROGRESS","COMPLETED","DEFERRED","CANCELLED"];

constructor(
  private service: AdminService, 
  private route: ActivatedRoute,
  private fb: FormBuilder,
  private adminService: AdminService,
  private snackBar: MatSnackBar,
  private router: Router
) {
  this.getTaskById();
  this.getUsers();
  this.updateTaskForm = this.fb.group({
    employeeId:[null,[Validators.required]],
    title:[null,[Validators.required]], 
    description:[null,[Validators.required]],
    dueDate:[null,[Validators.required]],
    priority:[null,[Validators.required]],
    taskStatus:[null,[Validators.required]],
  }) 
}

getTaskById() {
  this.service.getTaskById(this.id).subscribe((res) => {
    this.updateTaskForm.patchValue(res);
    console.log(res);
  });
}

getUsers() {
  this.adminService.getUsers().subscribe((res) => {
    this.listOfEmployees = res;
    console.log(res);
  });
}

updateTask(){
  this.adminService.updateTask(this.id,this.updateTaskForm.value).subscribe((res)=>{
    if(res.id != null){
      this.snackBar.open("Task updated successfuly", "Close",{duration: 5000});
      this.router.navigateByUrl("/admin/dashboard");
    } else{
      this.snackBar.open("Something went wrong", "Error",{duration: 5000});
    }
  })
}

// updateTask() {
//   this.adminService.updateTask(this.id, this.updateTaskForm.value).subscribe((res) => {
//     if (res.id != null) {
//       this.snackBar.open("Task updated successfully", "Close", { duration: 5000 });
//       this.router.navigateByUrl("/admin/dashboard");
//     } else {
//       this.snackBar.open("Something went wrong", "Error", { duration: 5000 });
//     }
//   }, (error) => {
//     if (error.status === 403) {
//       this.snackBar.open("You are not authorized to perform this action", "Close", { duration: 5000 });
//     } else {
//       this.snackBar.open("An error occurred", "Close", { duration: 5000 });
//     }
//   });
// }
}
