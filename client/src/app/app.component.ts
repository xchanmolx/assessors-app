import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from './account/account.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  title = 'Assessor Application | LGU Aloguinsan';

  constructor(private accountService: AccountService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');

    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }

    this.accountService.loadCurrentUser(token)?.subscribe(() => {
      console.log('Loaded user');
    }, error => {
      console.log(error);
    });
    
  }

}
