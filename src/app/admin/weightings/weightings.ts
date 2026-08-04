import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InfoWeightings } from './info-weightings/info-weightings';
import { CreateUpdateWeightings } from './create-update-weightings/create-update-weightings';
import { Weighting } from './weightings.model';
import { WeightingsService } from './weightings.service';

@Component({
  selector: 'app-weightings',
  imports: [FormsModule, InfoWeightings],
  standalone: true,
  templateUrl: './weightings.html',
  styleUrl: './weightings.css',
})
export class Weightings {
  private weightingService = inject(WeightingsService);

  weightings = signal<Weighting[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  searchTerm = signal('');

  isFormModalOpen = signal(false);
  weightingToEdit = signal<Weighting | null>(null);

  isInfoModalOpen = signal(false);
  weightingToView = signal<Weighting | null>(null);

  constructor() {
    this.fetchWeighting();
  }

  filteredWeightings = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const year = this.selectedYear();

    return this.weightings().filter(w => {
      const matchesSearch =
        !term ||
        w.weighting.toString().toLowerCase().includes(term) ||
        w.type.toLocaleLowerCase().includes(term) ||
        w.year.year.toString().includes(term);

      const matchesYear =
        year === null ||
        w.year.id === year;

      return matchesSearch && matchesYear;
    });
  });

  fetchWeighting(): void {
    this.loading.set(true);
    this.error.set(null);

    this.weightingService.list().subscribe({
      next: (data) => {
        this.weightings.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las ponderaciones.');
        this.loading.set(false);
      }
    });
  }

  onAdd(): void {
    this.weightingToEdit.set(null);
    this.isFormModalOpen.set(true);
  }

  onEdit(weighting: Weighting): void {
    this.weightingToEdit.set(weighting);
    this.isFormModalOpen.set(true);
  }

  onCloseFormModal(): void {
    this.weightingToEdit.set(null);
    this.isFormModalOpen.set(false);
  }

  onSaved(): void {
    this.isFormModalOpen.set(false);
    this.weightingToEdit.set(null);
    this.fetchWeighting();
  }

  onInfo(weighting: Weighting): void {
    this.weightingToView.set(weighting);
    this.isInfoModalOpen.set(true);
  }

  onCloseInfoModal(): void {
    this.isInfoModalOpen.set(false);
    this.weightingToView.set(null);
  }

  onDelete(weighting: Weighting): void {

  }

  years = computed(() => {
    const years = this.weightings()
      .map(w => w.year);
    return years.filter(
      (year, index, array) =>
        index === array.findIndex(y => y.id === year.id)
    );
  });

  selectedYear = signal<number | null>(null);

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedYear.set(null);
  }
}
