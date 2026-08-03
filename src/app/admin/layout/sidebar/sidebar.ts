import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  sidebarService = inject(SidebarService);

  menu = [
    { title: 'Panel Principal', icon: 'fa-solid fa-chart-simple', route: '/admin/dashboard' },
    { title: 'Cursos', icon: 'fa-solid fa-book', route: '/admin/courses' },
    { title: 'Grados', icon: 'fa-solid fa-graduation-cap', route: '/admin/grades' },
    { title: 'Secciones', icon: 'fa-regular fa-object-ungroup', route: '/admin/sections' },
    { title: 'Años Lectivos', icon: 'fa-solid fa-calendar', route: '/admin/years' },
    { title: 'Bloques Lectivos', icon: 'fa-solid fa-calendar-week', route: '/admin/teaching-blocks' },
    { title: 'Días Lectivos', icon: 'fa-regular fa-calendar-days', route: '/admin/school-days' },
    { title: 'Franja Horaria', icon: 'fa-solid fa-clock', route: '/admin/time-slots' },
    { title: 'Ponderación', icon: 'fa-solid fa-percent', route: '/admin/weightings' },
    { title: 'Personal Académico', icon: 'fa-solid fa-chalkboard-user', route: '/admin/academic-staff' },
    { title: 'Matrículas', icon: 'fa-solid fa-user-graduate', route: '/admin/registrations' },
    { title: 'Grupos', icon: 'fa-solid fa-people-group', route: '/admin/teacher-groups' },
    { title: 'Horarios', icon: 'fa-solid fa-rectangle-list', route: '/admin/schedules' }
  ];
}
