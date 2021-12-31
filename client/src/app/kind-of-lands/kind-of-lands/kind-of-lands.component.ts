import { Component, OnInit } from '@angular/core';
import { IAgricultural } from 'src/app/shared/models/agricultural';
import { ICommercial } from 'src/app/shared/models/commercial';
import { KindOfLandsService } from '../kind-of-lands.service';

@Component({
  selector: 'app-kind-of-lands',
  templateUrl: './kind-of-lands.component.html',
  styleUrls: ['./kind-of-lands.component.scss']
})
export class KindOfLandsComponent implements OnInit {

  constructor(private kindOfLandsService: KindOfLandsService) { }
  
  ngOnInit(): void {
  }
  
}
