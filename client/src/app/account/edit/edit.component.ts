import { HostListener, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { IUser } from 'src/app/shared/models/user';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @ViewChild('editForm') editForm!: NgForm;
  user!: IUser;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  currentUser$!: Observable<IUser>;

  constructor(private accountService: AccountService, private route: ActivatedRoute,
    private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;

    this.route.data.subscribe(data => {
      this.user = data.user;
    });
  }

  onRadioChanged(event: MatRadioChange) {
    this.user.gender = event.value;
  }

  updateUser() {
    this.accountService.updateUser(this.user).subscribe(() => {
      this.editForm.reset(this.user);
      this.notifierService.showNotification(`${this.user.firstName}, your profile has been updated successfully.`, 'OK', 'success');
   }, error => {
    this.notifierService.showNotification(error.errors, 'OK', 'error');
   });
  }

}
