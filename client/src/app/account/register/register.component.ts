import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  defaultGenderRadioButton = 'male';

  constructor(private fb: FormBuilder, private accountService: AccountService,
    private router: Router, private notifierService: NotifierService) { 
      this.createRegisterForm();
  }

  ngOnInit(): void {
  }
  
  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male', Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      address: [null, Validators.required],
      email: [null, 
        [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
        [this.validateEmailNotTaken()]
      ],
      password: [null, 
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ]
    });
  }

  onRadioChanged(event: MatRadioChange) {
    this.defaultGenderRadioButton = event.value;
  }

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe(() => {
      this.router.navigateByUrl('/real-property');
      this.notifierService.showNotification('Congratulations, your account has been successfully created.', 'OK', 'success');
    }, error => {
      this.notifierService.showNotification(`${error.errors} Problem registering the user.`, 'OK', 'error');
    });
  }
  
  validateEmailNotTaken(): AsyncValidatorFn {
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map(res => {
              return res ? {emailExists: true} : null;
            })
          );
        })
      );
    };
  }
}