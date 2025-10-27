import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

export interface Service {
  _id: string;
  name: string;
  description?: string;
  categoryId: string;
  duration: number;
  price: number;
  isActive: boolean;
  images: string[];
  thumbnails: string[];
  notes?: string;
}

export interface ServiceCategory {
  _id: string;
  name: string;
  description?: string;
}

export interface BookingRequest {
  services: {
    serviceId: string;
    quantity: number;
    customPrice?: number;
  }[];
  bookingDate: string;
  bookingTime: string;
  customerNotes?: string;
}

export interface Booking {
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

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    return this.authService.getAuthHeaders();
  }

  // Services - using public endpoints
  getServices(categoryId?: string, minPrice?: number, maxPrice?: number): Observable<Service[]> {
    let url = `${this.API_URL}/public/services`;
    const params = new URLSearchParams();
    
    if (categoryId) params.append('categoryId', categoryId);
    if (minPrice !== undefined) params.append('minPrice', minPrice.toString());
    if (maxPrice !== undefined) params.append('maxPrice', maxPrice.toString());
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    return this.http.get<Service[]>(url);
  }

  getActiveServices(categoryId?: string): Observable<Service[]> {
    let url = `${this.API_URL}/public/services`;
    if (categoryId) {
      url += `?categoryId=${categoryId}`;
    }
    return this.http.get<Service[]>(url);
  }

  getServiceById(id: string): Observable<Service> {
    return this.http.get<Service>(`${this.API_URL}/public/services/${id}`);
  }

  // Service Categories - using public endpoints
  getServiceCategories(): Observable<ServiceCategory[]> {
    return this.http.get<ServiceCategory[]>(`${this.API_URL}/public/service-categories`);
  }

  // Bookings
  createBooking(bookingData: BookingRequest): Observable<Booking> {
    return this.http.post<Booking>(`${this.API_URL}/v1/bookings`, bookingData, { headers: this.getHeaders() });
  }

  getMyBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.API_URL}/v1/bookings/my-bookings`, { headers: this.getHeaders() });
  }

  cancelBooking(bookingId: string): Observable<Booking> {
    return this.http.patch<Booking>(`${this.API_URL}/v1/bookings/${bookingId}/cancel`, {}, { headers: this.getHeaders() });
  }

  getBookingById(id: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.API_URL}/v1/bookings/${id}`, { headers: this.getHeaders() });
  }
}
