import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Contributors } from 'app/model/contributors';
import { Task } from 'app/model/task';
import { ContributorsService } from 'app/services/contributors/contributors.service';
import { TasksService } from 'app/services/tasks/tasks.service';
import { TableListDialogComponent } from 'app/table-list-dialog/table-list-dialog.component';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {


  tasks: Task[] = [];
  contributors: Contributors[] = [];

  constructor(private taskService: TasksService, private contrubutorService: ContributorsService, private dialogModel: MatDialog) { }

  ngOnInit() {
    this.startSubscription();
  }

  startSubscription() {

    this.contrubutorService.getContributors().subscribe (res => {
      this.contributors = res;
    })


    this.taskService.getTasks().subscribe (res => {
      res.forEach( item => {
        if (item.assignee !== "") {
          const contributor = this.contributors.find(con => con.userName == item.assignee);
          if (contributor) {
            this.tasks.push({id: item.id, title: item.title, description: item.description, assignee: contributor});
          } else {
            this.tasks.push({id: item.id, title: item.title, description: item.description, assignee: new Contributors()})
          }
        }
        else {
          this.tasks.push({id: item.id, title: item.title, description: item.description, assignee: new Contributors()})
        }
      })
    })


    
  }


  deleteTask(id: number) {
    const index = this.tasks.findIndex((obj: Task) => obj.id == id);
    this.tasks.splice(index, 1);

  }

  editTask(task: Task) {

    const dialog = this.dialogModel.open(TableListDialogComponent, {
      width: '600px',
      data: {title: task.title, description: task.description, assignee: task.assignee, contributors: this.contributors}
    });


    dialog.afterClosed().subscribe(result => {
      if(result) {
        const taskIndex = this.tasks.findIndex((obj: Task) => obj.id == task.id);
        console.log(taskIndex);
        this.tasks[taskIndex].title = result.title;
        this.tasks[taskIndex].description = result.description;
        this.tasks[taskIndex].assignee = result.assignee;
      }
    })

  }

}
