import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';
import { Book } from '../../Models/books';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-add-book',
    standalone: false,
    templateUrl: './add-book.component.html',
    styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

    
    bookForm: FormGroup | any;
    formError: string = '';

  book: Book = {
        title: '',
        author: '',
        isbn: '',
        price: 0,
    publishedDate: '',
    categoryID: 0,
    imagePath: '',
    description: ''
    };

    constructor(
        private bookService: BooksService,
        private router: Router,
        private fb: FormBuilder,
    ) { }

    ngOnInit(): void {

      this.bookForm = this.fb.group({
            title: [this.book.title, Validators.required],
            author: [this.book.author, Validators.required],
            isbn: [this.book.isbn, Validators.required],
            price: [this.book.price, [Validators.required, Validators.min(0)]],
        publishedDate: [this.book.publishedDate, Validators.required],
        categoryID: [this.book.categoryID, [Validators.required, Validators.min(1)]],
        imagePath: [this.book.imagePath, Validators.required],
        description: [this.book.description, Validators.required]


        });
    }

  onSubmit() {
    if (this.bookForm.valid) {
      const bookPayload = {
        title: this.bookForm.get('title')?.value,
        author: this.bookForm.get('author')?.value,
        price: this.bookForm.get('price')?.value,
        isbn: this.bookForm.get('isbn')?.value,
        publishedDate: this.bookForm.get('publishedDate')?.value,
        categoryID: this.bookForm.get('categoryID')?.value,
        imagePath: this.bookForm.get('imagePath')?.value,
        description: this.bookForm.get('description')?.value
      };
      console.log(this.bookForm.get('imagePath')?.value)
      console.log('Book payload:', bookPayload);

      this.bookService.addBook(bookPayload).subscribe({
        next: (response) => alert(`Book added succesfully: ${this.book.title}`),
        error: (error) => console.error('Error occurred:', error)
      });
    } else {
      console.error('Form is invalid');
    }
  }

}
