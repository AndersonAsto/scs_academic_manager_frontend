import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin/layout/admin-layout/admin-layout';
import { Dashboard } from './admin/dashboard/dashboard';
import { Courses } from './admin/courses/courses';
import { Grades } from './admin/grades/grades';
import { Sections } from './admin/sections/sections';
import { Years } from './admin/years/years';
import { TimeSlots } from './admin/time-slots/time-slots';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'courses',
        component: Courses
      },
      {
        path: 'grades',
        component: Grades
      },
      {
        path: 'sections',
        component: Sections
      },
      {
        path: 'years',
        component: Years
      },
      {
        path: 'time-slots',
        component: TimeSlots
      }
    ]
  }
];
