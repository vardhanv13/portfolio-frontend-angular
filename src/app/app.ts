import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from './services/profile';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit, OnDestroy {
  profile: any;
  isDarkMode = true;
  isNavHovered = false;
  private destroy$ = new Subject<void>();

  constructor(private profileService: ProfileService) {
    this.initializeDefaultDarkMode();
  }
  
  ngOnInit(): void {
    this.loadProfileData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeDefaultDarkMode(): void {
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }


  private loadProfileData(): void {
    this.profileService.getProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.profile = data;
        },
        error: (error) => {
          console.error('Error loading profile data:', error);
        }
      });
  }

  onNavHover(isHovered: boolean): void {
    this.isNavHovered = isHovered;
  }
}
