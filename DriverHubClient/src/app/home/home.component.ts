import { Component, OnInit, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { RouterModule, RouterOutlet, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Router } from 'express';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private currentIndex: number = 0; 
  private drivers: HTMLElement[] = []; 
  private cars: HTMLElement[] = []; 

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.drivers = Array.from(document.querySelectorAll('.drivers .slide')) as HTMLElement[];
      this.cars = Array.from(document.querySelectorAll('.cars .slide')) as HTMLElement[];

      this.showSlides(); // Start the slideshow
    }

    console.log('HomeComponent initialized');
  }

  private showSlides(): void {
    // Hide all slides
    this.drivers.forEach(slide => this.renderer.setStyle(slide, 'display', 'none'));
    this.cars.forEach(slide => this.renderer.setStyle(slide, 'display', 'none'));

    // Show the current slide
    this.renderer.setStyle(this.drivers[this.currentIndex], 'display', 'block');
    this.renderer.setStyle(this.cars[this.currentIndex], 'display', 'block');

    // Update the index for the next slide
    this.currentIndex = (this.currentIndex + 1) % this.drivers.length;

    // Change slide every 3 seconds
    setTimeout(() => this.showSlides(), 3000);
  }
}
