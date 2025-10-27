import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Service {
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

interface ServiceCategory {
  _id: string;
  name: string;
  description?: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Hero Section -->
      <div class="bg-primary-600 text-white py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-4xl font-bold mb-4">Discover Our Services</h2>
            <p class="text-xl text-primary-100 max-w-2xl mx-auto">
              Book professional services tailored to your needs. From wellness to beauty, we have everything you need.
            </p>
          </div>
        </div>
      </div>

      <!-- Services Grid -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div *ngIf="isLoading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p class="mt-2 text-gray-600">Loading services...</p>
        </div>

        <div *ngIf="!isLoading && services.length === 0" class="text-center py-12">
          <div class="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No services available</h3>
          <p class="text-gray-500">Check back later for new services.</p>
        </div>

        <div *ngIf="!isLoading && services.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let service of services" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div *ngIf="service.images && service.images.length > 0" class="h-48 bg-gray-200">
              <img 
                [src]="getImageUrl(service.images[0])" 
                [alt]="service.name"
                class="w-full h-full object-cover"
                (error)="onImageError($event)"
              />
            </div>
            <div *ngIf="!service.images || service.images.length === 0" class="h-48 bg-gray-200 flex items-center justify-center">
              <span class="text-gray-500 text-lg">No Image</span>
            </div>
            
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ service.name }}</h3>
              <p class="text-gray-600 mb-4">{{ service.description || 'No description available' }}</p>
              
              <div class="flex justify-between items-center mb-4">
                <span class="text-2xl font-bold text-primary-600">{{ '$' + service.price }}</span>
                <span class="text-sm text-gray-500">{{ service.duration }} min</span>
              </div>
              
              <button
                (click)="bookService(service)"
                class="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  isLoading = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.http.get<Service[]>('http://localhost:3000/public/services').subscribe({
      next: (services: Service[]) => {
        this.services = services;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading services:', error);
        this.isLoading = false;
      }
    });
  }

  bookService(service: Service): void {
    alert(`Booking ${service.name} - This feature will be implemented soon!`);
  }

  getImageUrl(imagePath: string): string {
    // Remove any duplicate uploads path
    const cleanPath = imagePath.replace(/^\/?uploads\//, '');
    return `http://localhost:3000/uploads/${cleanPath}`;
  }

  onImageError(event: any): void {
    // Hide the image if it fails to load
    event.target.style.display = 'none';
  }
}