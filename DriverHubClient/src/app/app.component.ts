import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'DriverHubClient';

  @ViewChild('myVideo', { static: true }) myVideo!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    setTimeout(() => {
      const videoElement = this.myVideo?.nativeElement;

      if (videoElement && typeof videoElement.play === 'function') {
        videoElement.muted = true; // Ensure muted for autoplay
        videoElement.play().catch((err) => {
          console.warn('Autoplay failed:', err);
        });
      } else {
        console.error('Video element is not properly initialized or does not support play().');
      }
    }, 0);
  }
  
}
