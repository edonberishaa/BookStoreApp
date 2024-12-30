import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { ViewBooksComponent } from './components/view-books/view-books.component';
import { AdminGuard } from './guards/admin.guard';
import { FooterComponent } from './components/footer/footer.component';
import { BookpageComponent } from './components/bookpage/bookpage.component';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { OrderComponent } from './components/order/order.component';
import { CostumerInputComponent } from './components/costumer-input/costumer-input.component';




const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: 'add-book', component: AddBookComponent
  },
  {
    path: 'add-category', component: CategoriesPageComponent
  }
  ,
  {
    path: 'order/:id', component: OrderComponent
  }
  ,
  {
    path: 'costumer', component: CostumerInputComponent
  }
  ,
  {
    path: 'view-books', component: ViewBooksComponent
  }
  ,
  {
    path: 'book/:id', component: BookpageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
