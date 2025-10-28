import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  customerEmail: string;
  services: {
    serviceId: string;
    companyServiceId?: string;
    quantity: number;
    customPrice?: number;
    serviceName: string;
    serviceDuration: number;
    servicePrice: number;
  }[];
  bookingDate: string;
  bookingTime: string;
  duration: number;
  totalPrice: number;
  status: string;
  assignedCompanyId?: string;
  assignedCompanyName?: string;
  assignedUserId?: string;
  assignedUserEmail?: string;
  assignedBy?: string;
  assignedByEmail?: string;
  customerNotes?: string;
  adminNotes?: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingsResponse {
  bookings: Booking[];
  total: number;
  page: number;
  limit: number;
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
    return this.http.get<BookingsResponse>(`${this.API_URL}/v1/bookings/my-bookings`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.bookings)
      );
  }

  cancelBooking(bookingId: string): Observable<Booking> {
    return this.http.patch<Booking>(`${this.API_URL}/v1/bookings/${bookingId}/cancel`, {}, { headers: this.getHeaders() });
  }

  getBookingById(id: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.API_URL}/v1/bookings/${id}`, { headers: this.getHeaders() });
  }
}
