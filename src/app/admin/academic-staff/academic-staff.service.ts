import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../services/api-response.service';
import { AcademicStaffModel } from './academic-staff.model';

export interface AcademicStaffPayload {
    personal_information_id: number;
    staff_type: string;
    description: string | null;
}

@Injectable({ providedIn: 'root' })
export class AcademicStaffService {
    private http = inject(HttpClient);
    private baseUrl = `${environment.apiUrl}/academic-staff`;

    list(): Observable<AcademicStaffModel[]> {
        return this.http
            .get<ApiResponse<AcademicStaffModel[]>>(`${this.baseUrl}/list`)
            .pipe(map(response => response.data));
    }

    create(payload: AcademicStaffPayload): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(`${this.baseUrl}/create`, payload);
    }

    update(id: number, payload: AcademicStaffPayload): Observable<AcademicStaffModel> {
        return this.http.put<AcademicStaffModel>(`${this.baseUrl}/update/${id}`, payload);
    }

    delete(id: number, del: 0 | 1): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${this.baseUrl}/delete/${id}/${del}`);
    }
}