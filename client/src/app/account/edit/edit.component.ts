import { HostListener, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
  errors!: string[];
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  currentUser$!: Observable<IUser>;

  constructor(private accountService: AccountService, private route: ActivatedRoute) { }

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
      console.log('Profile updated successfully');
   }, error => {
     console.log(error);
   });
  }

}
