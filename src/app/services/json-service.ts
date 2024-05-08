import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  public uploadedUnVes: boolean = false;
  public uploadedService: boolean = false;
  constructor(private http: HttpClient) { }
  public page_data: any = undefined;
  public charts_data: any[] = [];
  writeDataToFile(data: any): Observable<any> {
    const url = '../../../src/app/data.json';
    return this.http.post(url, data);
  }
}
