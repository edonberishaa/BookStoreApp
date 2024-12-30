import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../Models/books';


@Injectable({
  providedIn: 'root'
})
export class SearchBookService {

  query: string = '';
  private apiURL = `https://localhost:7147/books/search?title=${this.query}`

  this.http.get

constructor(private http: HttpClient) { }
}
