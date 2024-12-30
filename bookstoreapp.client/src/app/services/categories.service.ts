import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../Models/Categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiURL = 'https://localhost:7147/Categories';
  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}`);
  }
  getCategoriesById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/${id}`);
  }
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiURL, category);
  }
}
