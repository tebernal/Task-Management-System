import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DemoAngularMaterialModule } from '../../../../DemoAngularMaterialModule';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-view-task-details',
  standalone: true,
  imports: [DemoAngularMaterialModule, ReactiveFormsModule, FormsModule, CommonModule,RouterModule],
  templateUrl: './view-task-details.component.html',
  styleUrl: './view-task-details.component.scss'
})
export class ViewTaskDetailsComponent {
  taskId: number = this.activatedRoute.snapshot.params["id"];
  taskData: any;
  comments:any;
  commentForm!: FormGroup;

  constructor(
    private service: EmployeeService, 
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.getTaskById();
    this.getComments();
    this.commentForm = this.fb.group({
      content: [null, Validators.required]
    })
}

getTaskById() {
    this.service.getTaskById(this.taskId).subscribe((res) => {
        this.taskData = res;
    });
}

getComments() {
  this.service.getCommentsByTask(this.taskId).subscribe((res) => {
      this.comments = res;
  });
}

publishComment(){
  this.service.createComment(this.taskId, this.commentForm.get("content")?.value).subscribe((res)=>{
    if(res.id != null){
      this.snackBar.open("Comment psoted successfully", "Close", {duration: 5000});
      this.getComments();
    }else{
      this.snackBar.open("Something went wrong", "Close", {duration: 5000});
    }
  })
}

}


