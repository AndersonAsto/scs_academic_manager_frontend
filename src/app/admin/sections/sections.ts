import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Section } from './sections.model';
import { SectionService } from './sections.service';
import { InfoSection } from './info-section/info-section';
import { CreateUpdateSection } from './create-update-section/create-update-section';

@Component({
  selector: 'app-sections',
  standalone: true,
  imports: [FormsModule, InfoSection, CreateUpdateSection],
  templateUrl: './sections.html',
  styleUrl: './sections.css',
})
export class Sections {
  private sectionsService = inject(SectionService);

  sections = signal<Section[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  searchTerm = signal('');

  isFormModalOpen = signal(false);
  sectionToEdit = signal<Section | null>(null);

  isInfoModalOpen = signal(false);
  sectionToView = signal<Section | null>(null);

  constructor() {
    this.fetchSections();
  }

  filteredSections = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.sections();
    return this.sections().filter(c =>
      c.section.toLowerCase().includes(term)
    );
  });

  fetchSections(): void {
    this.loading.set(true);
    this.error.set(null);

    this.sectionsService.list().subscribe({
      next: (data) => {
        this.sections.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las secciones.');
        this.loading.set(false);
      }
    });
  }

  onAdd(): void {
    this.sectionToEdit.set(null);
    this.isFormModalOpen.set(true);
  }

  onEdit(section: Section): void {
    this.sectionToEdit.set(section);
    this.isFormModalOpen.set(true);
  }

  onCloseFormModal(): void {
    this.isFormModalOpen.set(false);
    this.sectionToEdit.set(null);
  }

  onSaved(): void {
    this.isFormModalOpen.set(false);
    this.sectionToEdit.set(null);
    this.fetchSections();
  }

  onInfo(section: Section): void {
    this.sectionToView.set(section);
    this.isInfoModalOpen.set(true);
  }

  onCloseInfoModal(): void {
    this.isInfoModalOpen.set(false);
    this.sectionToView.set(null);
  }

  onDelete(section: Section): void {

  }
}
