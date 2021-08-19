import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  name!: string;
  bullets = [
    {
      name: 'Tax Mapping Services'
    },
    {
      name: 'Real Property Appraisal Services'
    },
    {
      name: 'Real Property Records Services'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
