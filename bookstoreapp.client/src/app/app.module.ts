import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { ViewBooksComponent } from './components/view-books/view-books.component';
import { FooterComponent } from './components/footer/footer.component';
import { BookpageComponent } from './components/bookpage/bookpage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './components/order/order.component';
import { CostumerInputComponent } from './components/costumer-input/costumer-input.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgbModalModule, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    FooterComponent,
    AddBookComponent,
    CategoriesPageComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule,CommonModule,
    AppRoutingModule, FormsModule, ViewBooksComponent, ReactiveFormsModule, BrowserAnimationsModule,
    CostumerInputComponent, BookpageComponent,OrderComponent,NgbModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
