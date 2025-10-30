import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface User {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="bg-white shadow-lg border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo and Brand -->
          <div class="flex items-center">
            <button (click)="goHome()" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">DTS</span>
              </div>
              <span class="text-xl font-bold text-gray-900">DailyTherapySpa</span>
            </button>
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-8">
            <ng-container *ngIf="isActiveRoute('/'); else appLinks">
              <button (click)="scrollTo('about')" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">About us</button>
              <button (click)="scrollTo('services')" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Our Services</button>
              <button (click)="scrollTo('products')" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Products</button>
              <button (click)="scrollTo('why')" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Why us</button>
              <button (click)="scrollTo('contact')" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">Contact us</button>
            </ng-container>
            <ng-template #appLinks>
              <button (click)="goHome()" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200" [class]="isActiveRoute('/') ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-gray-900'">Home</button>
              <button (click)="goToServices()" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200" [class]="isActiveRoute('/services') ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-gray-900'">Services</button>
              <button (click)="goToMyBookings()" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200" [class]="isActiveRoute('/my-bookings') ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-gray-900'" *ngIf="isAuthenticated()">My Bookings</button>
            </ng-template>
          </div>

          <!-- User Actions -->
          <div class="flex items-center space-x-4">
            <div *ngIf="!isAuthenticated()" class="flex items-center space-x-2">
              <button (click)="goToLogin()" class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                Sign In
              </button>
              <button (click)="goToRegister()" class="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                Sign Up
              </button>
            </div>

            <div *ngIf="isAuthenticated()" class="flex items-center space-x-4">
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span class="text-primary-600 font-medium text-sm">
                    {{ getInitials() }}
                  </span>
                </div>
                <span class="text-sm font-medium text-gray-700">
                  {{ currentUser?.firstname }} {{ currentUser?.lastname }}
                </span>
              </div>
              <button (click)="logout()" class="text-sm text-gray-600 hover:text-gray-900">
                Logout
              </button>
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button (click)="toggleMobileMenu()" class="text-gray-600 hover:text-gray-900">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile menu -->
        <div *ngIf="showMobileMenu" class="md:hidden border-t border-gray-200 py-4">
          <div class="space-y-2">
            <ng-container *ngIf="isActiveRoute('/'); else mobileAppLinks">
              <button (click)="scrollTo('about'); toggleMobileMenu()" class="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md text-sm font-medium transition-colors duration-200">About us</button>
              <button (click)="scrollTo('services'); toggleMobileMenu()" class="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md text-sm font-medium transition-colors duration-200">Our Services</button>
              <button (click)="scrollTo('products'); toggleMobileMenu()" class="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md text-sm font-medium transition-colors duration-200">Products</button>
              <button (click)="scrollTo('why'); toggleMobileMenu()" class="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md text-sm font-medium transition-colors duration-200">Why us</button>
              <button (click)="scrollTo('contact'); toggleMobileMenu()" class="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md text-sm font-medium transition-colors duration-200">Contact us</button>
            </ng-container>
            <ng-template #mobileAppLinks>
              <button (click)="goHome(); toggleMobileMenu()" class="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md text-sm font-medium transition-colors duration-200" [class]="isActiveRoute('/') ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'">Home</button>
              <button (click)="goToServices(); toggleMobileMenu()" class="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md text-sm font-medium transition-colors duration-200" [class]="isActiveRoute('/services') ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'">Services</button>
              <button (click)="goToMyBookings(); toggleMobileMenu()" class="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md text-sm font-medium transition-colors duration-200" [class]="isActiveRoute('/my-bookings') ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'" *ngIf="isAuthenticated()">My Bookings</button>
            </ng-template>

            <div *ngIf="!isAuthenticated()" class="pt-4 border-t border-gray-200 space-y-2">
              <button (click)="goToLogin(); toggleMobileMenu()" class="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md text-sm font-medium transition-colors duration-200">
                Sign In
              </button>
              <button (click)="goToRegister(); toggleMobileMenu()" class="block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 bg-primary-600 hover:bg-primary-700 text-white">
                Sign Up
              </button>
            </div>

            <div *ngIf="isAuthenticated()" class="pt-4 border-t border-gray-200">
              <div class="flex items-center space-x-2 mb-2">
                <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span class="text-primary-600 font-medium text-sm">
                    {{ getInitials() }}
                  </span>
                </div>
                <span class="text-sm font-medium text-gray-700">
                  {{ currentUser?.firstname }} {{ currentUser?.lastname }}
                </span>
              </div>
              <button (click)="logout(); toggleMobileMenu()" class="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md text-sm font-medium transition-colors duration-200">
                Logout
              </button>
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
  showMobileMenu = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const user = localStorage.getItem('current_user');
    if (user) {
      try {
        this.currentUser = JSON.parse(user);
      } catch (error) {
        this.clearAuthData();
      }
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getInitials(): string {
    if (!this.currentUser) return 'U';
    return `${this.currentUser.firstname.charAt(0)}${this.currentUser.lastname.charAt(0)}`.toUpperCase();
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  goToServices(): void {
    this.router.navigate(['/services']);
  }

  goToMyBookings(): void {
    this.router.navigate(['/my-bookings']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  logout(): void {
    this.clearAuthData();
    this.currentUser = null;
    this.router.navigate(['/']);
  }

  private clearAuthData(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('current_user');
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  scrollTo(sectionId: string): void {
    const performScroll = () => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => setTimeout(performScroll, 50));
    } else {
      performScroll();
    }
  }
}
