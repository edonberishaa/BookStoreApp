import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Costumer } from '../Models/Costumers';

@Injectable({
  providedIn: 'root'
})
export class CostumerService {
  private apiURL = 'https://localhost:7147/Costumers';

  constructor(private http: HttpClient) { }

  createCostumer(costumer: Costumer): Observable<any> {
    return this.http.post(`${this.apiURL}`, costumer);

  }
}
