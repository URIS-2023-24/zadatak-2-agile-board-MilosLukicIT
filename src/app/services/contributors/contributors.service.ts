import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContributorsService {

  baseUrl = "https://app.microenv.com/backend/key/ca40e19f5d9a888659b693/rest/api/contributors/"

  constructor(private http: HttpClient) { }

  public getContributors() : Observable<any> {
    return this.http.get(this.getUrl()).pipe(map((response: Response) => response));
  }

  private getUrl(){
    return `${this.baseUrl}`;
  }
}
