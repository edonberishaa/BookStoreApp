import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { Book } from '../../Models/books';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-bookpage',
  standalone: true,
  templateUrl: './bookpage.component.html',
  styleUrl: './bookpage.component.css',
  imports: [CommonModule, RouterModule, ReactiveFormsModule
  ]
})
export class BookpageComponent implements OnInit{
  book: Book | any;
  constructor(
    private route: ActivatedRoute,
    private bookService: BooksService,

  ) { }

ngOnInit(): void {
  const bookId = Number(this.route.snapshot.paramMap.get('id'));
  this.bookService.getBookById(bookId).subscribe(
    (data: any) => {
      console.log(data);
      this.book = data;
    },
    (error) => {
      console.error('Error fetching book data', error);
    }
  );
  }
  getCategoryName(categoryID: number): string {
    switch (categoryID) {
      case 1:
        return 'Fiction';

      case 2:
        return 'Non-Fiction';

      case 3:
        return 'Science-Fiction';

      case 4:
        return 'Biography';

      case 5:
        return 'Mystery';

      case 6:
        return 'Fantasy';

      case 10:
        return 'Lektyra shkollore'

      default:
        return categoryID.toString();
    }
  }

}

