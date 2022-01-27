import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { filter, map } from 'rxjs/operators';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  title = 'Assessors Program';

  constructor(private accountService: AccountService, private titleService: Title,
      private router: Router, private activatedRoute: ActivatedRoute) { 
    this.loadCurrentUser();
  }

  ngOnInit(): void {
    // Dynamic Page Title
    const appTitle = this.titleService.getTitle();
    this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child?.firstChild) {
            child = child.firstChild;
          }
          if (child?.snapshot.data['title']) {
            return child.snapshot.data['title'];
          }
          return appTitle;
        })
      ).subscribe((ttl: string) => {
        this.titleService.setTitle(ttl);
      });
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');

    if (token) {
      this.accountService.decodedToken = this.jwtHelper.decodeToken(token);
    }

    this.accountService.loadCurrentUser(token)?.subscribe(() => {
      // console.log('Loaded user');
    }, error => {
      console.log(error);
    });
    
  }

}
