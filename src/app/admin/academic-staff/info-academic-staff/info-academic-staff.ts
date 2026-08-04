import { Component, input, output } from '@angular/core';
import { AcademicStaffModel } from '../academic-staff.model';

@Component({
  selector: 'app-info-academic-staff',
  imports: [],
  standalone: true,
  templateUrl: './info-academic-staff.html',
  styleUrl: './info-academic-staff.css',
})
export class InfoAcademicStaff {
  isOpen = input<boolean>(false);
  academicStaff = input<AcademicStaffModel | null>(null);

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
