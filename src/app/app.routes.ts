import { Routes } from '@angular/router';
import { Login } from './login/login';
import { AdminLayoutComponent } from './admin/layout/admin-layout/admin-layout';
import { Dashboard } from './admin/dashboard/dashboard';
import { Courses } from './admin/courses/courses';
import { Grades } from './admin/grades/grades';
import { Sections } from './admin/sections/sections';
import { Years } from './admin/years/years';
import { TimeSlots } from './admin/time-slots/time-slots';
import { AcademicStaff } from './admin/academic-staff/academic-staff';
import { Registrations } from './admin/registrations/registrations';
import { SchoolDays } from './admin/school-days/school-days';
import { TeachingBlocks } from './admin/teaching-blocks/teaching-blocks';
import { Weightings } from './admin/weightings/weightings';
import { Schedules } from './admin/schedules/schedules';
import { TeacherGroups } from './admin/teacher-groups/teacher-groups';
import { ParentsLayout } from './parents/layout/parents-layout/parents-layout';
import { ParentsDashboard } from './parents/dashboard/dashboard';
import { TeachersDashboard } from './teachers/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
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
        path: 'teaching-blocks',
        component: TeachingBlocks
      },
      {
        path: 'school-days',
        component: SchoolDays
      },
      {
        path: 'time-slots',
        component: TimeSlots
      },
      {
        path: 'weightings',
        component: Weightings
      },
      {
        path: 'academic-staff',
        component: AcademicStaff
      },
      {
        path: 'registrations',
        component: Registrations
      },
      {
        path: 'schedules',
        component: Schedules
      },
      {
        path: 'teacher-groups',
        component: TeacherGroups
      }
    ]
  }, 
  {
    path: 'parent',
    component: ParentsLayout,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: ParentsDashboard
      },
    ]
  },
  {
    path: 'teacher',
    component: ParentsLayout,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: TeachersDashboard
      },
    ]
  }
];