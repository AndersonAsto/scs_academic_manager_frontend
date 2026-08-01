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
    { title: 'Secciones', icon: 'fa-solid fa-graduation-cap', route: '/admin/sections' },
    { title: 'Años Lectivos', icon: 'fa-solid fa-clock', route: '/admin/years' },
    { title: 'Franja Horaria', icon: 'fa-solid fa-clock', route: '/admin/time-slots' }
  ];
}
