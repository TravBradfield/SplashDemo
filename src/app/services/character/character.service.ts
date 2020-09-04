import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TotalResponse } from '../../../assets/models/totalResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  messages: string[] = [];
  splashApi: string = "https://gbngq2s2e0.execute-api.eu-west-2.amazonaws.com/api/characters";

  constructor(
    private http: HttpClient,
  ) { }

  getCharacterData(url): Observable<TotalResponse> {
    this.log('getCharacterData()');
    return this.http.get<TotalResponse>(url).pipe(
      tap(_ => this.log('getCharacterData() complete')),
      catchError(this.handleError<TotalResponse>('getCharacterData'))
    );
  }

  getPage(url): Observable<TotalResponse> {
    this.log('getPage()');
    return this.http.get<TotalResponse>(url).pipe(
      tap(_ => this.log('getPage() complete')),
      catchError(this.handleError<TotalResponse>('getPage'))
    );
  }

  private log(message: string) {
    this.add(`HeroService: ${message}`);
  }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
