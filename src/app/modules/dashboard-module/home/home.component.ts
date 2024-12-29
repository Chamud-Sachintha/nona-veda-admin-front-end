import { Component, OnInit } from '@angular/core';
import { Request } from '../../../shared/models/Request/request';
import { DashboardService } from '../../../shared/services/dashboard/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { Dashboard } from '../../../shared/models/Dashboard/dashboard';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  requestParamModel = new Request();
  dashboardDataModel = new Dashboard();

  constructor(private dashboardService: DashboardService, private tostr: ToastrService) {}

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  loadDashboardStats() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");

    this.dashboardService.getDashboardData(this.requestParamModel).subscribe((resp: any) => {
      if (resp.code === 1) {
        const dataList = JSON.parse(JSON.stringify(resp));

        this.dashboardDataModel.adminUserCount = dataList.data[0].adminUserCount;
        this.dashboardDataModel.questionCount = dataList.data[0].questionCount;
        this.dashboardDataModel.responseCount = dataList.data[0].responseCount;
      } else {
        this.tostr.error(resp.message, "Loading Dashboard Data");
      }
    })
  }

}
