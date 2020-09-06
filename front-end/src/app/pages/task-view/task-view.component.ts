import { Component, OnInit } from '@angular/core';
import List from 'src/app/models/list';
import Task from 'src/app/models/task';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: List[] = [];
  tasks: Task[] = [];
  listId: string;

  constructor(private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.taskService.getLists()
      .subscribe((lists: List[]) => this.lists = lists);

    this.route.params.subscribe((param: Params) => {
      this.listId = param.listId;
      if (!this.listId) return;
      this.taskService.getTasks(this.listId).subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
    })

  }

  onTaskClick(task: Task) {
    this.taskService.setCompleted(this.listId, task)
      .subscribe(() => task.completed = !task.completed)
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(this.listId, task._id)
      .subscribe(() => this.tasks = this.tasks.filter(t => t._id != task._id))
  }

  deleteList(list: List) {
    this.taskService.deleteList(list._id)
      .subscribe(() => this.lists = this.lists.filter(l => l._id != list._id))
  }

  addTaskClick(){
    if(!this.listId){
      alert("Please select a list to add tasks to");
      return;
    }
    this.router.navigate(['./new-task'], { relativeTo: this.route })
  }
}