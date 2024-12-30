import { Component , OnInit } from '@angular/core';
import { Category } from '../../Models/Categories';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';


@Component({
  selector: 'app-categories-page',
  standalone: false,
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css'
})
export class CategoriesPageComponent implements OnInit {

  constructor(private router: Router,
    private fb: FormBuilder,
  private categoriesService: CategoriesService) { }

  categoriesForm: FormGroup | any;
  formError: string = '';


  category: Category = {
    id: 0,
    name: ''
  }

  ngOnInit(): void {
    this.categoriesForm = this.fb.group({
      id: [this.category.id, Validators.required],
      name: [this.category.name, Validators.required]
    });
  }
  onSubmit() {
    if (this.categoriesForm.valid) {
      const bookPayload = {
        id: this.categoriesForm.get('id')?.value,
        name: this.categoriesForm.get('name')?.value
      };

      this.categoriesService.addCategory(bookPayload).subscribe({
        next: (response) => alert('Category added successfully'),
        error: (error) => console.error('Error occurred:', error)
      });
    }
    else {
      console.error('Form is invalid');
    }
  }
}
