import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { RouterModule, RouterOutlet, RouterLink } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  // Declare the variable to hold the current platform status
  
  isBrowser: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private renderer: Renderer2) {
    // Check if the current platform is a browser
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.startSlideshow();
    }
  }

  private startSlideshow() {
    let currentDriverIndex = 0;
    let currentCarIndex = 0;
    const drivers = document.querySelectorAll('.drivers .slide') as NodeListOf<HTMLElement>;
    const cars = document.querySelectorAll('.cars .slide') as NodeListOf<HTMLElement>;

    if (drivers.length === 0 || cars.length === 0) {
      console.error('No slides found for drivers or cars.');
      return;
    }

    const showSlides = () => {
      // Hide all driver and car slides
      drivers.forEach(slide => this.renderer.setStyle(slide, 'display', 'none'));
      cars.forEach(slide => this.renderer.setStyle(slide, 'display', 'none'));

      // Show the current driver and car slide
      this.renderer.setStyle(drivers[currentDriverIndex], 'display', 'block');
      this.renderer.setStyle(cars[currentCarIndex], 'display', 'block');

      // Update the index for the next driver and car slide
      currentDriverIndex = (currentDriverIndex + 1) % drivers.length;
      currentCarIndex = (currentCarIndex + 1) % cars.length;

      // Change slide every 3 seconds
      setTimeout(showSlides, 3000);
    };

    // Start the slideshow
    showSlides();
  }
}