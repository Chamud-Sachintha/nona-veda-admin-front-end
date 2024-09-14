import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-banner',
  standalone: true,
  imports: [],
  templateUrl: './header-banner.component.html',
  styleUrl: './header-banner.component.css'
})
export class HeaderBannerComponent implements OnInit {

  Username : string = '';
  @Input() headerText: string = '';

  constructor () {}

  ngOnInit(): void {
    this.Username = "Sampel Name";
  }

}
