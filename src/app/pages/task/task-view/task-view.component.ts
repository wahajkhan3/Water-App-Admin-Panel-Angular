import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'app/services/header.service';
import { TaskService } from 'app/services/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit, OnDestroy {
  singleUserTask:any;
  isLoading: boolean = true;
  constructor(private headerService:HeaderService, private taskService: TaskService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.taskService.getbyIdTask(this.route.snapshot.params['id']).subscribe((resp:any)=>{
      this.singleUserTask = resp.data;
      this.isLoading = false;
    });
    
    this.headerService.task.next(true);
  }
  ngOnDestroy(): void {
    this.headerService.task.next(false);
  }
}
