import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusyService } from 'src/app/core/services/busy.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { TextInputComponent } from 'src/app/shared/components/text-input/text-input.component';
import { PhotoParams } from 'src/app/shared/models/photoParams';
import { RealPropertyService } from '../real-property.service';

@Component({
  selector: 'app-real-property-create',
  templateUrl: './real-property-create.component.html',
  styleUrls: ['./real-property-create.component.scss']
})
export class RealPropertyCreateComponent implements OnInit, AfterViewInit, AfterViewChecked {
  createForm!: FormGroup;
  @ViewChild(TextInputComponent) textInputComponent!: TextInputComponent;
  defaultTaxableExemptSelect = 'taxable';
  defaultPropertyLocationSelect = 'angilan';
  taxDecId!: number;
  photoParams = new PhotoParams();

  constructor(private fb: FormBuilder, public realPropertyService: RealPropertyService,
    private notifierService: NotifierService, public busyService: BusyService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.createAddRealPropertyForm();
  }

  ngAfterViewInit() {
    this.busyService.idle();
    this.cd.detectChanges();
  }

  ngAfterViewChecked() {
    this.cd.detectChanges();
  }

  createAddRealPropertyForm() {
    this.createForm = this.fb.group({
      ownerName: [null, Validators.required],
      propertyLocation: [this.defaultPropertyLocationSelect, Validators.required],
      taxDecNumber: [null, Validators.required],
      effectiveYear: [null, Validators.required],
      surveyLotNumber: [null, Validators.required],
      landArea: [null, Validators.required],
      remarks: [null],
      propertyIndex: [null, Validators.required],
      arpNumber: [null, Validators.required],
      ownerAddress: [null, Validators.required],
      kind: [null, Validators.required],
      class: [null, Validators.required],
      assessedValue: [null, Validators.required],
      previousTDNumber: [null, Validators.required],
      previousAV: [null, Validators.required],
      taxableExempt: [this.defaultTaxableExemptSelect],
      formFiles: [null, Validators.required]
    });
  }

  clearInputFileValue() {
    this.realPropertyService.formFiles = [];
  }

  uploadPhoto() {
    this.photoParams.taxDecId = this.taxDecId;
    this.realPropertyService.uploadPhoto(this.photoParams);

    this.clearInputFileValue();
  }

  onSubmit() {
    this.realPropertyService.createRealProperty(this.createForm.value).subscribe((property) => {
      this.taxDecId = property.id;      

      this.notifierService.showNotification(`${this.createForm.get('ownerName')?.value} has been added successfully.`, 'OK', 'success');

      this.createAddRealPropertyForm();
      this.textInputComponent.ngAfterViewInit();

      this.uploadPhoto();
    }, error => {
      this.notifierService.showNotification(`${error.errors}`, 'OK', 'error');
    });
  }

}
