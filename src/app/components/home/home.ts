import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit, OnDestroy {
  profile: any;
  private destroy$ = new Subject<void>();

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadProfileData();
    this.setupPageAnimation();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadProfileData(): void {
    this.profileService
      .getProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.profile = data;
          console.log(' Home profile data loaded:', data);
        },
        error: (err) => {
          console.error(' Error loading home profile:', err);
        }
      });
  }

 
  private setupPageAnimation(): void {
    console.log(' Home page animations initialized');
  }
}
