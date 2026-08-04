import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Registration } from './registration.model';
import { RegistrationsService } from './registrations.service';
import { InfoRegistration } from './info-registration/info-registration';

@Component({
  selector: 'app-registrations',
  imports: [FormsModule, InfoRegistration],
  standalone: true,
  templateUrl: './registrations.html',
  styleUrl: './registrations.css',
})
export class Registrations {
  private registrationsService = inject(RegistrationsService);

  registration = signal<Registration[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  searchTerm = signal('');

  isFormModalOpen = signal(false);
  registrationToEdit = signal<Registration | null>(null);

  isInfoModalOpen = signal(false);
  registrationToView = signal<Registration | null>(null);

  constructor() {
    this.fetchRegistrations();
  }

  filteredRegistrations = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();

    return this.registration().filter(rg => {
      const student = rg.student.personal_information;
      const parent = rg.parent.personal_information;

      const searchable = [
        student.names,
        student.fathers_surname,
        student.mothers_surname,
        `${student.names} ${student.fathers_surname} ${student.mothers_surname}`,
        student.dni,
        student.email,
        student.phone_number,
        
        rg.registration_date,

        parent.names,
        parent.fathers_surname,
        parent.mothers_surname,
        `${parent.names} ${parent.fathers_surname} ${parent.mothers_surname}`,
        parent.dni,
        parent.email,
        parent.phone_number,
      ].join(' ').toLowerCase();

      const matchesSearch =
        !term ||
        searchable.includes(term);

      const matchesYear =
        this.selectedYear() === null ||
        rg.year.id === this.selectedYear();

      const matchesGrade =
        this.selectedGrade() === null ||
        rg.grade.id === this.selectedGrade();

      const matchesSection =
        this.selectedSection() === null ||
        rg.section.id === this.selectedSection();

      return (
        matchesSearch &&
        matchesYear &&
        matchesGrade &&
        matchesSection
      );
    });
  });

  fetchRegistrations(): void {
    this.loading.set(true);
    this.error.set(null);

    this.registrationsService.list().subscribe({
      next: (data) => {
        this.registration.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las matrículas.');
        this.loading.set(false);
      }
    });
  }

  onAdd(): void {
    this.registrationToEdit.set(null);
    this.isFormModalOpen.set(true);
  }

  onEdit(registration: Registration): void {
    this.registrationToEdit.set(registration);
    this.isFormModalOpen.set(true);
  }

  onCloseFormModal(): void {
    this.registrationToEdit.set(null);
    this.isFormModalOpen.set(false);
  }

  onSaved(): void {
    this.isFormModalOpen.set(false);
    this.registrationToEdit.set(null);
    this.fetchRegistrations();
  }

  onInfo(registration: Registration): void {
    this.registrationToView.set(registration);
    this.isInfoModalOpen.set(true);
  }

  onCloseInfoModal(): void {
    this.isInfoModalOpen.set(false);
    this.registrationToView.set(null);
  }

  onDelete(registration: Registration): void { }

  selectedYear = signal<number | null>(null);
  selectedGrade = signal<number | null>(null);
  selectedSection = signal<number | null>(null);

  grades = computed(() => {
    const grades = this.registration().map(rg => rg.grade);

    return grades.filter(
      (grade, index, array) => index === array.findIndex(g => g.id === grade.id)
    );
  });

  sections = computed(() => {
    const sections = this.registration().map(rg => rg.section);

    return sections.filter(
      (section, index, array) =>
        index === array.findIndex(s => s.id === section.id)
    );
  });

  years = computed(() => {

    const years = this.registration()
      .map(rg => rg.year);

    return years.filter(
      (year, index, array) =>
        index === array.findIndex(y => y.id === year.id)
    );

  });

  clearFilters(): void {
    this.searchTerm.set('');

    this.selectedYear.set(null);
    this.selectedGrade.set(null);
    this.selectedSection.set(null);
  }

  onYearChange(yearId: number | null): void {
    this.selectedYear.set(yearId);
  }
}
