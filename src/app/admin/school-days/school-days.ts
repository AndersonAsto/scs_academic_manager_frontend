import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SchoolDay } from './school-days.model';
import { SchoolDaysService } from './school-days.service';

@Component({
  selector: 'app-school-days',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './school-days.html',
  styleUrl: './school-days.css',
})
export class SchoolDays {
  private schoolDaysService = inject(SchoolDaysService);

  schoolDay = signal<SchoolDay[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  searchTerm = signal('');

  isFormModalOpen = signal(false);
  schoolDayToEdit = signal<SchoolDay | null>(null);

  isInfoModalOpen = signal(false);
  schoolDayToView = signal<SchoolDay | null>(null);

  constructor() {
    this.fetchSchoolDays();
  }

  filteredSchoolDays = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const year = this.selectedYear();
    const block = this.selectedTeachingBlock();

    return this.schoolDay().filter(sd => {
      const matchesSearch =
        !term ||
        sd.school_day.toLowerCase().includes(term) ||
        sd.day.toLowerCase().includes(term) ||
        sd.type.toLowerCase().includes(term) ||
        sd.week_number.toString().includes(term);

      const matchesYear =
        year === null ||
        sd.teaching_block.year.id === year;

      const matchesBlock =
        block === null ||
        sd.teaching_block.id === block;

      return matchesSearch &&
        matchesYear &&
        matchesBlock;
    });
  });

  fetchSchoolDays(): void {
    this.loading.set(true);
    this.error.set(null);

    this.schoolDaysService.list().subscribe({
      next: (data) => {
        this.schoolDay.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los bloques lectivos.');
        this.loading.set(false);
      }
    });
  }

  onAdd(): void {
    this.schoolDayToEdit.set(null);
    this.isFormModalOpen.set(true);
  }

  onEdit(schoolDay: SchoolDay): void {
    this.schoolDayToEdit.set(schoolDay);
    this.isFormModalOpen.set(true);
  }

  onCloseFormModal(): void {
    this.schoolDayToEdit.set(null);
    this.isFormModalOpen.set(false);
  }

  onSaved(): void {
    this.isFormModalOpen.set(false);
    this.schoolDayToEdit.set(null);
    this.fetchSchoolDays();
  }

  onInfo(schoolDay: SchoolDay): void {
    this.schoolDayToView.set(schoolDay);
    this.isInfoModalOpen.set(true);
  }

  onCloseInfoModal(): void {
    this.isInfoModalOpen.set(false);
    this.schoolDayToView.set(null);
  }

  onDelete(schoolDay: SchoolDay): void {

  }

  years = computed(() => {
    const years = this.schoolDay()
      .map(sd => sd.teaching_block.year);
    return years.filter(
      (year, index, array) =>
        index === array.findIndex(y => y.id === year.id)
    );
  });

  teachingBlocks = computed(() => {
    const selectedYear = this.selectedYear();

    let blocks = this.schoolDay()
      .map(sd => sd.teaching_block);

    if (selectedYear !== null) {
      blocks = blocks.filter(
        block => block.year.id === selectedYear
      );
    }

    return blocks.filter(
      (block, index, array) =>
        index === array.findIndex(b => b.id === block.id)
    );
  });

  selectedYear = signal<number | null>(null);
  selectedTeachingBlock = signal<number | null>(null);

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedYear.set(null);
    this.selectedTeachingBlock.set(null);
  }

  onYearChange(yearId: number | null): void {
    this.selectedYear.set(yearId);
    this.selectedTeachingBlock.set(null);
  }
}
