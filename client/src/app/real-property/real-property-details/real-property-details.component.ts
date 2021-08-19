import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusyService } from 'src/app/core/services/busy.service';
import { IRealProperty } from 'src/app/shared/models/realProperty';
import { BreadcrumbService } from 'xng-breadcrumb';
import { RealPropertyService } from '../real-property.service';

@Component({
  selector: 'app-real-property-details',
  templateUrl: './real-property-details.component.html',
  styleUrls: ['./real-property-details.component.scss']
})
export class RealPropertyDetailsComponent implements OnInit, AfterViewInit {
  realProperty!: IRealProperty;

  constructor(private realPropertyService: RealPropertyService, private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService, public busyService: BusyService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadRealProperty();
  }

  ngAfterViewInit() {
    this.busyService.idle();
    this.cd.detectChanges();
  }

  loadRealProperty() {
    this.realPropertyService.getRealProperty(+this.activatedRoute.snapshot.paramMap.get('id')!).subscribe(realProperty => {
      this.realProperty = realProperty;
      this.bcService.set('@realPropertyDetails', realProperty.ownerName);
    }, error => {
      console.log(error);
    });
  }

  imagetoPrint(source: string) {
    return "<html><head><scri"+"pt>function step1(){\n" +
              "setTimeout('step2()', 10);}\n" +
              "function step2(){window.print();window.close()}\n" +
              "</scri" + "pt></head><body onload='step1()'>\n" +
              "<img src='" + source + "' /></body></html>";
  }

  printImage(source: string) {
      var Pagelink = "about:blank";
      var pwa = window.open(Pagelink, "_new");
      if (pwa) {
        pwa.document.open();
        pwa.document.write(this.imagetoPrint(source));
        pwa.document.close();
      }
  }

}
