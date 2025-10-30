import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService, Service } from '../../services/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Hero Section with overlay nav links -->
      <section id="hero" class="relative text-white min-h-[calc(100vh-4rem)] flex items-center">
        <div class="absolute inset-0">
          <video
            class="w-full h-full object-cover"
            src="/home/dts-banner.mp4"
            autoplay
            muted
            loop
            playsinline
            preload="auto"
            aria-hidden="true"
          >
            <source src="/home/dts-banner.mp4" type="video/mp4" />
          </video>
          <div class="absolute inset-0 bg-black/30"></div>
        </div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div class="text-center">
            <h1 class="text-5xl font-bold mb-4">Relax. Rejuvenate. Repeat.</h1>
            <p class="text-lg text-gray-200 max-w-3xl mx-auto mb-10">
              Premium home-service spa and therapeutic massages brought directly to your doorstep.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button (click)="navigateToServices()" class="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-lg font-medium transition-colors duration-200">Browse Services</button>
              <button (click)="navigateToLogin()" class="border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-3 rounded-lg font-medium transition-colors duration-200">Sign In</button>
            </div>
          </div>
        </div>
      </section>

      <!-- About Us Section -->
      <section id="about" class="py-16 bg-white">
        <div class="px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
          <div class="rounded-2xl overflow-hidden shadow">
            <img src="/home/herbal-compress-herbal-spa-treatment.jpg" alt="About Daily Therapy Spa" class="w-full h-full object-cover" />
          </div>
          <div>
            <h2 class="text-4xl font-bold text-purple-900 mb-6">About us</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              At Daily Therapy Spa, we are dedicated to bringing the ultimate relaxation and wellness experience to your doorstep.
              We understand the demands of modern life and the need for rejuvenation and self‑care. That’s why we offer a range of
              professional home massage and therapeutic services tailored to meet your individual needs.
            </p>
            <p class="text-gray-700 leading-relaxed mb-4">
              Our team of highly skilled and certified therapists are passionate about promoting your well‑being and providing you
              with a personalized spa experience. Whether you’re looking to alleviate stress, ease muscle tension, or simply pamper
              yourself, we have the expertise to deliver exceptional results.
            </p>
            <p class="text-gray-700 leading-relaxed">
              With Daily Therapy Spa, you can enjoy the convenience of luxurious spa treatments without the hassle of leaving your home.
              Our therapists bring all the necessary equipment and supplies, creating a tranquil oasis in the comfort of your own space.
              We prioritize your comfort and privacy, ensuring that each session is tailored to your preferences and conducted with the
              utmost professionalism.
            </p>
          </div>
        </div>
      </section>

      <!-- Promo Offer Section (local assets) -->
      <section class="relative overflow-hidden bg-[#23002f]">
        <img src="/offer/bg-blob-left.svg" alt="" class="pointer-events-none select-none absolute left-0 top-0 h-full opacity-80" />
        <img src="/offer/bg-blob-right.svg" alt="" class="pointer-events-none select-none absolute right-[-6rem] -top-40 h-[56rem] opacity-70" />
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <!-- Left visual image (no circle, no extra chrome) -->
            <div class="p-0 m-0">
              <div class="flex justify-center">
                <img src="/home/relaxing-massage.jpg" alt="massage visual" class="w-[420px] md:w-[520px] rounded-2xl shadow-lg"/>
              </div>
            </div>

            <!-- Right copy + CTA -->
            <div class="text-white">
              <div class="text-[56px] leading-none md:text-[72px] font-extrabold tracking-tight">
                <span class="text-[#ff9364]">35% OFF</span>
              </div>
              <div class="mt-6">
                <div class="text-3xl md:text-5xl font-extrabold">GET OUR EXCLUSIVE</div>
                <div class="text-3xl md:text-5xl font-extrabold text-[#ff9364]">OFFER</div>
              </div>
              <div class="mt-10 flex flex-wrap gap-4">
                <a href="tel:+971521608488" class="px-7 py-3 rounded-md bg-[#A78BFA] hover:bg-[#8b5cf6] text-white font-semibold shadow">CALL NOW</a>
                <a href="https://wa.me/971521608488" target="_blank" class="px-7 py-3 rounded-md border border-white/50 hover:bg-white/10 font-semibold">WHATSAPP NOW</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Products/Oils Section -->
      <section id="products" class="bg-purple-100/70 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold text-center text-purple-900 mb-8">Aromatherapy Oils</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div class="bg-purple-200 rounded-xl overflow-hidden">
              <img src="/home/lavender-oil.jpg" class="h-56 w-full object-cover" alt="Lavender"/>
              <div class="p-6">
                <h3 class="text-2xl text-purple-900 font-semibold mb-2">Lavender Oil</h3>
                <p class="text-purple-900/80 leading-relaxed">Soothing aroma to relax the mind and promote restful sleep.</p>
              </div>
            </div>
            <div class="bg-purple-200 rounded-xl overflow-hidden">
              <img src="/home/lemongrass-oil.jpg" class="h-56 w-full object-cover" alt="Lemongrass"/>
              <div class="p-6">
                <h3 class="text-2xl text-purple-900 font-semibold mb-2">Lemongrass Oil</h3>
                <p class="text-purple-900/80 leading-relaxed">Refreshing and invigorating scent to uplift your senses.</p>
              </div>
            </div>
            <div class="bg-purple-200 rounded-xl overflow-hidden">
              <img src="/home/rosemary-oil.jpg" class="h-56 w-full object-cover" alt="Rosemary"/>
              <div class="p-6">
                <h3 class="text-2xl text-purple-900 font-semibold mb-2">Rosemary Oil</h3>
                <p class="text-purple-900/80 leading-relaxed">Invigorating properties that boost circulation and mental clarity.</p>
              </div>
            </div>
            <div class="bg-purple-200 rounded-xl overflow-hidden">
              <img src="/home/jasmine-oil.jpg" class="h-56 w-full object-cover" alt="Jasmine"/>
              <div class="p-6">
                <h3 class="text-2xl text-purple-900 font-semibold mb-2">Jasmine Oil</h3>
                <p class="text-purple-900/80 leading-relaxed">Calming properties to relax the mind and uplift the spirit.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Preview -->
      <section id="services" class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold text-center text-gray-900 mb-10">Our Services</h2>
          <div *ngIf="isLoading" class="text-center py-10">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
          <div *ngIf="!isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div *ngFor="let service of previewServices" class="bg-white rounded-xl shadow-md overflow-hidden">
              <div class="h-44 bg-gray-200">
                <img [src]="getServiceImage(service)" [alt]="service.name" class="w-full h-full object-cover" (error)="onImageError($event)" />
              </div>
              <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-1">{{ service.name }}</h3>
                <p class="text-gray-600 mb-4 line-clamp-3">{{ service.description || 'No description available' }}</p>
                <div class="flex justify-between items-center mb-4">
                  <span class="text-2xl font-bold text-primary-600">{{ '$' + service.price }}</span>
                  <span class="text-sm text-gray-500">{{ service.duration }} min</span>
                </div>
                <div class="grid grid-cols-3 gap-2 text-sm">
                  <a [href]="'tel:+971521608488'" class="text-center border rounded-md py-2 hover:bg-gray-50">Call</a>
                  <a [href]="'https://wa.me/971521608488'" target="_blank" class="text-center border rounded-md py-2 hover:bg-gray-50">WhatsApp</a>
                  <button (click)="book(service)" class="bg-primary-600 hover:bg-primary-700 text-white rounded-md py-2">Book</button>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center mt-10">
            <button (click)="navigateToServices()" class="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium">View All Services</button>
          </div>
        </div>
      </section>

      <!-- Why Choose Us -->
      <section id="why" class="bg-purple-100/70 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
          <div class="rounded-xl overflow-hidden h-80">
            <img src="/home/christin-hume-0MoF-Fe0w0A-unsplash-scaled.webp" class="w-full h-full object-cover" alt="Why choose us"/>
          </div>
          <div>
            <h2 class="text-3xl font-bold text-purple-900 mb-4">Why Choose Us</h2>
            <p class="text-purple-900/80 leading-relaxed mb-8">We understand the importance of convenience in today’s fast-paced world. That’s why we bring our top-notch massage and therapeutic services directly to your home. Enjoy the luxury of relaxation without the hassle of traveling to a spa.</p>
            <p class="text-purple-900/80 leading-relaxed mb-8">Our team consists of highly trained and experienced therapists who are dedicated to providing exceptional service. With their expertise and knowledge, you can trust that you are in capable hands.</p>
          </div>
        </div>
      </section>

      <!-- Contact -->
      <section id="contact" class="relative py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <h2 class="text-3xl font-bold text-center text-gray-900 mb-10">Contact us</h2>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <!-- Facebook -->
            <a href="https://facebook.com" target="_blank" class="border rounded-xl p-6 text-center hover:shadow-md bg-white/80 backdrop-blur">
              <div class="w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 text-white flex items-center justify-center shadow">
                <svg viewBox="0 0 24 24" class="w-7 h-7" fill="currentColor" aria-hidden="true">
                  <path d="M22 12a10 10 0 1 0-11.6 9.87v-6.98H7.9V12h2.5V9.8c0-2.46 1.46-3.82 3.7-3.82 1.07 0 2.2.19 2.2.19v2.42h-1.24c-1.22 0-1.6.76-1.6 1.54V12h2.73l-.44 2.89h-2.3v6.98A10 10 0 0 0 22 12z" />
                </svg>
              </div>
              <div class="font-semibold">Facebook</div>
            </a>
            <!-- Call -->
            <a href="tel:+971521608488" class="border rounded-xl p-6 text-center hover:shadow-md bg-white/80 backdrop-blur">
              <div class="w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 text-white flex items-center justify-center shadow">
                <svg viewBox="0 0 24 24" class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2 5.5C2 15 9 22 18.5 22a2.5 2.5 0 0 0 2.5-2.5v-1.7a1.5 1.5 0 0 0-1.25-1.48l-3.46-.69a1.5 1.5 0 0 0-1.49.58l-.8 1.06a1.5 1.5 0 0 1-1.87.47 12.4 12.4 0 0 1-5.52-5.52 1.5 1.5 0 0 1 .47-1.87l1.06-.8a1.5 1.5 0 0 0 .58-1.49L7.18 4.25A1.5 1.5 0 0 0 5.7 3H4a2 2 0 0 0-2 2.5z" />
                </svg>
            </div>
              <div class="font-semibold">Call us</div>
              <div class="text-sm text-gray-500">+971 52 160 8488</div>
            </a>
            <!-- WhatsApp -->
            <a href="https://wa.me/971521608488" target="_blank" class="border rounded-xl p-6 text-center hover:shadow-md bg-white/80 backdrop-blur">
              <div class="w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 text-white flex items-center justify-center shadow">
                <svg viewBox="0 0 24 24" class="w-7 h-7" fill="currentColor" aria-hidden="true">
                  <path d="M20 3.5A10.5 10.5 0 0 0 3.44 17.37L2 22l4.77-1.39A10.5 10.5 0 1 0 20 3.5Zm-5.1 12.27c-1.44 0-3.57-.83-5.03-2.29-1.46-1.46-2.29-3.6-2.29-5.03 0-.51.31-.78.58-.91l1.02-.46c.27-.12.59-.02.74.23l.91 1.55c.14.25.1.56-.11.77l-.5.5c-.19.19-.2.49-.04.71.39.55 1.19 1.43 1.85 1.9.22.16.52.14.71-.04l.5-.5c.21-.21.52-.25.77-.11l1.55.91c.25.15.35.47.23.74l-.46 1.02c-.13.27-.4.58-.91.58Z"/>
                </svg>
              </div>
              <div class="font-semibold">WhatsApp</div>
              <div class="text-sm text-gray-500">+971 52 160 8488</div>
            </a>
            <!-- Location -->
            <div class="border rounded-xl p-6 text-center bg-white/80 backdrop-blur">
              <div class="w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br from-fuchsia-400 to-purple-600 text-white flex items-center justify-center shadow">
                <svg viewBox="0 0 24 24" class="w-7 h-7" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"/>
                </svg>
              </div>
              <div class="font-semibold">Location</div>
              <div class="text-sm text-gray-500">Barsha Heights, Dubai</div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA bottom with large background -->
      <section class="relative py-36">
        <div class="absolute inset-0 z-0">
          <img src="/home/christin-hume-0MoF-Fe0w0A-unsplash-scaled.webp" alt="Background" class="w-full h-full object-cover"/>
          <div class="absolute inset-0 bg-purple-900/40 z-10"></div>
          </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-20">
          <h3 class="text-3xl md:text-4xl font-extrabold mb-6 drop-shadow">Ready to get started?</h3>
          <button (click)="navigateToServices()" class="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg">Book your session</button>
        </div>
      </section>
    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  previewServices: Service[] = [];
  isLoading = true;

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.api.getServices().subscribe({
      next: (services: Service[]) => {
        this.previewServices = services.slice(0, 6);
        this.isLoading = false;
      },
      error: () => {
        this.previewServices = [];
        this.isLoading = false;
      }
    });

  }

  navigateToServices(): void {
    this.router.navigate(['/services']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  book(service: Service): void {
    this.router.navigate(['/booking', service._id]);
  }

  getServiceImage(service: Service): string {
    if (service.images && service.images.length > 0) {
      return `${environment.apiUrl}/${service.images[0]}`;
    }
    return 'https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=1200&auto=format&fit=crop';
  }

  onImageError(event: any): void {
    event.target.src = 'https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=1200&auto=format&fit=crop';
  }
}
