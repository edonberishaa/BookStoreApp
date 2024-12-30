import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { Book } from '../../Models/books';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: any[] = [];
  searchQuery: string = '';
  showDropdown: boolean = false;

  private searchSubject: Subject<string> = new Subject<string>();

  constructor(private bookService: BooksService, private router: Router) { }

  ngOnInit(): void {
    // Debounce user input to avoid spamming API calls
    this.searchSubject.pipe(debounceTime(300)).subscribe((query) => {
      this.fetchBooks(query);
    });
  }

  onSearch(): void {
    // Push user input to the subject for debouncing
    this.searchSubject.next(this.searchQuery);
  }

  goToBookDetails(bookId: number): void {
    this.searchQuery = '';
    this.showDropdown = false;
    this.router.navigate(['/book', bookId]);
  }
  fetchBooks(query: string): void {
    this.bookService.searchBooks(query).subscribe(
      (response) => {
        this.filteredBooks = response; // Populate dropdown with filtered books
        this.showDropdown = response.length > 0; // Show dropdown if results exist
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }
}

