import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Costumer } from '../../Models/Costumers';
import { CostumerService } from '../../services/costumer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-costumer-input',
  standalone: true,
  templateUrl: './costumer-input.component.html',
  styleUrls: ['./costumer-input.component.css'],
  imports: [RouterModule, ReactiveFormsModule, NgbModalModule],
  providers: [NgbActiveModal],
})
export class CostumerInputComponent {
  customerForm: FormGroup;
  isLoading = false; // Tracks API call state

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CostumerService,
    public activeModal: NgbActiveModal
  ) {
    this.customerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  dismissModal() {
    this.activeModal.close();
    if (confirm('Are you sure you want to discard your changes?')) {
      this.activeModal.close();
    }
  }
  saveCustomer() {
    if (this.customerForm.valid) {
      this.isLoading = true;
      console.log('Saving customer...');
      const customer: Costumer = this.customerForm.value;
      this.customerService.createCostumer(customer).subscribe({
        next: (response) => {
          console.log('Customer saved successfully:', response); // Debug log
          alert('Customer saved successfully!'); // Should show this alert
          this.activeModal.close(response); // Close the modal here
        },
        error: (err) => {
          console.error('Error saving customer:', err); // Debug error
          alert('Failed to save customer details!');
        },
        complete: () => {
          this.isLoading = false; // Ensure the loading spinner stops
          console.log('Save customer process completed.'); // Debug log
        },
      });
    } else {
      alert('Please fill out all required fields.');
    }
  }

}
