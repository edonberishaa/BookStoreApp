import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../Models/books';


@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiURL = 'https://localhost:7147/Books'; // Your API endpoint

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any[]>  {
    return this.http.get<any[]>(`${this.apiURL}`);
  }

  getBookById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/${id}`);
  }
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiURL, book);
  }
  searchBooks(title: string = '', author?: string, category?: string): Observable<Book[]> {
    let params = new HttpParams();
    if (title) params = params.append('title', title);
    if (author) params = params.append('author', author);
    if (category) params = params.append('category', category);

    return this.http.get<Book[]>(`${this.apiURL}/search`, { params });

  }
}



