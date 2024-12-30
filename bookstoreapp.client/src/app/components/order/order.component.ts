import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Orders } from '../../Models/Orders';
import { OrderDetails } from '../../Models/OrderDetails';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../../Models/books';
import { NgbModalModule, NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BooksService } from '../../services/books.service';
import { CostumerInputComponent } from '../costumer-input/costumer-input.component';
import { Costumer } from '../../Models/Costumers';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  imports: [RouterModule, ReactiveFormsModule, NgbModalModule, CommonModule],
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  order: Orders = { id: 0, costumerId: 0, orderDate: new Date().toISOString() };
  orderDetails: OrderDetails[] = [];
  book: Book | any;
  costumerEmail: string = '';
  private modalRef: NgbModalRef | null = null;

  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BooksService,
    private modalService: NgbModal
  ) {
    this.orderForm = this.formBuilder.group({
      quantity: [null, [Validators.required, Validators.min(1)]],
      costumerId: [null, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.openCustomerModal(); // Moved here from constructor

    this.route.queryParams.subscribe((params) => {
      this.costumerEmail = params['costumerEmail'] || '';
    });

    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBookById(bookId).subscribe(
      (data: any) => {
        console.log('Book fetched:', data);
        this.book = data;
      },
      (error) => {
        console.error('Error fetching book data', error);
      }
    );
  }
  


  openCustomerModal(): void {
     this.modalRef = this.modalService.open(CostumerInputComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    this.modalRef.result
      .then((customer: Costumer) => {
        this.orderForm.patchValue({ costumerId: customer.id });
        console.log('Customer created:', customer);

        this.order.costumerId = customer.id;
        this.costumerEmail = customer.email;
        alert('Customer saved successfully! You can now proceed with the order.');

        this.modalRef = null;
        
      })
      .catch((error) => {
        console.error('Customer modal dismissed:', error);

        this.modalRef = null;
      });
  }
  dismissModal(): void {
    this.modalRef?.close('Dismissed by parent');
    if (confirm('Are you sure you want to discard your changes?')) {
      if (this.modalRef) {
        this.modalRef.dismiss('Dismissed by parent');
        this.modalRef = null;
      }
    }
  }

  getTotalPrice(): number {
    return this.orderDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  addOrderDetail(): void {
    if (this.orderForm.invalid) {
      alert('Please enter a valid input.');
      return;
    }

    const costumerID = this.orderForm.value.costumerId;
    const quantity = this.orderForm.value.quantity;

    const detail: OrderDetails = {
      id: 0,
      orderId: this.order.id,
      bookId: this.book.id,
      quantity: quantity,
      price: this.book.price,
    };

    this.orderDetails.push(detail);
    console.log('Order detail added:', detail);

    this.orderForm.patchValue({ quantity: null });
    alert('Order detail added!');
  }

  deleteOrderDetail(index: number): void {
    const confirmed = confirm('Are you sure you want to delete this order detail?');
    if (confirmed) {
      this.orderDetails.splice(index, 1);
      alert('Order detail removed successfully!');
    }
  }

  submitOrder(): void {
    if (!this.orderDetails.length) {
      alert('Please add at least one order detail before submitting.');
      return;
    }

    this.orderService.createOrder(this.order).subscribe({
      next: (orderResponse) => {
        console.log('Order created:', orderResponse);

        this.orderDetails.forEach((detail) => {
          detail.orderId = orderResponse.id;
          this.orderService.createOrderDetails(detail).subscribe({
            next: (detailResponse) =>
              console.log('Order detail created:', detailResponse),
            error: (error) =>
              console.error('Error creating order detail:', error),
          });
        });

        alert('Order placed successfully!');
        this.router.navigate(['/orders']);
      },
      error: (error) => {
        console.error('Error creating order:', error);
        alert('An error occurred while placing the order. Please try again later.');
      },
    });
  }
}
