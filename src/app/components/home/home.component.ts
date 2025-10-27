import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div class="text-center">
            <h1 class="text-5xl font-bold mb-6">Welcome to MeTime</h1>
            <p class="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
              Discover and book professional services tailored to your needs. 
              From wellness to beauty, we connect you with the best service providers in your area.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button (click)="navigateToServices()" class="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-lg font-medium transition-colors duration-200">
                Browse Services
              </button>
              <button (click)="navigateToLogin()" class="border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-3 rounded-lg font-medium transition-colors duration-200">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Why Choose MeTime?</h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              We make it easy to find and book the services you need, when you need them.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Easy Discovery</h3>
              <p class="text-gray-600">Find the perfect service providers in your area with our comprehensive directory.</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Simple Booking</h3>
              <p class="text-gray-600">Book appointments in just a few clicks with our streamlined booking process.</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Trusted Providers</h3>
              <p class="text-gray-600">All our service providers are vetted professionals committed to quality service.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-gray-100 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have found their perfect service providers through MeTime.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button (click)="navigateToServices()" class="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-lg px-8 py-3">
              Explore Services
            </button>
            <button (click)="navigateToRegister()" class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-lg px-8 py-3">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToServices(): void {
    this.router.navigate(['/services']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
