import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { BusyService } from 'src/app/core/services/busy.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { ConfirmImageComponent } from 'src/app/shared/components/dialogs/confirm-image/confirm-image.component';
import { IPhoto } from 'src/app/shared/models/photo';
import { PhotoParams } from 'src/app/shared/models/photoParams';
import { BreadcrumbService } from 'xng-breadcrumb';
import { RealPropertyService } from '../real-property.service';

@Component({
  selector: 'app-real-property-details',
  templateUrl: './real-property-details.component.html',
  styleUrls: ['./real-property-details.component.scss']
})
export class RealPropertyDetailsComponent implements OnInit {
  photos: IPhoto[] = [];
  photoParams = new PhotoParams();
  createForm!: FormGroup;
  displayElement = false;
  ownerName!: string;

  constructor(public realPropertyService: RealPropertyService, private activatedRoute: ActivatedRoute,
    public busyService: BusyService, public dialog: MatDialog, private fb: FormBuilder,
    private notifierService: NotifierService, private bc: BreadcrumbService, private accountService: AccountService) {
      this.loadPhotos();
      this.createAddPhotoForm();  
    }

  ngOnInit(): void {
  }

  loggedIn() {
    return this.accountService.loggedIn();
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(ConfirmImageComponent, {
      data: obj,
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  deleteRowData(row_obj: IPhoto) {
    this.photos = this.photos.filter((value, key) => {
      return value.id != row_obj.id;
    });

    this.realPropertyService.deletePhoto(row_obj.id, this.photoParams).subscribe(() => {
      this.notifierService.showNotification('Photo has been deleted successfully.', 'OK', 'success');
    }, error => {
      this.notifierService.showNotification(`${error.errors} Problem deleting the photo.`, 'OK', 'error');
    });
  }

  loadPhotos() {
    this.realPropertyService.getRealPropertyPhotos(+this.activatedRoute.snapshot.paramMap.get('id')!).subscribe(response => {
      this.bc.set('@ownerName', response.owner);
      this.photos = response.photos;
    }, error => {
      this.notifierService.showNotification(`${error.errors} Problem loading the photo/s.`, 'OK', 'error');
    });
  }

  createAddPhotoForm() {
    this.createForm = this.fb.group({
      formFiles: [null, Validators.required]
    });
  }

  clearInputFileValue() {
    this.realPropertyService.formFiles = [];
  }

  displayUploadPhotos() {
    this.displayElement = true;
  }

  hideUploadPhotos() {
    this.displayElement = false;
  }

  onSubmit() {
    this.photoParams.taxDecId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.realPropertyService.uploadPhoto(this.photoParams).subscribe(() => {
      this.loadPhotos();

      this.clearInputFileValue();
      
      this.displayElement = false;
      
      this.notifierService.showNotification('Photo/s has been uploaded successfully.', 'OK', 'success');
    }, error => {
      this.notifierService.showNotification(`${error.errors} Problem uploading the photo/s.`, 'OK', 'error');
    });
  }

}
