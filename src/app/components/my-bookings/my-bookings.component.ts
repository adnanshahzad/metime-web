import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Booking {
  _id: string;
  customerId: string;
  services: any[];
  bookingDate: string;
  bookingTime: string;
  status: string;
  totalAmount: number;
  customerNotes?: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">My Bookings</h1>
              <p class="mt-2 text-gray-600">Manage your service appointments</p>
            </div>
            <button (click)="goToServices()" class="btn-primary">
              Book New Service
            </button>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div *ngIf="isLoading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p class="mt-2 text-gray-600">Loading your bookings...</p>
        </div>

        <div *ngIf="!isLoading && bookings.length === 0" class="text-center py-12">
          <div class="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
          <p class="text-gray-600 mb-6">Start by booking your first service</p>
          <button (click)="goToServices()" class="btn-primary">
            Browse Services
          </button>
        </div>

        <div *ngIf="!isLoading && bookings.length > 0" class="space-y-6">
          <div *ngFor="let booking of bookings" class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-6">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">Booking #{{ booking._id.slice(-8) }}</h3>
                  <p class="text-sm text-gray-600">{{ formatDate(booking.bookingDate) }} at {{ booking.bookingTime }}</p>
                </div>
                <span [class]="getStatusClass(booking.status)">
                  {{ getStatusText(booking.status) }}
                </span>
              </div>

              <div class="space-y-3">
                <div *ngFor="let service of booking.services" class="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <h4 class="font-medium text-gray-900">{{ service.serviceId?.name || 'Service' }}</h4>
                    <p class="text-sm text-gray-600">Quantity: {{ service.quantity }}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-medium text-gray-900">{{ getServicePrice(service) | currency }}</p>
                  </div>
                </div>
              </div>

              <div class="mt-4 pt-4 border-t border-gray-200">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="text-sm text-gray-600">Total Amount</p>
                    <p class="text-lg font-bold text-gray-900">{{ booking.totalAmount | currency }}</p>
                  </div>
                  <div class="flex space-x-2">
                    <button 
                      *ngIf="booking.status === 'confirmed'"
                      (click)="cancelBooking(booking._id)"
                      class="btn-secondary text-sm"
                    >
                      Cancel
                    </button>
                    <button (click)="viewBookingDetails(booking)" class="btn-primary text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  isLoading = true;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    this.http.get<Booking[]>('http://localhost:3000/v1/bookings/my-bookings', { headers })
      .subscribe({
        next: (bookings: Booking[]) => {
          this.bookings = bookings;
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Error loading bookings:', error);
          this.isLoading = false;
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800';
      case 'pending':
        return 'px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800';
      case 'completed':
        return 'px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800';
      default:
        return 'px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800';
    }
  }

  getStatusText(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  getServicePrice(service: any): number {
    return service.customPrice || service.serviceId?.price || 0;
  }

  cancelBooking(bookingId: string): void {
    if (confirm('Are you sure you want to cancel this booking?')) {
      const token = localStorage.getItem('access_token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      this.http.patch(`http://localhost:3000/v1/bookings/${bookingId}/cancel`, {}, { headers })
        .subscribe({
          next: () => {
            this.loadBookings(); // Reload bookings
          },
          error: (error: any) => {
            console.error('Error cancelling booking:', error);
            alert('Failed to cancel booking. Please try again.');
          }
        });
    }
  }

  viewBookingDetails(booking: Booking): void {
    alert(`Booking Details:\n\nID: ${booking._id}\nDate: ${this.formatDate(booking.bookingDate)}\nTime: ${booking.bookingTime}\nStatus: ${booking.status}\nTotal: $${booking.totalAmount}`);
  }

  goToServices(): void {
    this.router.navigate(['/services']);
  }
}