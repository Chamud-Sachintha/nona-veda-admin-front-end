import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from '../../models/Request/request';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboardData(requestParamModel: Request) {
    const path = environment.apiUrl + "get-dashboard-data";
    return this.http.post(path, requestParamModel);
  }
}
