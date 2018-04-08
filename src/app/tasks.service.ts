import { Injectable } from '@angular/core';
import { Task } from '../Task';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessagesService } from './messages.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TaskDto} from '../TaskDto';

// const tasksUrl = 'https://protected-chamber-47542.herokuapp.com/v1/tasks';
const tasksUrl = 'http://localhost:8080/v1/tasks/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TasksService {

  constructor(private http: HttpClient,
              private messagesService: MessagesService) { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this.messagesService.log('TasksService: ${operation} failed');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getTasks(): Observable<Task[]> {
    this.messagesService.log('TasksService: sending HTTP request to fetch tasks from remote service');
    return this.http.get<TaskDto[]>(tasksUrl)
      .map(taskDtos => taskDtos.map(taskDto => new Task(taskDto.id, taskDto.title, taskDto.content)))
      .pipe(
        tap(tasks => this.messagesService.log('TasksService: fetched tasks from remote service')),
        catchError(this.handleError('getTasks()', []))
      );
  }

  updateTask(task: Task): Observable<TaskDto> {
    const taskDto: TaskDto = new TaskDto(task.id, task.name, task.content);

    this.messagesService.log('TasksService: sending HTTP request to update task data');
    return this.http.put<TaskDto>(tasksUrl, taskDto, httpOptions)
      .pipe(
        tap(_ => this.messagesService.log('TasksService: updated task in remote database')),
        catchError(this.handleError('updateTask()', null))
      );
  }

  addTask(taskName: string, taskContent: string): Observable<TaskDto> {
    this.messagesService.log('TasksService: sending HTTP request to add new task');
    const taskDto: TaskDto = new TaskDto(null, taskName, taskContent);
    return this.http.post<TaskDto>(tasksUrl, taskDto, httpOptions)
      .pipe(
        tap(_ => this.messagesService.log(`TasksService: added new task ${_.title} to remote database`)),
        catchError(this.handleError('addTask()', null))
      );
  }

  deleteTask(task: Task): Observable<TaskDto> {
    this.messagesService.log('TasksService: sending HTTP request to delete task');
    return this.http.delete<TaskDto>(tasksUrl + '/' + task.id,  {
      headers: httpOptions.headers
    })
      .pipe(
        tap(_ => this.messagesService.log(`TasksService: deleted task with id=${task.id}`)),
        catchError(this.handleError('addTask()', null))
      );
  }

}
