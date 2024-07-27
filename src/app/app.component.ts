import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './services/auth.service';
import { ConsentService } from './services/consent.service';
import { ConsentModalComponent } from './app-terms-consent/components/consent-modal/consent-modal.component';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private consentService: ConsentService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.checkConsents();
      }
    });
  }

  private checkConsents() {
    this.authService.isAdmin$.subscribe(isAdmin => {
      if (isAdmin) {
        this.checkMembershipConsent();
      } else {
        this.checkUserConsent();
      }
    });
  }

  private checkMembershipConsent() {
    this.consentService.membershipConsent$.subscribe(consent => {
      if (!consent.given) {
        this.openConsentModal('membership');
      } else {
        this.checkUserConsent();
      }
    });
  }

  private checkUserConsent() {
    this.consentService.userConsent$.subscribe(consent => {
      if (!consent.given) {
        this.openConsentModal('user');
      }
    });
  }

  private openConsentModal(type: 'membership' | 'user') {
    const dialogRef = this.dialog.open(ConsentModalComponent, {
      width: '400px',
      data: { type, given: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.consentService.setConsent(type, true);
        if (type === 'membership') {
          this.checkUserConsent();
        }
      } else {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }
}