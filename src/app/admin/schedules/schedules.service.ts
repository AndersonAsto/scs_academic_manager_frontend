import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../services/api-response.service';
import { Schedule } from './schedules.model';

export interface SchedulePayload {
    teacher_group_id: number;
    time_slot_id: number;
    day: string;
    description: string | null;
}

@Injectable({ providedIn: 'root' })
export class SchedulesService {
    private http = inject(HttpClient);
    private baseUrl = `${environment.apiUrl}/schedules`;

    list(): Observable<Schedule[]> {
        return this.http
            .get<ApiResponse<Schedule[]>>(`${this.baseUrl}/list`)
            .pipe(map(response => response.data));
    }

    create(payload: SchedulePayload): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(`${this.baseUrl}/create`, payload);
    }

    update(id: number, payload: SchedulePayload): Observable<Schedule> {
        return this.http.put<Schedule>(`${this.baseUrl}/update/${id}`, payload);
    }

    delete(id: number, del: 0 | 1): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${this.baseUrl}/delete/${id}/${del}`);
    }
}