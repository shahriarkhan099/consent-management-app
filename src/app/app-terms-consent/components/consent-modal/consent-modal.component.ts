import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Consent } from '../../../interfaces/consent.interface';

@Component({
  selector: 'app-consent-modal',
  templateUrl: './consent-modal.component.html',
  styleUrls: ['./consent-modal.component.scss']
})
export class ConsentModalComponent {
  consentGiven = false;

  constructor(
    public dialogRef: MatDialogRef<ConsentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Consent
  ) {}

  onConsent() {
    this.dialogRef.close(this.consentGiven);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}