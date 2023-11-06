import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  baseUrl = "https://app.microenv.com/backend/key/ca40e19f5d9a888659b693/rest/api/tasks/"

  constructor(private http: HttpClient) { }

  public getTasks(): Observable<any> {
    return this.http.get(this.getUrl());
  }

  private getUrl(){
    return `${this.baseUrl}`;
  }
  
}
