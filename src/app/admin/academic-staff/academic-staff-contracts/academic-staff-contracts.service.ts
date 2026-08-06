import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../services/api-response.service';
import { AcademicStaffContract } from './academic-staff-contracts.model';

@Injectable({ providedIn: 'root' })
export class AcademicStaffContractsService {
    private http = inject(HttpClient);
    private baseUrl = `${environment.apiUrl}/academic-staff-contracts`;

    list(): Observable<AcademicStaffContract[]> {
        return this.http
            .get<ApiResponse<AcademicStaffContract[]>>(`${this.baseUrl}/list`)
            .pipe(map(response => response.data));
    }
}