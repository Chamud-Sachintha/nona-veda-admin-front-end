import { Component, OnInit } from '@angular/core';
import { HeaderBannerComponent } from '../../../shared/header-banner/header-banner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Request } from '../../../shared/models/Request/request';
import { AdminUserService } from '../../../shared/services/admin-user/admin-user.service';
import { AdminUser } from '../../../shared/models/AdminUser/admin-user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [HeaderBannerComponent, NgxSpinnerModule, CommonModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements OnInit {

  requestParamModel = new Request();
  adminUserList: AdminUser[] = [];

  constructor (private adminUserService: AdminUserService) {}

  ngOnInit(): void {
    this.loadAdminUserList();
  }

  loadAdminUserList() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");

    this.adminUserService.getAdminUserList(this.requestParamModel).subscribe((resp: any) => {
      if (resp.code === 1) {
        const dataList = JSON.parse(JSON.stringify(resp));

        dataList.data[0].forEach((el: AdminUser) => {
          this.adminUserList.push(el);
        })
      }
    })
  }

}
