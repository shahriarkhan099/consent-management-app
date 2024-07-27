import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ConsentService } from '../../services/consent.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isAdmin = false;
  membershipConsent = false;
  userConsent = false;

  constructor(
    private authService: AuthService,
    private consentService: ConsentService
  ) {}

  ngOnInit() {
    this.authService.isAdmin$.subscribe(isAdmin => this.isAdmin = isAdmin);
    this.consentService.membershipConsent$.subscribe(consent => this.membershipConsent = consent.given);
    this.consentService.userConsent$.subscribe(consent => this.userConsent = consent.given);
  }
}