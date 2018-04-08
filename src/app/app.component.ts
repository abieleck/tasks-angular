import { Component, OnInit } from '@angular/core';
import { Task } from '../Task';
import { TrelloBoard } from '../TrelloBoard';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TasksService } from './tasks.service';
import { TrelloService } from './trello.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  newTaskName: string;
  newTaskContent: string;

  tasks: Task[];
  trelloBoards: TrelloBoard[];

  constructor(iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              private tasksService: TasksService,
              private trelloService: TrelloService) {
    iconRegistry
      .addSvgIcon('trello-icon',
        sanitizer.bypassSecurityTrustResourceUrl('../assets/svg/trello-mark-circle.svg'));
  }

  ngOnInit() {
    this.getTasks();
    this.getTrelloBoards();
  }

  getTasks(): void {
    this.tasksService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  getTrelloBoards(): void {
    this.trelloService.getTrelloBoards().subscribe(boards => this.trelloBoards = boards);
  }

  addTrelloCard(task: Task): void {
    this.trelloService.addTrelloCard(task).subscribe();
  }

  addTask() {
    if (this.newTaskName && this.newTaskName.length >= 3 && this.newTaskContent) {
      this.tasksService.addTask(this.newTaskName, this.newTaskContent)
        .subscribe(taskDto => {
          this.tasks.push(new Task(taskDto.id, taskDto.title, taskDto.content));
          this.newTaskName = null;
          this.newTaskContent = null;
          }
        );
    }
  }

  deleteTask(task: Task) {
    this.tasksService.deleteTask(task)
      .subscribe(_ => this.tasks.splice(this.tasks.indexOf(task), 1));
  }

  submitChange(task: Task) {
    this.tasksService.updateTask(task).subscribe(
      taskDto => {
        task.storedName = taskDto.title;
        task.storedContent = taskDto.content;
      }
    );
  }

  discardChange(task: Task) {
    task.name = task.storedName;
    task.content = task.storedContent;
  }
}


