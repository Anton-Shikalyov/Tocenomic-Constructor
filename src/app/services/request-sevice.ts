import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

interface Response {
    error: boolean;
    message: any;
  }

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http: HttpClient) { }

  // --------------------------------------------------------------
  // json translator api routes
  // --------------------------------------------------------------

  getAplan(data: any): Observable<Response> {
    return this.http.post<Response>('./api/json2aplan/', data, options);
  }

  getGraphData(data: any): Observable<Response> {
    return this.http.post<Response>('./api/avm/charts/', data, options);
  }
}
