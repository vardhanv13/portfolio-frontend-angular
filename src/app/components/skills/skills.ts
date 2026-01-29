import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillService } from '../../services/skill';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.css']
})
export class Skills implements OnInit, OnDestroy {
  skills: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {
    this.loadSkills();
    this.initializeAnimations();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  private loadSkills(): void {
    this.skillService
      .getSkills()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.skills = data;
          console.log('Skills loaded:', data);
        },
        error: (err) => {
          console.error('Error loading skills:', err);
        }
      });
  }

 
  private initializeAnimations(): void {
    console.log(' Skills page animations initialized');
  }

  
  getLevelPercentage(level: string): string {
    const levelMap: { [key: string]: string } = {
      'beginner': '40%',
      'intermediate': '70%',
      'advanced': '90%',
      'expert': '100%'
    };
    
    return levelMap[level.toLowerCase()] || '50%';
  }
}
