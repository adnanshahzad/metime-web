import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService, User } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <a routerLink="/services" class="flex-shrink-0 flex items-center">
              <h1 class="text-2xl font-bold text-primary-600">MeTime</h1>
            </a>
          </div>

          <div class="flex items-center space-x-4">
            <a 
              routerLink="/services" 
              routerLinkActive="text-primary-600"
              class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Services
            </a>
            
            <a 
              routerLink="/my-bookings" 
              routerLinkActive="text-primary-600"
              class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              My Bookings
            </a>

            <div *ngIf="currentUser" class="flex items-center space-x-4">
              <div class="text-sm text-gray-700">
                Welcome, {{ currentUser.firstName }} {{ currentUser.lastName }}
              </div>
              <button
                (click)="logout()"
                class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>

            <div *ngIf="!currentUser" class="flex items-center space-x-2">
              <a 
                routerLink="/login"
                class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </a>
              <a 
                routerLink="/register"
                class="bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: []
})
export class NavigationComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user: User | null) => {
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}