import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Term {
  clientName: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  therapist?: string;
}

const STORAGE_KEY = 'atelierGlow.bookings';

interface StorageReadResult {
  bookings: Term[];
  error: string | null;
}

function isBooking(value: unknown): value is Term {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const booking = value as Record<string, unknown>;
  const date = booking['date'];
  const time = booking['time'];
  if (typeof date !== 'string'
    || !/^\d{4}-\d{2}-\d{2}$/.test(date)
    || typeof time !== 'string'
    || !/^\d{2}:\d{2}$/.test(time)) {
    return false;
  }

  const parsedDate = new Date(`${date}T00:00:00Z`);
  const [hours, minutes] = time.split(':').map(Number);
  return !Number.isNaN(parsedDate.getTime())
    && parsedDate.toISOString().slice(0, 10) === date
    && hours <= 23
    && minutes <= 59
    && typeof booking['clientName'] === 'string'
    && typeof booking['phone'] === 'string'
    && typeof booking['service'] === 'string'
    && (booking['therapist'] === undefined || typeof booking['therapist'] === 'string');
}

function readBookings(): StorageReadResult {
  let raw: string | null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return { bookings: [], error: 'Rezervacije nisu dostupne u ovom pregledaču.' };
  }

  if (raw === null) {
    return { bookings: [], error: null };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { bookings: [], error: 'Sačuvani podaci o rezervacijama nisu ispravni.' };
  }

  if (!Array.isArray(parsed) || !parsed.every(isBooking)) {
    return { bookings: [], error: 'Sačuvani podaci o rezervacijama nisu ispravni.' };
  }

  return { bookings: parsed, error: null };
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  terms: Term[] = [];
  selectedTerm: Term | null = null;
  storageError: string | null = null;

  constructor() {
    this.mergeBookings();
    window.addEventListener('storage', (event: StorageEvent) => {
      if (event.key === STORAGE_KEY || event.key === null) {
        this.mergeBookings();
      }
    });
    window.addEventListener('pageshow', () => this.mergeBookings());
  }

  private mergeBookings(): void {
    const result = readBookings();
    this.storageError = result.error;
    this.terms = result.bookings
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

    if (this.selectedTerm) {
      this.selectedTerm = this.terms.find(term =>
        term.date === this.selectedTerm?.date && term.time === this.selectedTerm?.time
      ) ?? null;
    }
  }

  selectTerm(term: Term): void {
    this.selectedTerm = term;
  }
}
