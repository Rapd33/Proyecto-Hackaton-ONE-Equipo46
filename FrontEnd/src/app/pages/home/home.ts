import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  private router = inject(Router);
  activeTab: string = 'summary';

  // INTEGRANTES (Orden A-Z)
  teamMembers = [
    { name: 'Bibiana Trujillo', role: 'Data Scientist', initials: 'BT', linkedin: '#' },
    { name: 'Fernando Hernández R.', role: 'Data Scientist', initials: 'FH', linkedin: '#' },
    { name: 'Giorgi Beltran Guzman', role: 'Backend Developer', initials: 'GB', linkedin: '#' },
    { name: 'Henry Corporan', role: 'Backend Developer', initials: 'HC', linkedin: '#' },
    { name: 'Juan Carlos Rueda R.', role: 'Backend & Frontend Dev', initials: 'JR', linkedin: '#' },
    { name: 'Rafael Alejandro Mena', role: 'Data Engineer', initials: 'RM', linkedin: '#' },
    { name: 'Rafael Patiño Diaz', role: 'Backend & Frontend Dev', initials: 'RP', linkedin: '#' },
    { name: 'Richard Jerez', role: 'Data Scientist', initials: 'RJ', linkedin: '#' }
  ];

  enterSystem() { this.router.navigate(['/dashboard']); }
  setActiveTab(tabName: string) { this.activeTab = tabName; }
}