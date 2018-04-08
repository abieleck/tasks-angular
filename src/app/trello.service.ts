import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {MessagesService} from './messages.service';
import {TrelloBoard} from '../TrelloBoard';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {of} from 'rxjs/observable/of';
import {TrelloCardDto} from '../TrelloCardDto';
import {Task} from '../Task';
import {CreatedTrelloCardDto} from '../CreatedTrelloCardDto';

// const trelloUrl = 'https://protected-chamber-47542.herokuapp.com/v1/trello';
const trelloUrl = 'http://localhost:8080/v1/trello';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TrelloService {

  constructor(private messagesService: MessagesService,
              private http: HttpClient) { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this.messagesService.log('TrelloService: ${operation} failed');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getTrelloBoards(): Observable<TrelloBoard[]> {
    const getTrelloBoardsUrl = trelloUrl + '/boards';
    this.messagesService.log('TrelloService: sending HTTP request to fetch Trello boards');
    return this.http.get<TrelloBoard[]>(getTrelloBoardsUrl)
    .pipe(
      tap(_ => this.messagesService.log('TrelloService: fetched boards from remote service')),
      catchError(this.handleError('getTasks()', []))
    );
  }

  addTrelloCard(task: Task): Observable<TrelloCardDto> {
    const addTrelloCardUrl = trelloUrl + '/cards';
    this.messagesService.log('TrellosService: sending HTTP request to add new card');
    const trelloCardDto: TrelloCardDto = new TrelloCardDto(task.name, task.content, task.trelloList.id);
    return this.http.post<CreatedTrelloCardDto>(addTrelloCardUrl, trelloCardDto, httpOptions)
      .catch(this.handleError('aaa', null))
      .pipe(
        tap(_ => this.messagesService.log(`TrelloService: added new card ${_.shortUrl} to Trello`)),
        catchError(this.handleError('addTrelloCard()', null))
      );
  }

}
