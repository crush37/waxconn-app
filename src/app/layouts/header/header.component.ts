import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '@features/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Output() toggle = new EventEmitter();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([
    Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium
  ]).pipe(
    map(result => result.matches),
    shareReplay()
  );

  username!: string;
  links = [
    { href: '/profile', icon: 'account_circle', text: 'Profile' }
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.username = response.app.user.firstName + ' ' + response.app.user.lastName;
    });
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('login');
    });
  }
}
