import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from './api';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpClient) {}

  getSkills() {
    return this.http.get<any[]>(`${API_BASE_URL}/skills`);
  }
}
