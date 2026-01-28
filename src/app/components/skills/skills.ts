import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillService } from '../../services/skill';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html'
})
export class Skills implements OnInit {

  skills: any[] = [];

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {
    this.skillService.getSkills().subscribe(data => {
      this.skills = data;
    });
  }
  getLevelPercentage(level: string): string {
  switch (level.toLowerCase()) {
    case 'beginner':
      return '40%';
    case 'intermediate':
      return '70%';
    case 'advanced':
      return '90%';
    default:
      return '50%';
  }
}
}
