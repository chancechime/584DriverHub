import { NgModel } from '@angular/forms';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet, Routes, RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'DriverHubClient';

  @ViewChild('myVideo') myVideo: any;

  ngAfterViewInit() {
    const videoElement = this.myVideo?.nativeElement;
    if (videoElement) {
      // Ensure video is muted and tries to play after view is initialized
      videoElement.muted = true; // Ensure muted for autoplay
      videoElement.play().catch(() => {
        console.log('Autoplay failed, video may need user interaction.');
      });
    }
  }
}

