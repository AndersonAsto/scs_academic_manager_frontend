import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimeSlot } from './time-slots.model';
import { TimeSlotService } from './time-slots.service';
import { InfoTimeSlots } from './info-time-slots/info-time-slots';

@Component({
  selector: 'app-time-slots',
  imports: [FormsModule, InfoTimeSlots],
  standalone: true,
  templateUrl: './time-slots.html',
  styleUrl: './time-slots.css',
})
export class TimeSlots {
  private timeSlotsService = inject(TimeSlotService);

  timeSlots = signal<TimeSlot[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  searchTerm = signal('');

  isFormModalOpen = signal(false);
  timeSlotToEdit = signal<TimeSlot | null>(null);

  isInfoModalOpen = signal(false);
  timeSlotToView = signal<TimeSlot | null>(null);

  constructor() {
    this.fetchTimeSlots();
  }

  filteredTimeSlots = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();

    if (!term) return this.timeSlots();

    return this.timeSlots().filter(timeSlot =>
      timeSlot.time_slot.toLowerCase().includes(term) ||
      timeSlot.start_time.toLowerCase().includes(term) ||
      timeSlot.end_time.toLowerCase().includes(term) ||
      timeSlot.type.toLowerCase().includes(term)
    );
  });

  fetchTimeSlots(): void {
    this.loading.set(true);
    this.error.set(null);

    this.timeSlotsService.list().subscribe({
      next: (data) => {
        this.timeSlots.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las franjas horarias.');
        this.loading.set(false);
      }
    });
  }

  onAdd(): void {

  }

  onEdit(timeSlot: TimeSlot): void {

  }

  onCloseFormModal(): void {

  }

  onSaved(): void {

  }

  onInfo(timeSlot: TimeSlot): void {
    this.timeSlotToView.set(timeSlot);
    this.isInfoModalOpen.set(true);
  }

  onCloseInfoModal(): void {
    this.isInfoModalOpen.set(false);
    this.timeSlotToView.set(null);
  }

  onDelete(timeSlot: TimeSlot): void {

  }
}
