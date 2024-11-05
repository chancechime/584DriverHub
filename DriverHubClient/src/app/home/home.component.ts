import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule, RouterOutlet, RouterLink } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, RouterOutlet, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Declare the variable to hold the current platform status
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Check if the current platform is a browser
    this.isBrowser = isPlatformBrowser(true);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.startSlideshow();
    }
  }

  private startSlideshow() {
    console.log('Starting slideshow...');
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
      drivers.forEach(slide => slide.style.display = 'none');
      cars.forEach(slide => slide.style.display = 'none');
      
      // Show the current driver and car slide
      drivers[currentDriverIndex].style.display = 'block';
      cars[currentCarIndex].style.display = 'block';

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
