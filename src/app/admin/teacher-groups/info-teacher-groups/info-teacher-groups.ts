import { Component, input, output } from '@angular/core';
import { TeacherGroup } from '../teacher-groups.model';

@Component({
  selector: 'app-info-teacher-groups',
  imports: [],
  templateUrl: './info-teacher-groups.html',
  styleUrl: './info-teacher-groups.css',
})
export class InfoTeacherGroups {
  isOpen = input<boolean>(false);
    teacherGroup = input<TeacherGroup | null>(null);
  
    closeModal = output<void>();
  
    onBackdropClick(): void {
      this.closeModal.emit();
    }
  
    formatDate(value: string | undefined): string {
      if (!value) return '—';
      const date = new Date(value.replace(' ', 'T'));
      return date.toLocaleString('es-PE', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
}
