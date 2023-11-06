import { Component, OnInit } from '@angular/core';
import { Contributors } from 'app/model/contributors';
import { Task } from 'app/model/task';
import { ContributorsService } from 'app/services/contributors/contributors.service';
import { TasksService } from 'app/services/tasks/tasks.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {


  tasks: Task[] = [];
  contributors: Contributors[] = [];

  constructor(private taskService: TasksService, private contrubutorService: ContributorsService) { }

  ngOnInit() {
    this.startSubscription();
  }

  startSubscription() {
    this.taskService.getTasks().subscribe (res => {
      this.tasks = res;
    })


    this.contrubutorService.getContributors().subscribe (res => {
      this.contributors = res;
    })
  }

}
