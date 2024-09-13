import { Component } from '@angular/core';
import { DashboardHeaderComponent } from "../../shared/dashboard-header/dashboard-header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [DashboardHeaderComponent, RouterOutlet],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

}
