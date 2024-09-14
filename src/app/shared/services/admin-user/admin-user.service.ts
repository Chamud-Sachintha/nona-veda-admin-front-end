import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from '../../models/Request/request';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor(private http: HttpClient) { }

  getAdminUserList(requestParamModel: Request) {
    const path = environment.apiUrl + "get-admin-users";
    return this.http.post(path, requestParamModel);
  }
}
