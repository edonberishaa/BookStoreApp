import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders } from '../Models/Orders';
import { OrderDetails } from '../Models/OrderDetails';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiURL = 'https://localhost:7147'; // Your API endpoint

  constructor(private http: HttpClient) { }

  createOrder(order: Orders): Observable<Orders> {
    return this.http.post<Orders>(`${this.apiURL}/Orders`, order);
  }

  createOrderDetails(orderDetails: OrderDetails): Observable<OrderDetails> {
    return this.http.post<OrderDetails>(`${this.apiURL}/OrderDetails`, orderDetails);
  }

  getOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(`${this.apiURL}/Orders`);
  }

  getOrderDetails(orderId: number): Observable<OrderDetails[]> {
    return this.http.get<OrderDetails[]>(`${this.apiURL}/OrderDetails?orderId=${orderId}`);
  }

}
