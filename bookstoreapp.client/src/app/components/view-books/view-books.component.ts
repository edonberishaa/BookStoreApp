import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { CommonModule } from '@angular/common';
import { Book } from '../../Models/books';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-books',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.css']
})
export class ViewBooksComponent implements OnInit {
  books: any[] = [];
  filteredBooks: any[] = [];
  categories: string[] = [];
  selectedCategory: string = '';

  constructor(private bookService: BooksService, private router: Router) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => {
        console.error('Error fetching books:', err);
      }
    });
  }

  viewBookDetails(bookId: number): void {
    this.router.navigate(['/book', bookId]);
  }
}

