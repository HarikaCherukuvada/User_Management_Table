import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { iUser } from './interfaces/table-variables-interface';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private jsonPath = 'assets/json/table.json';

  constructor(
    private http: HttpClient,
  ) { }

  getTableData(): Observable<iUser[]> {
    return this.http.get<iUser[]>(this.jsonPath).pipe(
      catchError((error) => {
        console.error('Error fetching data:', error);
        return throwError(error);
      })
    );
  }
  
}
