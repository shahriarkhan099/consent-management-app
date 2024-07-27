import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Consent } from '../interfaces/consent.interface';

@Injectable({
  providedIn: 'root'
})
export class ConsentService {
  private membershipConsentSubject = new BehaviorSubject<Consent>({ type: 'membership', given: false });
  private userConsentSubject = new BehaviorSubject<Consent>({ type: 'user', given: false });

  membershipConsent$ = this.membershipConsentSubject.asObservable();
  userConsent$ = this.userConsentSubject.asObservable();

  setConsent(type: 'membership' | 'user', given: boolean) {
    if (type === 'membership') {
      this.membershipConsentSubject.next({ type, given });
    } else {
      this.userConsentSubject.next({ type, given });
    }
  }

  resetConsents() {
    this.membershipConsentSubject.next({ type: 'membership', given: false });
    this.userConsentSubject.next({ type: 'user', given: false });
  }
}