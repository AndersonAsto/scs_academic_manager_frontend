import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Grade } from './grades.model';
import { GradeService } from './grades.service';
import { InfoGrade } from './info-grade/info-grade';

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [FormsModule, InfoGrade],
  templateUrl: './grades.html',
  styleUrl: './grades.css',
})
export class Grades {
  private gradesService = inject(GradeService);

  grades = signal<Grade[]>([]);
  loadingGrades = signal(true);
  errorGrades = signal<string | null>(null);
  searchTermGrades = signal('');

  isFormModalOpen = signal(false);
  gradeToEdit = signal<Grade | null>(null);

  isInfoModalOpen = signal(false);
  gradeToView = signal<Grade | null>(null);

  filteredGrades = computed(() => {
    const term = this.searchTermGrades().toLowerCase().trim();
    if (!term) return this.grades();
    return this.grades().filter(c =>
      c.grade.toLowerCase().includes(term)
    );
  });

  constructor() {
    this.fetchGrades();
  }

  fetchGrades(): void {
    this.loadingGrades.set(true);
    this.errorGrades.set(null);

    this.gradesService.list().subscribe({
      next: (data) => {
        this.grades.set(data);
        this.loadingGrades.set(false);
      },
      error: () => {
        this.errorGrades.set('No se pudieron cargar los grados.');
        this.loadingGrades.set(false);
      }
    });
  }

  onAdd(): void {

  }

  onEdit(grade: Grade): void {

  }

  onCloseFormModal(): void {

  }

  onSaved(): void {

  }

  onInfo(grade: Grade): void {
    this.gradeToView.set(grade);
    this.isInfoModalOpen.set(true);
  }

  onCloseInfoModal(): void {
    this.isInfoModalOpen.set(false);
    this.gradeToView.set(null);
  }

  onDelete(grade: Grade): void {

  }
}
