import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from './services/profile';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {

  profile: any;
  isDarkMode = false;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    // 🔹 Load profile data
    this.profileService.getProfile().subscribe(data => {
      this.profile = data;
      console.log('PROFILE DATA:', data);
    });

    // 🔹 Restore theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.enableDarkMode();
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }

  enableDarkMode() {
    document.body.classList.add('dark');
    this.isDarkMode = true;
    localStorage.setItem('theme', 'dark');
  }

  disableDarkMode() {
    document.body.classList.remove('dark');
    this.isDarkMode = false;
    localStorage.setItem('theme', 'light');
  }
}
