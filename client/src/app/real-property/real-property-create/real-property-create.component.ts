import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { TextInputComponent } from 'src/app/shared/components/text-input/text-input.component';
import { RealPropertyService } from '../real-property.service';

@Component({
  selector: 'app-real-property-create',
  templateUrl: './real-property-create.component.html',
  styleUrls: ['./real-property-create.component.scss']
})
export class RealPropertyCreateComponent implements OnInit, AfterContentChecked {
  createForm!: FormGroup;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild(TextInputComponent) textInputComponent!: TextInputComponent;

  constructor(private fb: FormBuilder, public realPropertyService: RealPropertyService,
    private notifierService: NotifierService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.createAddRealPropertyForm();
  }

  ngAfterContentChecked() {
    this.cd.detectChanges();
  }

  createAddRealPropertyForm() {
    this.createForm = this.fb.group({
      ownerName: [null, Validators.required],
      propertyLocation: [null, Validators.required],
      taxDecNumber: [null, Validators.required],
      effectiveYear: [null, Validators.required],
      surveyLotNumber: [null, Validators.required],
      landArea: [null, Validators.required],
      remarks: [null],
      pictureUrl: [null, Validators.required]
    });
  }

  upload() {
    this.realPropertyService.uploadPhoto();
    this.realPropertyService.image = null;
  }

  onSubmit() {
    this.realPropertyService.createRealProperty(this.createForm.value).subscribe(() => {
      this.fileInput.nativeElement.value = '';
      this.realPropertyService.image = null;
      this.realPropertyService.response.imageUploadSuccess = null;
      this.notifierService.showNotification(`${this.createForm.get('ownerName')?.value} has been added successfully.`, 'OK', 'success');
      this.createForm.reset();

      this.textInputComponent.ngAfterViewInit();
    }, error => {
      this.notifierService.showNotification(`${error.errors}`, 'OK', 'error');
    });
  }

}
